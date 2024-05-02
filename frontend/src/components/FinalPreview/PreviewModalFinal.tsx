import CloseIcon from "@mui/icons-material/Close";
import EmbedVideo from "../EmbedVideo/EmbedVideo";

import { WindowContent } from "../Modal/Modal";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../hooks/useAppDispatch";

type Props = {
  openPreviewModal: boolean;
  setOpenPreviewModal: (openPreviewModal: boolean) => void;
  day: number;
  windowsContent: WindowContent[];
};

const PreviewModalFinal: React.FC<Props> = ({
  openPreviewModal,
  setOpenPreviewModal,
  day,
  windowsContent,
}) => {
  const uid = useAppSelector((state) => state.uid.uid);
  const [windowsImageURL, setWindowsImageURL] = useState("");

  // get image by name from database
  const getImage = useCallback(() => {
    console.log(day);
    const image = windowsContent[day].uploadedImageName;
    if (!image) return;
    axios
      .get(`http://localhost:8000/storage/images/${image}`, {
        params: {
          uid: uid,
        },
        responseType: "blob", // Set the response type to 'blob'
      })
      .then((response) => {
        // Create a blob URL from the binary data received in the response
        const imageUrl = URL.createObjectURL(response.data);

        // Set the blob URL as the background image URL
        setWindowsImageURL(imageUrl);
      });
  }, [day, windowsContent, uid, setWindowsImageURL]);

  useEffect(() => {
    getImage();
  }, [getImage]);

  return (
    <div className={`modal ${openPreviewModal ? "open" : ""}`}>
      <div
        className="modal-backdrop"
        onClick={() => setOpenPreviewModal(false)}
      ></div>
      <div className="modal-content modal-final">
        Window {day + 1}
        <div>
          {windowsImageURL && (
            <>
              <img
                src={windowsImageURL}
                alt="Uploaded"
                style={{ width: "450px" }}
              />
            </>
          )}
        </div>
        <div>
          <p>{windowsContent[day].text}</p>
        </div>
        {windowsContent[day].videoURL && (
          <div style={{ width: "450" }}>
            <EmbedVideo videoURL={windowsContent[day].videoURL} />
          </div>
        )}
        {openPreviewModal && (
          <div
            className="close-modal"
            onClick={() => setOpenPreviewModal(false)}
          >
            <CloseIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewModalFinal;
