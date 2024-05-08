import "./Calendar.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Search from "../components/Search";
import Calendar_Card from "../components/Calendar_Card";

export interface Calendar {
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
      subtitleFontSize: number;
      subtitleColor: string;
    };
    sounds: {
      musicName: string;
      soundFxName: string;
    };
    image: {
      imageURL: string;
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
      setCalendars(response.data);
    });
  };

  useEffect(() => {
    getCalendars();
  }, []);

  return (
    <div style={{ background: "transparent", textAlign: "center" }}>
      {(pathname === "/calendars" ||
        pathname === "/favourites" ||
        pathname == "/admin") && (
        <Search handleSearch={handleSearch} search={search} />
      )}
      <div className="calendars">
        {calendars
          .filter((elem) =>
            elem.data.text.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((calendar) => (
            <Calendar_Card
              key={calendar.calendarId} // Added key prop
              title={calendar.data.text.title}
              imageURL={calendar.data.image.imageURL}
              windowsNumber={calendar.data.windows.length}
              link={calendar.calendarId}
              onClick={() => setSearch("")} // Pass setSearch as a function
            />
          ))}
      </div>
    </div>
  );
};

export default Calendars;
