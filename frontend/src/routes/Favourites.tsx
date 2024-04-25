import { useCallback, useEffect, useState } from "react";
import Favourite from "./Favourite";
import axios from "axios";
import { useAppSelector } from "../hooks/useAppDispatch";
import { Link } from "react-router-dom";

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
  search: string;
  setSearch: (search: string) => void;
};

const Favourites: React.FC<Props> = ({ search, setSearch }) => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);

  // const token = useAppSelector((state) => state.token.token);
  const uid = useAppSelector((state) => state.uid.uid);

  const getUserCalendars = useCallback(async () => {
    console.log(`user: ${uid} calendars`);
    axios
      .get("http://localhost:8000/firestore/calendars/user", {
        params: {
          // token: token,
          uid: uid,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCalendars(response.data);
      });
  }, [uid]);

  useEffect(() => {
    getUserCalendars();
  }, [getUserCalendars]);

  useEffect(() => {
    console.log(calendars);
  }, [calendars]);

  return (
    <div className="home favourites">
      <Favourite />
      <p>User ID: {uid}</p>
      <div className="calendars">
        {calendars
          .filter((elem) =>
            elem.data.text.title.toLowerCase().startsWith(search.toLowerCase())
          )
          .map((calendar) => (
            <div key={calendar.calendarId} className="calendar-card">
              <h2>{calendar.data.text.title}</h2>
              <p>Calendar ID: {calendar.calendarId}</p>
              <Link
                to={`/calendars/${calendar.calendarId}`}
                onClick={() => setSearch("")}
              >
                View
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favourites;
