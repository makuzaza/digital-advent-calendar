import { useState } from "react";
import axios from "axios";

// styles
import "./Preview.css";

// components
import Window from "./Window/Window";
import MusicPlayer from "./SidebarSounds/MusicPlayer";
import Modal from "../components/Modal/Modal";
import PreviewModal from "../components/PreviewModal/PreviewModal";
// import CalendarEditor from "./SidebarPictures/ExistingImageGallery";

import { Button, Typography } from "@mui/material";

import { useAppSelector } from "../hooks/useAppDispatch";

type Props = {
  title: string;
  subtitle: string;
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
  titleFont: string;
  titleFontSize: number;
  setTitleFont: (titleFont: string) => void;
  setSubtitleFont: (subtitleFont: string) => void;
  setTitleFontSize: (titleFontSize: number) => void;
  setSubTitleFontSize: (subTitleFontSize: number) => void;
  subtitleFont: string;
  subTitleFontSize: number;
  setDay: (day: number) => void;
  windows: string[];
  titleColor: string;
  subtitleColor: string;
  setTitleColor: (color: string) => void;
  setSubtitleColor: (color: string) => void;
  day: number;
  musicFile: string;
  musicFX: string;
  // setBackGround: (imageUrl: string | null) => void;
};

interface Json {
  windows: string[];
  text: {
    title: string;
    titleFont: string;
    titleFontSize: number;
    titleColor: string;
    subtitle: string;
    subtitleFont: string;
    subTitleFontSize: number;
    subtitleColor: string;
  };
  // Add more properties as needed
}

const Preview: React.FC<Props> = ({
  title,
  subtitle,
  setTitle,
  setSubtitle,
  titleFont,
  titleFontSize,
  subtitleFont,
  subTitleFontSize,
  setDay,
  day,
  windows,
  titleColor,
  subtitleColor,
  musicFile,
  musicFX,
  /* setTitleColor,
  setSubtitleColor, */
  // setBackground,
}) => {
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // const [selectedBackground, setSelectedBackground] = useState<string | null>(
  //   null
  // );
  const token = useAppSelector((state) => state.token.token);
  const uid = useAppSelector((state) => state.uid.uid);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(event.target.value);
  };

  const saveCalendar = async () => {
    const json: Json = {
      windows: windows,
      text: {
        title: title,
        titleFont: titleFont,
        titleFontSize: titleFontSize,
        titleColor: titleColor,
        subtitle: subtitle,
        subtitleFont: subtitleFont,
        subTitleFontSize: subTitleFontSize,
        subtitleColor: subtitleColor,
      },
      // Add more properties as needed...
    };
    console.log(json);

    axios
      .post(`http://localhost:8000/firestore/calendars`, {
        token: token,
        uid: uid,
        data: json,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error saving calendar:", error);
      });
  };

  return (
    <div id="preview-container">
      <div className="preview">
        {/* <CalendarEditor setBackground={setBackground} /> */}
        {musicFile && <MusicPlayer audioSrc={musicFile} />}
        <div className="title">
          <Typography
            onChange={onTitleChange}
            variant="h4"
            component="h2"
            style={{
              fontFamily: titleFont,
              fontSize: titleFontSize,
              color: titleColor,
            }}
          >
            {title}
          </Typography>
          <Typography
            onChange={onSubtitleChange}
            variant="h4"
            component="h2"
            style={{
              fontFamily: subtitleFont,
              fontSize: subTitleFontSize,
              color: subtitleColor,
            }}
          >
            {subtitle}
          </Typography>
        </div>
        <div className="windows">
          {windows.map((window) => (
            <Window
              key={window}
              date={window}
              day={windows.indexOf(window) + 1}
              setOpenModal={setOpenModal}
              setDay={setDay}
              setOpenPreviewModal={setOpenPreviewModal}
              musicFX={musicFX}
            />
          ))}
        </div>
        {openModal && (
          <div className="modal-create">
            <Modal
              day={day}
              openModal={openModal}
              setOpenModal={setOpenModal}
              setDay={setDay}
              amountOfWindows={windows.length}
            />
          </div>
        )}
        {openPreviewModal && (
          <div className="modal-preview">
            <PreviewModal
              day={day}
              openPreviewModal={openPreviewModal}
              setOpenPreviewModal={setOpenPreviewModal}
            />
          </div>
        )}
      </div>
      <div><Button variant="contained" color="primary"
      onClick={saveCalendar}>SAVE CALENDAR</Button></div>
    </div>
  );
};

export default Preview;
