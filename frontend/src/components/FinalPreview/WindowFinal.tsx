// styles
import { WindowContent } from "../Modal/Modal";
import "../Window/Window.css";

type Props = {
  day: number;
  date: string;
  windowsContent: WindowContent[];
  setDay: (value: number) => void;
  setOpenPreviewModal: (value: boolean) => void;
};

const WindowFinal: React.FC<Props> = ({
  date,
  day,
  windowsContent,
  setOpenPreviewModal,
  setDay,
}) => {
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

  const handleClick = () => {
    setOpenPreviewModal(true);
    setDay(day - 1);
  };

  return (
    <div className="window-container" onClick={handleClick}>
      <div
        className="open_door"
        style={{
          backgroundImage: `url(${windowsContent[day - 1]?.imageURLModal})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <p>{formatDate(date)}</p>
      </div>
      <div className="window">{day}</div>
    </div>
  );
};

export default WindowFinal;
