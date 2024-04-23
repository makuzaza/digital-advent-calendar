import CloseIcon from "@mui/icons-material/Close";
import EmbedVideo from "../EmbedVideo/EmbedVideo";
import { useState, useEffect } from "react";
import { WindowContent } from "../Modal/Modal";

type Props = {
  openPreviewModal: boolean;
  setOpenPreviewModal: (openPreviewModal: boolean) => void;
  day: number;
};

const PreviewModal: React.FC<Props> = ({
  openPreviewModal,
  setOpenPreviewModal,
  day,
}) => {
  const [windowContent, setWindowContent] = useState<WindowContent[]>([]);

  useEffect(() => {
    const savedContent = localStorage.getItem(`day_${day}_content`);
    if (savedContent) {
      setWindowContent(JSON.parse(savedContent));
    }
  }, [day]);

  const { videoURL, text, imageURL } = windowContent[day - 1] || {
    videoURL: "",
    text: "",
    imageURL: "",
  };

  return (
    <div className="modal">
      <h1>{day}</h1>
      <div>
        {imageURL && (
          <>
            <p>Your saved image:</p>
            <img src={imageURL} alt="Uploaded" style={{ maxWidth: "200px" }} />
          </>
        )}
      </div>
      <div>
        <p>{text}</p>
      </div>
      {videoURL && (
        <div>
          <EmbedVideo videoURL={videoURL} />
        </div>
      )}

      {openPreviewModal && (
        <div className="close-modal" onClick={() => setOpenPreviewModal(false)}>
          <CloseIcon />
        </div>
      )}
    </div>
  );
};

export default PreviewModal;
