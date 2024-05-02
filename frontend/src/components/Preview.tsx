import { useState } from "react";
import { useNavigate } from "react-router";

import axios from "axios";

// styles
import "./Preview.css";

// components
import Window from "./Window/Window";
import MusicPlayer from "./SidebarSounds/MusicPlayer";
import Modal from "../components/Modal/Modal";
import PreviewModal from "../components/PreviewModal/PreviewModal";
import { WindowContent } from "./Modal/Modal";

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
  selectedBackground: string;
  uploadedImageName: string;
  windowContent: WindowContent[];
  setWindowContent: (windowContent: WindowContent[]) => void;
};

interface Json {
  ownerUid: string;
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
  sounds: {
    musicName: string;
    soundFxName: string;
  };
  image: {
    imageURL: string;
    uploadedImageName: string;
  };
  windowContent: WindowContent[];
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
  selectedBackground,
  uploadedImageName,
  windowContent,
  setWindowContent,
}) => {
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const token = useAppSelector((state) => state.token.token);
  const uid = useAppSelector((state) => state.uid.uid);

  const navigate = useNavigate();

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(event.target.value);
  };

  const saveCalendar = async () => {
    const json: Json = {
      windows: windows,
      ownerUid: uid,
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
      sounds: {
        musicName: musicFile,
        soundFxName: musicFX,
      },
      image: {
        imageURL: selectedBackground,
        uploadedImageName: uploadedImageName,
      },
      windowContent: windowContent,
    };
    console.log(json);

    axios
      .post(`http://localhost:8000/firestore/calendars`, {
        token: token,
        uid: uid,
        data: json,
      })
      .then((response) => {
        navigate(`/calendars/${response.data.calendarId}`);
      })
      .catch((error) => {
        console.error("Error saving calendar:", error);
      });
  };

  return (
    <div id="preview-container">
      <div className="preview">
        <div className="preview-music">
          {musicFile && (
            <>
              <p className="preview-sound-btn">Music: </p>
              <MusicPlayer audioSrc={musicFile} type={"music"} />
            </>
          )}
        </div>
        <div className="preview-soundfx">
          {musicFX && (
            <>
              <p className="preview-sound-btn">FX: </p>
              <MusicPlayer audioSrc={musicFX} type={"soundFx"} />
            </>
          )}
        </div>
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
          {windows.map((window, index) => (
            <Window
              key={window}
              date={window}
              day={index + 1}
              setOpenModal={setOpenModal}
              setDay={setDay}
              setOpenPreviewModal={setOpenPreviewModal}
              musicFX={musicFX}
              windowContent={windowContent}
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
              windowContent={windowContent}
              setWindowContent={setWindowContent}
            />
          </div>
        )}
        {openPreviewModal && (
          <div className="modal-preview">
            <PreviewModal
              day={day}
              openPreviewModal={openPreviewModal}
              setOpenPreviewModal={setOpenPreviewModal}
              windowContent={windowContent}
              setWindowContent={setWindowContent}
            />
          </div>
        )}
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={saveCalendar}>
          SAVE CALENDAR
        </Button>
      </div>
    </div>
  );
};

export default Preview;
