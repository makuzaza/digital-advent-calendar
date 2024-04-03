import { useState } from "react";
import EmbedVideo from "../EmbedVideo/EmbedVideo";
import "./Modal.css";

import CloseIcon from "@mui/icons-material/Close";

type Props = {
  day: number;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  setDay: (day: number) => void;
  amountOfWindows: number;
};

const Modal: React.FC<Props> = ({
  day,
  setDay,
  openModal,
  setOpenModal,
  amountOfWindows,
}) => {
  const [videoURL, setVideoURL] = useState("");
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

  // this function will save all the data of that day
  const handleSave = (day: number) => {
    console.log(`${day}. window's videoURL: ${videoURL}`);
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
      <h4>( Modal for the window {day} )</h4>
      {openModal && (
        <div className="close-modal" onClick={() => setOpenModal(false)}>
          <CloseIcon />
        </div>
      )}
      <label className="video-input">
        <h3>Add a video</h3>
        <span className="span-text">Paste your URL here: </span>
        <input type="text" onChange={(e) => setVideoURL(e.target.value)} />
      </label>
      <EmbedVideo videoURL={videoURL} />
      <div className="save-btn">
        <button onClick={() => handleSave(day)}>SAVE</button>
      </div>
    </div>
  );
};

export default Modal;
