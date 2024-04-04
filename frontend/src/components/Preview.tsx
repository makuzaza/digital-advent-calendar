// styles
import "./Preview.css";

// components
import Window from "./Window/Window";
import MusicPlayer from "./SidebarSounds/MusicPlayer";
import Modal from "../components/Modal/Modal";
import PreviewModal from "../components/PreviewModal/PreviewModal";

import { Typography } from "@mui/material";

import { useState } from "react";

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
  windows: number[];
  titleColor: string;
  subtitleColor: string;
  setTitleColor: (color: string) => void;
  setSubtitleColor: (color: string) => void;
  day: number;
  musicFile: string;
  musicFX: string;
};

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
}) => {
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(event.target.value);
  };

  return (
    <div className="preview">
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
            day={window}
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
  );
};

export default Preview;
