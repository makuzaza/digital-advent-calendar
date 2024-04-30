import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import PreviewFinal from "../components/FinalPreview/PreviewFinal";
import { useAppSelector } from "../hooks/useAppDispatch";

interface CalendarData {
  text: {
    title: string;
    subtitle: string;
    titleFont: string;
    titleFontSize: number;
    subtitleFont: string;
    subTitleFontSize: number;
    titleColor: string;
    subtitleColor: string;
  };
  sounds: {
    musicName: string;
    soundFxName: string;
  };
  image: {
    uploadedImageName: string;
    imageURL: string;
    imageURLModal: string;
  };
  windows: string[];
  windowsContent: WindowContent[];
}

interface WindowContent {
  text: string;
  videoURL: string;
  imageURLModal: string;
  uploadedImageName?: string;
}

const CalendarSingle = () => {
  const { calendarId } = useParams();
  const [calendarData, setCalendarData] = useState<CalendarData>();
  const uid = useAppSelector((state) => state.uid.uid);

  useEffect(() => {
    const getCalendar = () => {
      axios
        .get(`http://localhost:8000/firestore/calendars/${calendarId}`, {
          params: {
            uid: uid,
          },
        })
        .then((response) => {
          setCalendarData(response.data);
        })
        .catch((error) => {
          console.error("Error sending token to backend:", error);
        });
    };

    getCalendar();
  }, [calendarId, uid]);

  if (!calendarData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PreviewFinal
        title={calendarData.text.title}
        subtitle={calendarData.text.subtitle}
        titleFont={calendarData.text.titleFont}
        titleFontSize={calendarData.text.titleFontSize}
        subtitleFont={calendarData.text.subtitleFont}
        subTitleFontSize={calendarData.text.subTitleFontSize}
        windows={calendarData.windows}
        titleColor={calendarData.text.titleColor}
        subtitleColor={calendarData.text.subtitleColor}
        musicFile={calendarData.sounds.musicName}
        musicFX={calendarData.sounds.soundFxName}
        imageURL={calendarData.image.imageURL}
        uploadedImageName={calendarData.image.uploadedImageName}
        imageURLModal={calendarData.image.imageURLModal}
        windowsContent={calendarData.windowsContent}
      />
    </div>
  );
};

export default CalendarSingle;
