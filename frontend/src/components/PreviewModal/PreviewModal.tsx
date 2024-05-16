import CloseIcon from "@mui/icons-material/Close";
import EmbedVideo from "../EmbedVideo/EmbedVideo";
// import { useState, useEffect } from "react";
import { WindowContent } from "../Modal/Modal";
import { useAppSelector } from "../../hooks/useAppDispatch";

type Props = {
  openPreviewModal: boolean;
  setOpenPreviewModal: (openPreviewModal: boolean) => void;
  day: number;
  windowContent: WindowContent[];
  // setWindowContent: (windowContent: WindowContent[]) => void;
  ownerUid?: string;
};

const PreviewModal: React.FC<Props> = ({
  openPreviewModal,
  setOpenPreviewModal,
  day,
  windowContent,
  // setWindowContent,
  ownerUid
}) => {
  const uid = useAppSelector((state) => state.uid.uid);
  // useEffect(() => {
  //   const savedContent = localStorage.getItem(`windowcontent`);
  //   if (savedContent) {
  //     setWindowContent(JSON.parse(savedContent));
  //   }
  // }, [day, setWindowContent]);

  const { videoURL, text, uploadedImageName } = windowContent[day - 1] || {
    videoURL: "",
    text: "",
    imageURLModal: "",
  };

  const currentOwnerUid = ownerUid !== '' ? ownerUid : uid;
  console.log('currentOwnerUid', currentOwnerUid);

  return (
    <div className={`modal ${openPreviewModal ? "open" : ""}`}>
      <div className="modal-backdrop" onClick={() => setOpenPreviewModal(false)}></div>
      <div className="modal-content">
      Window {day}
      <div>
        {uploadedImageName && (
          <>
            <img
                src={`https://caas-deploy.onrender.com/storage/images/${uploadedImageName}/?ownerUid=${currentOwnerUid}`}
                alt="Uploaded"
                style={{ width: "450px" }}
              />
           {/* <img src={imageURLModal} alt="Uploaded" style={{ width: "450px" }} /> */}
          </>
        )}
      </div>
      <div>
        <p>{text}</p>
      </div>
      {videoURL && (
        <div style={{ width: "450"  }}>
          <EmbedVideo videoURL={videoURL} />
        </div>
      )}

      {openPreviewModal && (
        <div className="close-modal" onClick={() => setOpenPreviewModal(false)}>
          <CloseIcon />
        </div>
      )}
    </div>
    </div>
  );
};

export default PreviewModal;
