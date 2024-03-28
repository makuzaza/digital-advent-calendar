// styles
import "./Panel.css";
import { useState } from "react";

// components
import Sidebar from "../components/Sidebar";
import Preview from "../components/Preview";

const Panel: React.FC = () => {
  const fontOptions = ['Arial', 'Times New Roman', 'Courier New', 'Verdana', 'Roboto', 'Lato','Montserrat',  'Open Sans', 'Oswald', 'Helvetica'];
  // font size options
  const fontSizeOptions = [18, 20, 24, 28, 32, 48, 54, 58, 65, 73];
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [titleFont, setTitleFont] = useState<string>(fontOptions[0]);
  const [subtitleFont, setSubtitleFont] = useState<string>(fontOptions[0]);
  const [titleFontSize, setTitleFontSize] = useState<number>(fontSizeOptions[0]);
  const [subTitleFontSize, setSubTitleFontSize] = useState<number>(fontSizeOptions[0]);

  return (
    <div className="panel">
      <Sidebar title={title} subtitle={subtitle} setTitle={setTitle} setSubtitle={setSubtitle} titleFont={titleFont} titleFontSize={titleFontSize} subtitleFont={subtitleFont} subTitleFontSize={subTitleFontSize} setTitleFont={setTitleFont} setSubtitleFont={setSubtitleFont} setTitleFontSize={setTitleFontSize} setSubTitleFontSize={setSubTitleFontSize}/>
      <Preview title={title} subtitle={subtitle} setTitle={setTitle} setSubtitle={setSubtitle} titleFont={titleFont} titleFontSize={titleFontSize} subtitleFont={subtitleFont} subTitleFontSize={subTitleFontSize} setTitleFont={setTitleFont} setSubtitleFont={setSubtitleFont} setTitleFontSize={setTitleFontSize} setSubTitleFontSize={setSubTitleFontSize}
      />
    </div>
  );
};

export default Panel;
