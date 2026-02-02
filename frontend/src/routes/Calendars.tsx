import "./Calendar.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import Search from "../components/Search";
import Calendar_Card from "../components/Calendar_Card";
const API_URL = import.meta.env.VITE_API_URL;

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
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading calendars...");
  const { pathname } = useLocation();
  const [user] = useAuthState(auth);

  const getCalendars = async () => {
    setIsLoading(true);
    setLoadingMessage("Loading calendars...");
    
    // After 3 seconds, show extended loading message
    const timer = setTimeout(() => {
      setLoadingMessage("Server is waking up, please wait... This may take up to 60 seconds.");
    }, 3000);

    try {
      const response = await axios.get(`${API_URL}/firestore/calendars`);
      setCalendars(response.data);
      setIsLoading(false);
      clearTimeout(timer);
    } catch (error) {
      setLoadingMessage("Failed to load calendars. Please refresh the page.");
      clearTimeout(timer);
    }
  };

  useEffect(() => {
    getCalendars();
  }, []);

  return (
    <div style={{ textAlign: "center"}}>
      <h1>{pathname === "/admin" ? "All Calendars" : "Public Calendars"}</h1>
      {(pathname === "/calendars" ||
        pathname === "/favourites" ||
        pathname == "/admin") && (
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
          <CircularProgress size={80} />
          <div style={{ 
            fontSize: "18px", 
            color: "#ffffff",
            textAlign: "center" 
          }}>
            {loadingMessage}
          </div>
        </div>
      ) : (
        <>
          {(() => {
            const filteredCalendars = calendars
              .filter((elem) => {
                // If current location is '/calendars', filter out private calendars
                if (pathname.includes("/calendars")) {
                  return !elem.data.isPrivate;
                } else {
                  return true; // Keep all elements if current location is something else
                }
              })
              .filter((elem) =>
                elem.data.text.title.toLowerCase().includes(search.toLowerCase())
              );

            if (!user && filteredCalendars.length === 0) {
              return (
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
              );
            }

            return (
              <div className="calendars_new">
                {filteredCalendars.map((calendar) => (
                  <Calendar_Card
                    key={calendar.calendarId}
                    title={calendar.data.text.title}
                    imageURL={calendar.data.image.imageURL}
                    windowsNumber={calendar.data.windows.length}
                    link={calendar.calendarId}
                    onClick={() => setSearch("")}
                  />
                ))}
              </div>
            );
          })()}
        </>
      )}
    </div>
  );
};

export default Calendars;
