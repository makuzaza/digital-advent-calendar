// styles
import "./Panel.css";
import { useState } from "react";

// components
import Sidebar from "../components/Sidebar";
import Preview from "../components/Preview";

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
  const [windows /* , setWindows */] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ]);
  const [musicFile, setMusicFile] = useState<string>("");
  const [musicFX, setMusicFX] = useState<string>("");
  const [titleColor, setTitleColor] = useState("#000000");
  const [subtitleColor, setSubtitleColor] = useState("#000000");

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
      />
    </div>
  );
};

export default Panel;
