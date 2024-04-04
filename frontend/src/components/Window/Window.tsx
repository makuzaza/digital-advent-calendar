// styles
import "./Window.css";

// icons
import AddIcon from "@mui/icons-material/Add";
import PreviewIcon from "@mui/icons-material/Preview";

type Props = {
  day: number;
  setOpenModal: (openModal: boolean) => void;
  setDay: (day: number) => void;
  setOpenPreviewModal: (openPreviewModal: boolean) => void;
  musicFX: string;
};

const Window: React.FC<Props> = ({
  day,
  setOpenModal,
  setDay,
  setOpenPreviewModal,
  musicFX,
}) => {
  const handleAddClick = (day: number) => {
    setOpenModal(true);
    setDay(day);
  };

  const handlePreviewClick = (day: number) => {
    // if sound effect is chosen, play when opening the window
    if (musicFX) new Audio(musicFX).play();
    console.log(musicFX);
    setOpenPreviewModal(true);
    setDay(day);
  };

  return (
    <div className="window">
      <div className="day">{day}</div>
      <div className="icon-box" onClick={() => handleAddClick(day)}>
        <AddIcon fontSize="large" />
      </div>
      <div className="preview-icon" onClick={() => handlePreviewClick(day)}>
        <PreviewIcon />
      </div>
    </div>
  );
};

export default Window;
