// styles
import "./Preview.css";

// components
import Window from "./Window/Window";
import MusicPlayer from "./SidebarSounds/MusicPlayer";
import Modal from "../components/Modal/Modal";
import PreviewModal from "../components/PreviewModal/PreviewModal";

import { Typography } from "@mui/material";

// sounds
// this will come from the server later
import selectedBgMusic from "../assets/music/xmas-music.mp3";
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
    <div>
    <FormControl >
          <InputLabel style={{ color: 'lightgrey' }}>Title</InputLabel>
          <Input
           value={title}
            onChange={onTitleChange}
            style={{ width: '200px', height: '50px',
              backgroundColor: '#f5f5f5', borderRadius: '4px', fontFamily: titleFont, fontSize: titleFontSize }}
          />
        </FormControl>
        {/* Input field for subtitle with selected font and font size */}
        <FormControl >
          <InputLabel style={{ color: 'lightgrey' }}>Subtitle</InputLabel>
          <Input
              value={subtitle}
            onChange={onSubtitleChange}
            style={{ width: '200px', height: '150px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontFamily: 'subtitleFont', fontSize: 'subTitleFontSize' }}
          />
        </FormControl>
      <div>{title}</div>
      <div>{subtitle}</div>
   
      {selectedBgMusic && <MusicPlayer audioSrc={selectedBgMusic} />}
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
