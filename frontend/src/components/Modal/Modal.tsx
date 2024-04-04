import { useState } from "react";
import EmbedVideo from "../EmbedVideo/EmbedVideo";
import "./Modal.css";

import { TextField, Button } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

type Props = {
  day: number;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  setDay: (day: number) => void;
  amountOfWindows: number;
};

type ContentVisibility = {
  [key: string]: boolean;
};

const Modal: React.FC<Props> = ({
  day,
  setDay,
  openModal,
  setOpenModal,
  amountOfWindows,
}) => {
  const [contentVisible, setContentVisible] = useState<ContentVisibility>({});
  const [videoURL, setVideoURL] = useState("");

  const [text, setText] = useState("");

  const handleClick = (direction: string) => {
    if (direction === "previous") {
      if (day === 1) {
        return;
      }
      setDay(day - 1);
    } else {
      if (day === amountOfWindows) {
        return;
      }
      setDay(day + 1);
    }
  };

  const handleSave = () => {
    console.log(`${day}. window's videoURL: ${videoURL}`);
    console.log(text);
    setOpenModal(false);
  };

  // show / hide content
  const toggleContent = (contentID: string) => {
    setContentVisible((prevState) => ({
      ...prevState,
      [contentID]: !prevState[contentID],
    }));
  };

  return (
    <div className="modal">
      <div className="modal-navigation">
        <div
          className="modal-navigation-item"
          onClick={() => handleClick("previous")}
        >
          Previous window
        </div>
        <div
          className="modal-navigation-item"
          onClick={() => handleClick("next")}
        >
          Next window
        </div>
      </div>
      <h1>Modal for the {day} window</h1>
      <div className="texts">
        <TextField
          id="outlined-basic"
          multiline
          rows={4}
          label="Text"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {openModal && (
        <div className="close-modal" onClick={() => setOpenModal(false)}>
          <CloseIcon />
        </div>
      )}
      <label className="video-input">
        <h3 onClick={() => toggleContent("video-input")}>
          <button> Add a video</button>
        </h3>
        {contentVisible["video-input"] && (
          <>
            <span className="span-text">Paste your URL here: </span>
            <input type="text" onChange={(e) => setVideoURL(e.target.value)} />
            <EmbedVideo videoURL={videoURL} />
          </>
        )}
      </label>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default Modal;