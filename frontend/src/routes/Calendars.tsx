import { Link } from "react-router-dom";
import "./Calendar.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Search from "../components/Search";

interface Calendar {
  calendarId: string;
  calendarName: string;
  data: {
    windows: string[];
    text: {
      title: string;
      titleFont: string;
      titleFontSize: number;
      titleColor: string;
      subtitle: string;
      subtitleFont: string;
      subTitleFontSize: number;
      subtitleColor: string;
    };
    sounds: {
      musicName: string;
      soundFxName: string;
    };
    image: {
      imageUrl: string;
      uploadedImageName: string;
    };
    windowsContent: string[];
    // Add more properties as needed
  };
}

type Props = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  setSearch: (search: string) => void;
};

const Calendars: React.FC<Props> = ({ search, setSearch, handleSearch }) => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const { pathname } = useLocation();

  const getCalendars = async () => {
    axios.get("http://localhost:8000/firestore/calendars").then((response) => {
      console.log("firestore/calendars");
      console.log(response.data);
      setCalendars(response.data);
    });
  };

  useEffect(() => {
    getCalendars();
  }, []);

  return (
    <div style={{ height: "", background: "transparent", textAlign: "center" }}>
      {(pathname === "/calendars" || pathname === "/favourites") && (
        <Search handleSearch={handleSearch} search={search} />
      )}
      <h1>All the calendars ({calendars.length}) made with this app</h1>
      <div className="calendars">
        {calendars
          .filter((elem) =>
            elem.data.text.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((calendar) => (
            <div key={calendar.calendarId} className="calendar-card">
              <h2>{calendar.data.text.title}</h2>
              <p>{calendar.calendarId}</p>
              <span>Amount of windows: {calendar.data.windows.length}</span>
              <Link
                to={`/calendars/${calendar.calendarId}`}
                onClick={() => setSearch("")}
                className="calender-view "
              >
                View
              </Link>
              {/* <p>By: 'user name here'</p> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Calendars;
