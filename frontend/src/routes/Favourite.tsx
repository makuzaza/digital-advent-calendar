import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../hooks/useAppDispatch";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import { useLocation } from "react-router-dom";

interface Calendar {
  calendarId: string;
  calendarName: string;
  data: {
    ownerUid: string;
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
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearch: (search: string) => void;
};

const Favourite: React.FC<Props> = ({ search, handleSearch, setSearch }) => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const { pathname } = useLocation();

  // const token = useAppSelector((state) => state.token.token);
  const uid = useAppSelector((state) => state.uid.uid);

  const getUserCalendars = useCallback(async () => {
    if (!uid) return;
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
    <div
      style={{ height: "70vh", background: "transparent", textAlign: "center" }}
    >
      {(pathname === "/calendars" || pathname === "/favourites") && (
        <Search handleSearch={handleSearch} search={search} />
      )}
      <h1>Here are your saved calendars</h1>
      <p>User ID: {uid}</p>
      <div>
        {calendars
          .filter((elem) =>
            elem.data.text.title.toLowerCase().includes(search.toLowerCase())
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

export default Favourite;
