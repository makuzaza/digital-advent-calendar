import "./Window.css";

// icons
import AddIcon from "@mui/icons-material/Add";

type Props = {
  day: number;
  setOpenModal: (openModal: boolean) => void;
  setDay: (day: number) => void;
};

const Window: React.FC<Props> = ({ day, setOpenModal, setDay }) => {
  const handleClick = (day: number) => {
    setOpenModal(true);
    setDay(day);
  };

  return (
    <div className="window">
      <div className="day">{day}</div>
      <div className="icon-box" onClick={() => handleClick(day)}>
        <AddIcon fontSize="large" />
      </div>
    </div>
  );
};

export default Window;
