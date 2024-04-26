import axios from "axios";

// hooks
import { useAppSelector } from "../hooks/useAppDispatch";

//components
import Login from "./Login";
import Logout from "../components/LandingPage/Logout";

const Test: React.FC = () => {
  const token = useAppSelector((state) => state.token.token);
  const uid = useAppSelector((state) => state.uid.uid);

  const handleGetData = (endpoint: string) => {
    // Make an HTTP request to your backend using Axios
    axios
      .get(`http://localhost:8000${endpoint}`, {
        params: {
          token: token,
        },
      })
      // Handle successful response from backend if needed
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending token to backend:", error);
      });
  };

  const getCalendar = () => {
    const calendarId = "P8jprEf4R23OJSQXmjrN";

    axios
      .get(`http://localhost:8000/firestore/calendars/${calendarId}`, {
        params: {
          // token: token,
          uid: uid,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error sending token to backend:", error);
      });
  };

  const getUserData = async () => {
    axios
      .get(`http://localhost:8000/auth/users/${uid}`, {
        params: {
          uid: uid,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Could not get user data", error);
      });
  };

  const deleteCalendar = () => {
    const calendarId = "KQKCbe1ZtnnuqMPyywSw";

    axios
      .delete(`http://localhost:8000/firestore/calendars/${calendarId}`, {
        params: {
          token: token,
          uid: uid,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error sending token to backend:", error);
      });
  };

  return (
    <div>
      <Login />
      <button onClick={() => handleGetData("/storage/files")}>GET DATA</button>
      <button onClick={getCalendar}>GET CALENDAR</button>
      <button onClick={getUserData}>GET USER DATA</button>
      <button onClick={deleteCalendar}>Delete calendar</button>
      <Logout />
    </div>
  );
};

export default Test;
