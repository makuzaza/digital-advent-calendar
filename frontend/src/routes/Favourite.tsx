import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../hooks/useAppDispatch";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";

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
      imageURL: string;
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

    axios
      .get("https://caas-deploy.onrender.com/firestore/calendars/user", {
        params: {
          uid: uid,
        },
      })
      .then((response) => {
        setCalendars(response.data);
      });
  }, [uid]);

  useEffect(() => {
    getUserCalendars();
  }, [getUserCalendars]);

  const deleteCalendar = (calendarId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://caas-deploy.onrender.com/firestore/calendars/${calendarId}`,
            {
              params: {
                token: token,
                uid: uid,
              },
            }
          )
          .then((response) => {
            getUserCalendars();
            Swal.fire("Deleted!", "Your calendar has been deleted", "success");
            console.log(response);
          })
          .catch((error) => {
            console.error("Error sending token to backend:", error);
          });
      }
    });
  };

  return (
    <div style={{ background: "transparent", textAlign: "center" }}>
      {(pathname === "/calendars" || pathname === "/favourites") && (
        <Search handleSearch={handleSearch} search={search} />
      )}
      <h1>Your saved calendars</h1>
      <div className="calendars_new">
        {calendars
          .filter((elem) =>
            elem.data.text.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((calendar) => (
            <div key={calendar.calendarId} className="calendar-card">
              <div
                style={{
                  backgroundImage: `url(${calendar.data.image.imageURL})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "10px",
                  width: "100%",
                  height: "200px",
                }}
              ></div>
              <h2>{calendar.data.text.title}</h2>
              {/* <p>{calendar.data.text.subtitle}</p> */}
              <div className="calendar_buttons">
                <div className="calendar_button_one">
                  <Link
                    style={{
                      textDecoration: "none",
                      marginBottom: 0,
                      width: "100%",
                    }}
                    to={`/calendars/${calendar.calendarId}`}
                    onClick={() => setSearch("")}
                  >
                    View
                  </Link>
                </div>
                <div className="calendar_button_two">
                  {(pathname === "/favourites" || pathname === "/") &&
                    uid === calendar.data.ownerUid && (
                      <Button
                        onClick={() => deleteCalendar(calendar.calendarId)}
                      >
                        <DeleteOutlineIcon />
                      </Button>
                    )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favourite;
