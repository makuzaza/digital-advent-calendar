import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import PreviewFinal from "../components/FinalPreview/PreviewFinal";

interface CalendarData {
  ownerUid: string;
  calendarId: string;
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
  uploadedImageName?: string;
}

const CalendarSingle = () => {
  const { calendarId } = useParams();
  const [calendarData, setCalendarData] = useState<CalendarData>();

  useEffect(() => {
    const getCalendar = () => {
      axios
        .get(
          `https://caas-deploy.onrender.com/firestore/calendars/${calendarId}`
        )
        .then((response) => {
          console.log(response.data);
          setCalendarData(response.data);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    };

    getCalendar();
  }, [calendarId]);

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
        windowsContent={calendarData.windowsContent}
        ownerUid={calendarData.ownerUid}
        calendarId={calendarData.calendarId}
      />
    </div>
  );
};

export default CalendarSingle;
