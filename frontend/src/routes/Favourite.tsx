import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../hooks/useAppDispatch";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import { useLocation } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";
import { refreshFirebaseToken } from "../utils/tokenUtils";
import { setToken } from "../store/tokenSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
const API_URL = import.meta.env.VITE_API_URL;

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
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading calendars...");
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [user] = useAuthState(auth);

  const token = useAppSelector((state) => state.token.token);
  const uid = useAppSelector((state) => state.uid.uid);

  const getUserCalendars = useCallback(async () => {
    if (!uid) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadingMessage("Loading calendars...");
    
    // After 3 seconds, show extended loading message
    const timer = setTimeout(() => {
      setLoadingMessage("Server is waking up, please wait... This may take up to 60 seconds.");
    }, 3000);

    try {
      const response = await axios.get(`${API_URL}/firestore/calendars/user`, {
        params: {
          uid: uid,
        },
      });
      setCalendars(response.data);
      setIsLoading(false);
      clearTimeout(timer);
    } catch (error) {
      // console.error("Error loading calendars:", error);
      setLoadingMessage("Failed to load calendars. Please refresh the page.");
      clearTimeout(timer);
    }
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Get fresh token in case it expired
          const freshToken = await refreshFirebaseToken();
          const tokenToUse = freshToken || token;

          if (!tokenToUse) {
            Swal.fire("Error", "Authentication token is missing. Please log in again.", "error");
            return;
          }

          axios
            .delete(
              `${API_URL}/firestore/calendars/${calendarId}`,
              {
                params: {
                  token: tokenToUse,
                  uid: uid,
                },
              }
            )
            .then((response) => {
              // Update token in store if it was refreshed
              if (freshToken && freshToken !== token) {
                dispatch(setToken(freshToken));
              }
              getUserCalendars();
              Swal.fire("Deleted!", "Your calendar has been deleted", "success");
              // console.log(response);
            })
            .catch((error) => {
              // Handle 401 error specifically
              if (error.response?.status === 401) {
                Swal.fire("Error", "Your session has expired. Please log in again.", "error");
              } else {
                // console.error("Error deleting calendar:", error);
                Swal.fire("Error", "Failed to delete calendar. Please try again.", "error");
              }
            });
        } catch (error) {
          // console.error("Error in deleteCalendar:", error);
          Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
        }
      }
    });
  };

  return (
    <div style={{ textAlign: "center"}}>
      <h1>Your saved calendars</h1>
      {(pathname === "/calendars" || pathname === "/favourites") && (
        <Search handleSearch={handleSearch} search={search} />
      )}
      
      {isLoading ? (
        <div style={{ 
          padding: "40px", 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px"
        }}>
          <CircularProgress size={60} />
          <div style={{ 
            fontSize: "18px", 
            color: "#ffffff",
            textAlign: "center" 
          }}>
            {loadingMessage}
          </div>
        </div>
      ) : !user ? (
        <div style={{
          padding: "60px 20px",
          textAlign: "center",
          color: "#ffffff"
        }}>
          <h2 style={{ marginBottom: "20px" }}>No Calendars Yet</h2>
          <p style={{ fontSize: "18px", marginBottom: "30px" }}>
            Login to create your own advent calendars and share them with others!
          </p>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" size="large">
              Go to Login
            </Button>
          </Link>
        </div>
      ) : (
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
                  {(pathname === "/favourites" || pathname === "/" || pathname === "/") &&
                    // uid === calendar.data.ownerUid && 
                    (
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
      )}
    </div>
  );
};

export default Favourite;
