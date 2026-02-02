import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, updateProfile } from "firebase/auth";
import "./UserInfo.css";
import { Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../hooks/useAppDispatch";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ChangeUsername } from "../components/ChangeUsername";
import { ChangePassword } from "../components/ChangePassword";
import profilepic from "../assets/user_149071.png";
import editor from "../assets/camera.png";
import Swal from "sweetalert2";
import { refreshFirebaseToken } from "../utils/tokenUtils";
import { setToken } from "../store/tokenSlice";
const API_URL = import.meta.env.VITE_API_URL;

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
  const [user] = useAuthState(getAuth());
  const [allUserFiles, setAllUserFiles] = useState<never[] | null>(null);
  const [allUserCalendars, setAllUserCalendars] = useState<Calendar[] | null>(
    null
  );

  const [profilePic, setProfilePic] = useState<string | null>(profilepic); // Default profile picture
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [userName, setUserName] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const uid = useAppSelector((state) => state.uid.uid);
  const token = useAppSelector((state) => state.token.token);

  useEffect(() => {
    if (!user) return;
    setUserName(user.displayName);

    // Load user's profile picture
    if (user.photoURL) {
      setProfilePic(user.photoURL);
    }
  }, [user]);

  // Function to handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Remove Firebase Storage imports
// import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";

// Function to upload profile picture to backend
const uploadProfilePicture = async () => {
  const user = getAuth().currentUser;

  if (!selectedFile || !uid) return;

  try {
    // Get fresh token in case it expired
    const freshToken = await refreshFirebaseToken();
    const tokenToUse = freshToken || token;

    if (!tokenToUse) {
      Swal.fire("Error", "Authentication token is missing. Please log in again.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("uid", uid);

    await axios.post(
      `${API_URL}/storage/profile_pictures`,
      formData,
      {
        headers: {
          "x-access-token": tokenToUse,
        },
      }
    );

    // Update Firebase profile with backend URL that includes uid
    const photoURL = `${API_URL}/storage/profile_pictures/${selectedFile.name}?uid=${uid}`;
    await updateProfile(user!, { photoURL });
    setProfilePic(photoURL);
    setSelectedFile(null);

    // Update token in store if it was refreshed
    if (freshToken && freshToken !== token) {
      dispatch(setToken(freshToken));
    }

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Profile picture uploaded successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    if ((error as any).response?.status === 401) {
      Swal.fire("Error", "Your session has expired. Please log in again.", "error");
    } else {
      console.error("Error uploading profile picture:", error);
      Swal.fire("Error", "Failed to upload profile picture", "error");
    }
  }
};

// Function to remove profile picture
const removeProfilePicture = async () => {
  const user = getAuth().currentUser;

  if (!uid || !user) return;

  try {
    // Get fresh token in case it expired
    const freshToken = await refreshFirebaseToken();
    const tokenToUse = freshToken || token;

    if (!tokenToUse) {
      Swal.fire("Error", "Authentication token is missing. Please log in again.", "error");
      return;
    }

    // Get current profile pic filename and remove query parameters
    if (user.photoURL) {
      const urlWithoutQuery = user.photoURL.split("?")[0];
      const filename = urlWithoutQuery.split("/").pop();
      
      if (filename) {
        await axios.delete(
          `${API_URL}/storage/profile_pictures/${filename}`,
          {
            headers: {
              "x-access-token": tokenToUse,
            },
            data: {
              uid: uid,
            },
          }
        );
      }
    }

    await updateProfile(user, { photoURL: null });
    setProfilePic(profilepic);

    // Update token in store if it was refreshed
    if (freshToken && freshToken !== token) {
      dispatch(setToken(freshToken));
    }

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Profile picture removed successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    if ((error as any).response?.status === 401) {
      Swal.fire("Error", "Your session has expired. Please log in again.", "error");
    } else {
      console.error("Error removing profile picture:", error);
      Swal.fire("Error", "Failed to remove profile picture", "error");
    }
  }
};

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
      .get(`${API_URL}/firestore/calendars/user`, {
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
  const deleteCalendar = async (calendarId: string) => {
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
        ) // make swal are you sure? to delete
        .then((response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Calendar deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          // Update token in store if it was refreshed
          if (freshToken && freshToken !== token) {
            dispatch(setToken(freshToken));
          }
          getUserCalendars();
          console.log(response);
        })
        .catch((error) => {
          // Handle 401 error specifically
          if (error.response?.status === 401) {
            Swal.fire("Error", "Your session has expired. Please log in again.", "error");
          } else {
            console.error("Error deleting calendar:", error);
            Swal.fire("Error", "Failed to delete calendar. Please try again.", "error");
          }
        });
    } catch (error) {
      console.error("Error in deleteCalendar:", error);
      Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
    }
  };

  // Get all files uploaded by the user
  const getAllFilesByUid = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/storage/files/${uid}`
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
    const firstFolder = getFirstFolderName(file);
    const secondFolder = getSecondFolderName(file);

    console.log("Deleting file:", { file, name, firstFolder, secondFolder });

    // Validate that we're not trying to delete a directory
    if (name === "anonymous" || !name || name.length === 0) {
      Swal.fire("Error", "Cannot delete directory or invalid file.", "error");
      return;
    }

    if (firstFolder === "images") {
      deleteImageFile(name);
    } else if (secondFolder === "music") {
      deleteMusicFile(name);
    } else if (secondFolder === "soundFx") {
      deleteSoundFxFile(name);
    } else {
      Swal.fire("Error", "Unknown file type.", "error");
    }
  };

  // Delete image file from storage
  const deleteImageFile = async (fileName: string) => {
    try {
      // Get fresh token in case it expired
      const freshToken = await refreshFirebaseToken();
      const tokenToUse = freshToken || token;

      if (!tokenToUse) {
        Swal.fire("Error", "Authentication token is missing. Please log in again.", "error");
        return;
      }

      await axios.delete(
        `${API_URL}/storage/images/${fileName}`,
        {
          headers: {
            "x-access-token": tokenToUse,
          },
          data: {
            uid: uid,
          },
        }
      );
      console.log("Image file deleted:", fileName);

      // Update token in store if it was refreshed
      if (freshToken && freshToken !== token) {
        dispatch(setToken(freshToken));
      }

      // Refresh the file list
      await getAllFilesByUid();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "File deleted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      if ((error as any).response?.status === 401) {
        Swal.fire("Error", "Your session has expired. Please log in again.", "error");
      } else {
        console.error("Error deleting image file:", error);
        Swal.fire("Error", "Failed to delete image. Please try again.", "error");
      }
    }
  };

  // Delete music file from storage
  const deleteMusicFile = async (fileName: string) => {
    try {
      // Get fresh token in case it expired
      const freshToken = await refreshFirebaseToken();
      const tokenToUse = freshToken || token;

      if (!tokenToUse) {
        Swal.fire("Error", "Authentication token is missing. Please log in again.", "error");
        return;
      }

      await axios.delete(
        `${API_URL}/storage/sounds/music/${fileName}`,
        {
          headers: {
            "x-access-token": tokenToUse,
          },
          data: {
            uid: uid,
          },
        }
      );
      console.log("Music file deleted:", fileName);

      // Update token in store if it was refreshed
      if (freshToken && freshToken !== token) {
        dispatch(setToken(freshToken));
      }

      // Refresh the file list
      await getAllFilesByUid();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "File deleted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      if ((error as any).response?.status === 401) {
        Swal.fire("Error", "Your session has expired. Please log in again.", "error");
      } else {
        console.error("Error deleting music file:", error);
        Swal.fire("Error", "Failed to delete music file. Please try again.", "error");
      }
    }
  };

  // Delete soundFx file from storage
  const deleteSoundFxFile = async (fileName: string) => {
    try {
      // Get fresh token in case it expired
      const freshToken = await refreshFirebaseToken();
      const tokenToUse = freshToken || token;

      if (!tokenToUse) {
        Swal.fire("Error", "Authentication token is missing. Please log in again.", "error");
        return;
      }

      await axios.delete(
        `${API_URL}/storage/sounds/soundFx/${fileName}`,
        {
          headers: {
            "x-access-token": tokenToUse,
          },
          data: {
            uid: uid,
          },
        }
      );
      console.log("SoundFx file deleted:", fileName);

      // Update token in store if it was refreshed
      if (freshToken && freshToken !== token) {
        dispatch(setToken(freshToken));
      }

      // Refresh the file list
      await getAllFilesByUid();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "File deleted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      if ((error as any).response?.status === 401) {
        Swal.fire("Error", "Your session has expired. Please log in again.", "error");
      } else {
        console.error("Error deleting sound effects file:", error);
        Swal.fire("Error", "Failed to delete sound file. Please try again.", "error");
      }
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
    return null;
  }

  // Delete user account
  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone! Your account and all data will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete my account",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const user = getAuth().currentUser;

        if (user) {
          user
            .delete()
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Account deleted successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              console.log("Account deleted successfully");
              navigate("/login");
            })
            .catch((error: Error) => {
              console.error("Error deleting account:", error);
              Swal.fire("Error", "Failed to delete account. Please try again.", "error");
            });
        } else {
          console.error("No user signed in");
          Swal.fire("Error", "No user signed in", "error");
        }
      }
    });
  };

  return (
    <div className="home">
      <div className="user-info">
        <div className="info-box">
          <h2>My Profile</h2>
          <div className="profile-pic">
            <img src={profilePic || profilepic} alt="Profile picture" />
            <div>
              <label htmlFor="file-input">
                <img src={editor} alt="Edit profile picture" id="editor" />
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-input"
              />
            </div>
            <div className="remove-and-upload">
              <Button
                variant="outlined"
                onClick={uploadProfilePicture}
                disabled={!selectedFile}
              >
                Upload
              </Button>

              {profilePic && (
                <Button variant="outlined" onClick={removeProfilePicture}>
                  Remove
                </Button>
              )}
            </div>
          </div>
          <div className="personal-info">
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
            <h2>MY DATA</h2>
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