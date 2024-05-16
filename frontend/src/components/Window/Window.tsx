// styles
import "./Window.css";

// icons
import PreviewIcon from "@mui/icons-material/Preview";

// types
import { WindowContent } from "../Modal/Modal";
import { useEffect, useState } from "react";

type Props = {
  day: number;
  date: string;
  setOpenModal: (openModal: boolean) => void;
  setDay: (day: number) => void;
  setOpenPreviewModal: (openPreviewModal: boolean) => void;
  musicFX: string;
  windowContent: WindowContent[];
  ownerUid: string;
  uploadedImageName: string;
};

const Window: React.FC<Props> = ({
  date,
  day,
  setOpenModal,
  setDay,
  setOpenPreviewModal,
  // musicFX,
  windowContent,
  ownerUid,
}) => {
  const [uploadedImageName, setUploadedImageName] = useState<string>("");

  useEffect(() => {
    const content = windowContent[day - 1];
    if (content && content.uploadedImageName) {
      setUploadedImageName(content.uploadedImageName);
    }
  }, [windowContent, day]);
  const handleAddClick = (day: number) => {
    setOpenModal(true);
    setDay(day);
  };

  const handlePreviewClick = (day: number) => {
    // if sound effect is chosen, play when opening the window
    // if (musicFX) new Audio(musicFX).play();
    // console.log(musicFX);
    setOpenPreviewModal(true);
    setDay(day);
  };

  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const monthNames = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May",
      "June",
      "July",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    return `${month} ${day}`;
  }
  // console.log(uploadedImageName);
  // console.log(ownerUid);

  return (
    <div className="window-container">
      <div
        className="open_door"
        style={{
          backgroundImage: `url(https://caas-deploy.onrender.com/storage/images/${uploadedImageName}/?ownerUid=${ownerUid})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      {/* <div className="open_door" ></div> */}
      <div className="window">
        <div className="day" onClick={() => handleAddClick(day)}>
          {day}
        </div>
        <div className="icon-box" onClick={() => handleAddClick(day)}>
          <div>{formatDate(date)}</div>
        </div>
        <div className="preview-icon" onClick={() => handlePreviewClick(day)}>
          <PreviewIcon style={{ fontSize: 40 }} />
        </div>
      </div>
    </div>
  );
};

export default Window;
