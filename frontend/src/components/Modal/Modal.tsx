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
      {openModal && (
        <div className="close-modal" onClick={() => setOpenModal(false)}>
          <CloseIcon />
        </div>
      )}
    </div>
  );
};

export default Modal;
