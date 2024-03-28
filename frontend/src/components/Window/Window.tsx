import "./Window.css";

// icons
import AddIcon from "@mui/icons-material/Add";

type Props = {
  day: string;
};

const Window: React.FC<Props> = ({ day }) => {
  // this function will be called when user clicks on the windows add icon, will open up a modal
  const handleClick = (day: string) => {
    console.log(`Clicked on ${day} day`);
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
