// styles
import "./Panel.css";
import { useState } from "react";

// components
import Sidebar from "../components/Sidebar";
import Preview from "../components/Preview";
import { WindowContent } from "../components/Modal/Modal";

const Panel: React.FC = () => {
  const fontOptions = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Roboto",
    "Lato",
    "Montserrat",
    "Open Sans",
    "Oswald",
    "Helvetica",
  ];
  // font size options
  const fontSizeOptions = [18, 20, 24, 28, 32, 48, 54, 58, 65, 73];
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [titleFont, setTitleFont] = useState<string>(fontOptions[0]);
  const [subtitleFont, setSubtitleFont] = useState<string>(fontOptions[0]);
  const [titleFontSize, setTitleFontSize] = useState<number>(
    fontSizeOptions[0]
  );
  const [subTitleFontSize, setSubTitleFontSize] = useState<number>(
    fontSizeOptions[0]
  );
  const [day, setDay] = useState(1);
  const [windows, setWindows] = useState([
    "2025-12-01",
    "2025-12-02",
    "2025-12-03",
    "2025-12-04",
    "2025-12-05",
    "2025-12-06",
    "2025-12-07",
    "2025-12-08",
    "2025-12-09",
    "2025-12-10",
    "2025-12-11",
    "2025-12-12",
    "2025-12-13",
    "2025-12-14",
    "2025-12-15",
    "2025-12-16",
    "2025-12-17",
    "2025-12-18",
    "2025-12-19",
    "2025-12-20",
    "2025-12-21",
    "2025-12-22",
    "2025-12-23",
    "2025-12-24",
  ]);
  const [musicFile, setMusicFile] = useState<string>("");
  const [musicFX, setMusicFX] = useState<string>("");
  const [titleColor, setTitleColor] = useState("#000000");
  const [subtitleColor, setSubtitleColor] = useState("#000000");
  const [selectedBackground, setSelectedBackground] = useState<string>("");
  const [uploadedImageName, setUploadedImageName] = useState("");
  const [windowContent, setWindowContent] = useState<WindowContent[]>(
    Array.from({ length: windows.length }, () => ({
      videoURL: "",
      text: "",
      imageURLModal: "",
      uploadedImageName: "",
    }))
  );

  return (
    <div className="panel">
      <Sidebar
        title={title}
        subtitle={subtitle}
        setTitle={setTitle}
        setSubtitle={setSubtitle}
        titleFont={titleFont}
        titleFontSize={titleFontSize}
        subtitleFont={subtitleFont}
        subTitleFontSize={subTitleFontSize}
        setTitleFont={setTitleFont}
        setSubtitleFont={setSubtitleFont}
        setTitleFontSize={setTitleFontSize}
        setSubTitleFontSize={setSubTitleFontSize}
        titleColor={titleColor}
        subtitleColor={subtitleColor}
        setTitleColor={setTitleColor}
        setSubtitleColor={setSubtitleColor}
        musicFile={musicFile}
        setMusicFile={setMusicFile}
        setMusicFX={setMusicFX}
        musicFX={musicFX}
        setWindows={setWindows}
        windows={windows}
        setSelectedBackground={setSelectedBackground}
        selectedBackground={selectedBackground}
        setUploadedImageName={setUploadedImageName}
      />

      <Preview
        title={title}
        subtitle={subtitle}
        setTitle={setTitle}
        setSubtitle={setSubtitle}
        titleFont={titleFont}
        titleFontSize={titleFontSize}
        subtitleFont={subtitleFont}
        subTitleFontSize={subTitleFontSize}
        setTitleFont={setTitleFont}
        setSubtitleFont={setSubtitleFont}
        setTitleFontSize={setTitleFontSize}
        setSubTitleFontSize={setSubTitleFontSize}
        setDay={setDay}
        windows={windows}
        titleColor={titleColor}
        subtitleColor={subtitleColor}
        setTitleColor={setTitleColor}
        setSubtitleColor={setSubtitleColor}
        day={day}
        musicFile={musicFile}
        musicFX={musicFX}
        selectedBackground={selectedBackground}
        uploadedImageName={uploadedImageName}
        windowContent={windowContent}
        setWindowContent={setWindowContent}
        setSelectedBackground={setSelectedBackground}
        setMusicFX={setMusicFX}
        setMusicFile={setMusicFile}
        setWindows={setWindows}
        imageURL={selectedBackground}
      />
    </div>
  );
};

export default Panel;
