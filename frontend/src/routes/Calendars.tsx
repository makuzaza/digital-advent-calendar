import { Link } from "react-router-dom";
import "./Calendar.css";

// all the calendars with at least name, calendarId and genre
// we will fetch this data from the backend
const calendars = [
  {
    calendarName: "Christmas in Finland",
    genre: "Christmas",
    calendarId: "szGRluF3w8jMKbS7B7v8",
  },
  {
    calendarName: "Summer in Finland",
    genre: "Summer",
    calendarId: "wC53DjFvlaStbhzlvFSV",
  },
];

const Calendars = () => {
  return (
    <div>
      <h1>All the calendars made with this app</h1>
      <div className="calendars">
        {calendars.map((calendar) => (
          <div key={calendar.calendarId} className="calendar-card">
            <h2>{calendar.calendarName}</h2>
            <Link to={`/calendars/${calendar.calendarId}`}>View</Link>
            <p>{calendar.genre}</p>
            <p>By: 'user name here'</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendars;
