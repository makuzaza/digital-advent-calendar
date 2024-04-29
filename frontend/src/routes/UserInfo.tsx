import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import "./UserInfo.css";
import { Button } from "@mui/material";
import { useAppSelector } from "../hooks/useAppDispatch";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ChangeUsername } from "../components/ChangeUsername";
import { ChangePassword } from "../components/ChangePassword";

interface CalendarData {
  text: {
    title: string;
  };
}

interface Calendar {
  calendarId: string;
  data: CalendarData;
}

const UserInfo: React.FC = () => {
  const [user] = useAuthState(auth);
  const [allUserFiles, setAllUserFiles] = useState<never[] | null>(null);
  const [allUserCalendars, setAllUserCalendars] = useState<Calendar[] | null>(
    null
  );
  const [userName, setUserName] = useState<string | null>(null);

  const navigate = useNavigate();

  const uid = useAppSelector((state) => state.uid.uid);
  const token = useAppSelector((state) => state.token.token);

  useEffect(() => {
    if (!user) return;
    setUserName(user.displayName);
  }, [user]);

  // Format date to be more readable
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return ` ${month} ${day}, ${year}`;
  }

  // Get all calendars created by the user
  const getUserCalendars = async () => {
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
        setAllUserCalendars(response.data);
      });
  };

  // Delete calendar by calendarId
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

  // Get all files uploaded by the user
  const getAllFilesByUid = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/storage/files/${uid}`
      );
      console.log(response.data);
      setAllUserFiles(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Delete image, music or soundFx file from storage
  const deleteFile = async (file: string) => {
    const name = getFileName(file);

    if (getFirstFolderName(file) === "images") {
      deleteImageFile(name);
    } else if (getSecondFolderName(file) === "music") {
      deleteMusicFile(name);
    } else {
      deleteSoundFxFile(name);
    }
  };

  // Delete image file from storage
  const deleteImageFile = async (fileName: string) => {
    try {
      await axios.delete(`http://localhost:8000/storage/images/${fileName}`, {
        headers: {
          "x-access-token": token,
        },
        data: {
          uid: uid,
        },
      });
      console.log("Image file deleted:", fileName);
    } catch (error) {
      console.error("Error deleting image file:", error);
    }
  };

  // Delete music file from storage
  const deleteMusicFile = async (fileName: string) => {
    try {
      await axios.delete(
        `http://localhost:8000/storage/sounds/music/${fileName}`,
        {
          headers: {
            "x-access-token": token,
          },
          data: {
            uid: uid,
          },
        }
      );
      console.log("Music file deleted:", fileName);
    } catch (error) {
      console.error("Error deleting music file:", error);
    }
  };

  // Delete soundFx file from storage
  const deleteSoundFxFile = async (fileName: string) => {
    try {
      await axios.delete(
        `http://localhost:8000/storage/sounds/soundFx/${fileName}`,
        {
          headers: {
            "x-access-token": token,
          },
          data: {
            uid: uid,
          },
        }
      );
      console.log("SoundFx file deleted:", fileName);
    } catch (error) {
      console.error("Error deleting soundFx file:", error);
    }
  };

  // Helper functions to get the first folder name, second folder name, and file name

  function getFirstFolderName(path: string) {
    const index = path.indexOf("/");
    if (index !== -1) {
      return path.slice(0, index);
    }
    return path;
  }

  function getSecondFolderName(path: string) {
    const firstSlashIndex = path.indexOf("/");
    if (firstSlashIndex !== -1) {
      const secondSlashIndex = path.indexOf("/", firstSlashIndex + 1);
      if (secondSlashIndex !== -1) {
        return path.slice(firstSlashIndex + 1, secondSlashIndex);
      }
    }
    return null;
  }

  function getFileName(path: string) {
    const lastSlashIndex = path.lastIndexOf("/");
    if (lastSlashIndex !== -1) {
      return path.slice(lastSlashIndex + 1);
    }
    return path;
  }

  if (!token) {
    navigate("/login");
  }

  // Delete user account
  const handleDeleteAccount = () => {
    const user = auth.currentUser;

    if (user) {
      user
        .delete()
        .then(() => {
          console.log("Account deleted successfully");
          navigate("/login");
        })
        .catch((error: Error) => {
          console.error("Error deleting account:", error);
        });
    } else {
      console.error("No user signed in");
    }
  };

  return (
    <div className="home">
      <div className="user-info">
        <div className="info-box">
          <h2>USER INFO</h2>
          <div className="flex">
            <div className="left-col">
              <p>Username </p>
              <p>Email </p>
              <p>Account created</p>
            </div>
            <div className="right-col">
              <p>{userName ? userName : <p>-</p>}</p>
              <p>{user?.email}</p>
              <p>
                {user?.metadata.creationTime &&
                  formatDate(user.metadata.creationTime)}
              </p>
            </div>
          </div>
          <div className="button">
            <ChangeUsername setUserName={setUserName} />
          </div>
          <div className="button">
            <ChangePassword />
          </div>
        </div>
        <div className="files-boxes">
          <div className="files-box">
            <h2>USER DATA</h2>
            <Button variant="outlined" onClick={getAllFilesByUid}>
              All uploaded files
            </Button>
            {allUserFiles &&
              (allUserFiles.length === 0 ? (
                <p>No files uploaded</p>
              ) : (
                allUserFiles.map((file) => (
                  <div key={file} className="flex">
                    <p>{getFileName(file)}</p>
                    <div className="delete" onClick={() => deleteFile(file)}>
                      <DeleteForeverIcon />
                    </div>
                  </div>
                ))
              ))}
          </div>
          <div className="files-box">
            <Button variant="outlined" onClick={getUserCalendars}>
              All created calendars
            </Button>
            {allUserCalendars &&
              (allUserCalendars.length === 0 ? (
                <p>No created calendars</p>
              ) : (
                allUserCalendars.map((calendar) => (
                  <div key={calendar.calendarId} className="flex">
                    <p>{calendar.data.text.title}</p>
                    <div
                      className="delete"
                      onClick={() => deleteCalendar(calendar.calendarId)}
                    >
                      <DeleteForeverIcon />
                    </div>
                  </div>
                ))
              ))}
          </div>
        </div>
        <div className="danger-zone">
          <h2>DANGER ZONE</h2>
          <div>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteAccount}
            >
              Delete account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
