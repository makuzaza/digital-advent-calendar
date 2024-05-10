// styles
import axios from "axios";
import { WindowContent } from "../Modal/Modal";
import "../Window/Window.css";
import { useCallback, useEffect, useState } from "react";
// import { useAppSelector } from "../../hooks/useAppDispatch";

type Props = {
  day: number;
  date: string;
  windowsContent: WindowContent[];
  ownerUid: string;
  setDay: (value: number) => void;
  setOpenPreviewModal: (value: boolean) => void;
};

const WindowFinal: React.FC<Props> = ({
  date,
  day,
  windowsContent,
  ownerUid,
  setOpenPreviewModal,
  setDay,
}) => {
  // const uid = useAppSelector((state) => state.uid.uid);
  const [windowsImageURL, setWindowsImageURL] = useState("");

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

  // get image by name from database
  const getImage = useCallback(() => {
    const image = windowsContent[day - 1].uploadedImageName;
    if (!image) return;
    axios
      .get(`https://caas-deploy.onrender.com/storage/images/${image}`, {
        params: {
          ownerUid: ownerUid,
        },
        responseType: "blob", // Set the response type to 'blob'
      })
      .then((response) => {
        // Create a blob URL from the binary data received in the response
        const imageUrl = URL.createObjectURL(response.data);

        // Set the blob URL as the background image URL
        setWindowsImageURL(imageUrl);
      });
  }, [day, windowsContent, ownerUid, setWindowsImageURL]);

  useEffect(() => {
    getImage();
  }, [getImage]);

  const handleClick = () => {
    setOpenPreviewModal(true);
    setDay(day - 1);
  };

  return (
    <div className="window-container" onClick={handleClick}>
      <div
        className="open_door"
        style={{
          backgroundImage: `url(${windowsImageURL})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <p>{formatDate(date)}</p>
      </div>
      <div className="window">{day}</div>
    </div>
  );
};

export default WindowFinal;
