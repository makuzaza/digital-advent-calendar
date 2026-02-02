import { useState, useEffect } from "react";
import EmbedVideo from "../EmbedVideo/EmbedVideo";
import "./Modal.css";

import { TextField, Button } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector, useAppDispatch } from "../../hooks/useAppDispatch";
import axios from "axios";
import Swal from "sweetalert2";
import { refreshFirebaseToken } from "../../utils/tokenUtils";
import { getAuth } from "firebase/auth";
import { setUid } from "../../store/uidSlice";
const API_URL = import.meta.env.VITE_API_URL;

type Props = {
  day: number;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  setDay: (day: number) => void;
  amountOfWindows: number;
  windowContent: WindowContent[];
  setWindowContent: (windowContent: WindowContent[]) => void;
  uploadedImageName: string;
  ownerUid?: string;
};

type ContentVisibility = {
  [key: string]: boolean;
};

export interface WindowContent {
  videoURL: string;
  text: string;
  imageURLModal?: string;
  uploadedImageName?: string;
}

const Modal: React.FC<Props> = ({
  day,
  setDay,
  openModal,
  setOpenModal,
  amountOfWindows,
  windowContent,
  setWindowContent,
  ownerUid
}) => {
  const [contentVisible, setContentVisible] = useState<ContentVisibility>({});
  const dispatch = useAppDispatch();

  const uid = useAppSelector((state) => state.uid.uid);
  const token = useAppSelector((state) => state.token.token);

  useEffect(() => {
    if (!openModal) {
      // Initialize content for each day if not present
      const newWindowContent = Array.from({ length: amountOfWindows }, () => ({
        videoURL: "",
        text: "",
        imageURLModal: "",
        uploadedImageName: "",
      }));
      setWindowContent(newWindowContent);
    }
  }, [openModal, setWindowContent, amountOfWindows]);

  // useEffect(() => {
  //   if (openModal) {
  //     const savedContent = localStorage.getItem(`windowcontent`);
  //     if (savedContent) {
  //       setWindowContent(JSON.parse(savedContent));
  //     }
  //   } else {
  //     // Initialize content for each day if not present
  //     const newWindowContent = Array.from({ length: amountOfWindows }, () => ({
  //       videoURL: "",
  //       text: "",
  //       imageURLModal: "",
  //     }));
  //     setWindowContent(newWindowContent);
  //   }
  // }, [openModal, day, setWindowContent, amountOfWindows]);

  const handleClick = (direction: string) => {
    if (direction === "previous") {
      if (day === 1) {
        return;
      }
      setDay(day - 1);
    } else {
      if (day === amountOfWindows) {
        return;
      }
      setDay(day + 1);
    }
  };

  // const handleSave = () => {
  //   localStorage.setItem(`windowcontent`, JSON.stringify(windowContent));
  // };

  // show / hide content
  const toggleContent = (contentID: string) => {
    setContentVisible((prevState) => ({
      ...prevState,
      [contentID]: !prevState[contentID],
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    // Get UID from Redux or Firebase auth
    let userUid = uid;
    // console.log("Redux UID:", uid);
    
    if (!userUid || userUid.trim() === "") {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      // console.log("Firebase currentUser:", currentUser);
      
      if (currentUser) {
        userUid = currentUser.uid;
        // console.log("Got UID from Firebase auth:", userUid);
        // Update Redux store with the UID
        dispatch(setUid(userUid));
      } else {
        console.error("No Firebase user found - user not logged in");
      }
    }

    // console.log("Final UID for upload:", userUid, "Token exists:", !!token);

    // Check if user is logged in
    if (!userUid) {
      await Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to upload images.",
      });
      return;
    }

    // Refresh token to ensure it's valid
    let tokenToUse = token;
    try {
      const freshToken = await refreshFirebaseToken();
      if (freshToken) {
        tokenToUse = freshToken;
        // console.log("Token refreshed successfully");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }

    if (!tokenToUse) {
      await Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Authentication token is missing. Please log in again.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newWindowContent = [...windowContent];
      newWindowContent[day - 1] = {
        ...newWindowContent[day - 1],
        imageURLModal: reader.result as string,
        uploadedImageName: file.name,
      };
      setWindowContent(newWindowContent);
    };
    reader.readAsDataURL(file);

    // upload image to database
    const formData = new FormData();
    formData.append("image", file);
    formData.append("uid", userUid);

    // console.log("Uploading image with UID:", userUid);

    try {
      const response = await axios.post(
        `${API_URL}/storage/images/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": tokenToUse,
          },
        }
      );
      // console.log(`Image uploaded successfully:`, response.data);
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Image uploaded successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error: any) {
      console.error("Error uploading image:", error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        await Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
        });
      } else if (error.response?.status === 403) {
        await Swal.fire({
          icon: "error",
          title: "Authentication Required",
          text: "Please log in to upload images.",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: error.response?.data?.error || "Failed to upload image. Please try again.",
        });
      }
    }
  };



  const { videoURL, text, uploadedImageName } = windowContent[day - 1] || {
    videoURL: "",
    text: "",
    imageURLModal: "",
    uploadedImageName: "",
  };
  const currentOwnerUid = ownerUid !== '' ? ownerUid : uid;
  // console.log('currentOwnerUid', currentOwnerUid)

  return (
    <div className={`modal ${openModal ? "open" : ""}`}>
      <div className="modal-backdrop" onClick={() => setOpenModal(false)}></div>
      <div className="modal-content">
        <div className="modal-navigation">
          <div>Window: {day}</div>
          <div
            className="modal-navigation-item"
            onClick={() => {
              handleClick("previous");
              // handleSave();
            }}
          >
            Previous window
          </div>
          <div
            className="modal-navigation-item"
            onClick={() => {
              handleClick("next");
              // handleSave();
            }}
          >
            Next window
          </div>
        </div>
        <div className="image-input" style={{ margin: "20px" }}>
          <label htmlFor="image-upload">Upload Image:</label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <div>
            {uploadedImageName && (
              <>
                <p>Your saved image:</p>
                <img
                  src={`${API_URL}/storage/images/${uploadedImageName}/?ownerUid=${currentOwnerUid}`}
                  alt="Uploaded"
                  style={{ maxHeight: "150px" }}
                />
              </>
            )}
          </div>
        </div>

        <div className="texts">
          <TextField
            id="outlined-basic"
            multiline
            rows={4}
            label="Text"
            variant="outlined"
            value={text}
            onChange={(e) =>
              setWindowContent(
                windowContent.map((item, index) =>
                  index === day - 1 ? { ...item, text: e.target.value } : item
                )
              )
            }
          />
        </div>

        {openModal && (
          <div className="close-modal" onClick={() => setOpenModal(false)}>
            <CloseIcon />
          </div>
        )}

        <label className="video-input">
          <h3 onClick={() => toggleContent("video-input")}>
            <button> Add a video</button>
          </h3>
          {contentVisible["video-input"] && (
            <>
              <span className="span-text">Paste your YouTube link here: </span>
              <input
                type="text"
                value={videoURL}
                onChange={(e) =>
                  setWindowContent(
                    windowContent.map((item, index) =>
                      index === day - 1
                        ? { ...item, videoURL: e.target.value }
                        : item
                    )
                  )
                }
              />
              <EmbedVideo videoURL={videoURL} />
            </>
          )}
        </label>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // handleSave();
            setOpenModal(false);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Modal;
