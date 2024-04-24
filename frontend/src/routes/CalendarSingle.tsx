import { useParams } from "react-router";
import MainApp from "../components/Calendar/MainApp";

const CalendarSingle = () => {
  const { calendarId } = useParams();

  // we can use the calendarId to fetch the calendar from the backend and pass it to the calendar preview component

  return (
    <div>
      <h2>This will be the page for single calendar</h2>
      <p>And data fetched with this calendarId:</p>
      <p>{calendarId}</p>
      <MainApp /* calendarId={calendarId} */ />
    </div>
  );
};

export default CalendarSingle;
