import "./Modal.css";

import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

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
    console.log(text);
    setOpenModal(false);
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
      <Button variant="contained" color="primary"
      onClick={handleSave}>
        Save
      </Button>
      </div>
      {openModal && (
        <div className="close-modal" onClick={() => setOpenModal(false)}>
          <CloseIcon />
        </div>
      )}
    </div>
  );
};

export default Modal;
