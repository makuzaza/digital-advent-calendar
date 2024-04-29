// styles
import "./Window.css";

// icons
// import AddIcon from "@mui/icons-material/Add";
import PreviewIcon from "@mui/icons-material/Preview";

type Props = {
  day: number;
  date: string;
  setOpenModal: (openModal: boolean) => void;
  setDay: (day: number) => void;
  setOpenPreviewModal: (openPreviewModal: boolean) => void;
  musicFX: string;
  imageURL: string;
};

const Window: React.FC<Props> = ({
  date,
  day,
  setOpenModal,
  setDay,
  setOpenPreviewModal,
  musicFX,
  imageURL,
}) => {
  const handleAddClick = (day: number) => {
    setOpenModal(true);
    setDay(day);
  };

  const handlePreviewClick = (day: number) => {
    // if sound effect is chosen, play when opening the window
    // if (musicFX) new Audio(musicFX).play();
    console.log(musicFX);
    setOpenPreviewModal(true);
    setDay(day);
  };

  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const monthNames = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May",
      "June",
      "July",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    return `${month} ${day}`;
  }

  return (
    <div className="window-container"> 
     <div className="open_door" style={{ backgroundImage: `url(${imageURL})` }}></div>
      <div className="window" > 
          <div className="day" onClick={() => handleAddClick(day)}>{day}</div>
          <div className="icon-box" onClick={() => handleAddClick(day)}>
        {/* <AddIcon fontSize="large" /> */}
          <div>{formatDate(date)}</div>
        </div>
        <div className="preview-icon" onClick={() => handlePreviewClick(day)}>
        <PreviewIcon style={{ fontSize: 40 }}/>
  
        </div>   
      
      </div>
    </div>
  );
};

export default Window;
