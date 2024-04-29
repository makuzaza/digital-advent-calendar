import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../hooks/useAppDispatch";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";

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

  const token = useAppSelector((state) => state.token.token);
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

  const deleteCalendar = (calendarId: string) => {
    axios
      .delete(`http://localhost:8000/firestore/calendars/${calendarId}`, {
        params: {
          token: token,
          uid: uid,
        },
      })
      .then((response) => {
        getUserCalendars();
        console.log(response);
      })
      .catch((error) => {
        console.error("Error sending token to backend:", error);
      });
  };

  useEffect(() => {
    console.log(calendars);
  }, [calendars]);

  return (
    <div
      style={{ background: "transparent", textAlign: "center" }}
    >
      {(pathname === "/calendars" || pathname === "/favourites") && (
        <Search handleSearch={handleSearch} search={search} />
      )}
      <h1>Here are your saved calendars</h1>
      <div className="calendars">
        {calendars
          .filter((elem) =>
            elem.data.text.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((calendar) => (
            <div key={calendar.calendarId} className="calendar-card">
              <h2>{calendar.data.text.title}</h2>
              <p>{calendar.data.text.subtitle}</p>
              <Link
                to={`/calendars/${calendar.calendarId}`}
                onClick={() => setSearch("")}
                className="calender-view "
              >
                View
              </Link>
              {pathname === "/favourites" && uid === calendar.data.ownerUid && (
                <Button onClick={() => deleteCalendar(calendar.calendarId)}>
                  Delete calendar
                </Button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favourite;
