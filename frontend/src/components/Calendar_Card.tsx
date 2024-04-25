import { Link } from "react-router-dom";
import "../routes/Calendar.css";

interface Card {
  title: string;
  calendarId: string;
  windowsNumber: number;
  link: string;
  onClick?: () => void;
}

const Calendar_Card: React.FC<Card> = ({
  title,
  calendarId,
  windowsNumber,
  link,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="calendar-card">
      <h2>{title}</h2>
      <p>{calendarId}</p>
      <span>Amount of windows: {windowsNumber}</span>
      <Link
        to={`/calendars/${link}`}
        className="calender-view"
        onClick={handleClick}
      >
        View
      </Link>
    </div>
  );
};

export default Calendar_Card;
