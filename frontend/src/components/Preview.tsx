// styles
import "./Preview.css";

// components
import React, { useState } from 'react';
import Window from "./Window/Window";
import { Typography } from "@mui/material";

// this array will be created based on the time user specifies
const windows = [
  "1.",
  "2.",
  "3.",
  "4.",
  "5.",
  "6.",
  "7.",
  "8.",
  "9.",
  "10.",
  "11.",
  "12.",
  "13.",
  "14.",
  "15.",
  "16.",
  "17.",
  "18.",
  "19.",
  "20.",
  "21.",
  "22.",
  "23.",
  "24.",
];

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
  setOpenModal: (openModal: boolean) => void;
  setDay: (day: number) => void;
  windows: number[];
};


const Preview: React.FC<Props> = ({ title, subtitle, setTitle, setSubtitle, titleFont, titleFontSize, subtitleFont, subTitleFontSize,  setOpenModal, setDay, windows }) => {
  
  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(event.target.value);
  };

  return (
    <div className="preview">
     <div className="title">
          <Typography onChange={onTitleChange} variant="h4" component="h2" style={{ fontFamily: titleFont, fontSize: titleFontSize }}>
            {title}
          </Typography>
          <Typography onChange={onSubtitleChange} variant="h4" component="h2" style={{ fontFamily: subtitleFont, fontSize: subTitleFontSize }}>
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
          />
        ))}
      </div>
    </div>
  );
};

export default Preview;
