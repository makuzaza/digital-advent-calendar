// styles
import "./Preview.css";

// components
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Window from "./Window/Window";
import titleFont from "./Texts";
import subtitleFont from "./Texts";
import titleFontSize from "./Texts";
import subTitleFontSize from "./Texts";

type Props = {
  title: string;
  subtitle: string;
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
  setOpenModal: (openModal: boolean) => void;
  setDay: (day: number) => void;
  windows: number[];
};

const Preview: React.FC<Props> = ({
  title,
  subtitle,
  setTitle,
  setSubtitle,
  titleFont,
  titleFontSize,
  setOpenModal,
  setDay,
  windows,
}) => {
  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(event.target.value);
  };

  return (
    <div className="preview">
      <div>
        <FormControl>
          <InputLabel style={{ color: "lightgrey" }}>Title</InputLabel>
          <Input
            value={title}
            onChange={onTitleChange}
            style={{
              width: "200px",
              height: "50px",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              fontFamily: titleFont,
              fontSize: titleFontSize,
            }}
          />
        </FormControl>
        {/* Input field for subtitle with selected font and font size */}
        <FormControl>
          <InputLabel style={{ color: "lightgrey" }}>Subtitle</InputLabel>
          <Input
            value={subtitle}
            onChange={onSubtitleChange}
            style={{
              width: "200px",
              height: "150px",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              fontFamily: subtitleFont,
              fontSize: subTitleFontSize,
            }}
          />
        </FormControl>
        <div>{title}</div>
        <div>{subtitle}</div>
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
