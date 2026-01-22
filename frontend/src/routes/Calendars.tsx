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
    isPrivate: boolean;
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
    axios
      .get("https://caas-deploy.onrender.com/firestore/calendars")
      .then((response) => {
        // console.log(response.data);
        setCalendars(response.data);
      });
  };

  useEffect(() => {
    getCalendars();
  }, []);

  return (
    <div style={{ background: "transparent", textAlign: "center" }}>
      {pathname === "/calendars" && <h1>Public Calendars</h1>}
      {(pathname === "/calendars" ||
        pathname === "/favourites" ||
        pathname == "/admin") && (
        <Search handleSearch={handleSearch} search={search} />
      )}
      <div className="calendars">
        {calendars
          .filter((elem) => {
            // If current location is '/calendars', filter out private calendars
            if (location.pathname.includes("/calendars")) {
              return !elem.data.isPrivate;
            } else {
              return true; // Keep all elements if current location is something else
            }
          })
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
