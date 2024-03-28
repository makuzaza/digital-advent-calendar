// styles
import "./Panel.css";
import { useState } from "react";

// components
import Sidebar from "../components/Sidebar";
import Preview from "../components/Preview";

const Panel: React.FC = () => {

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  return (
    <div className="panel">
      <Sidebar title={title} subtitle={subtitle} setTitle={setTitle} setSubtitle={setSubtitle}/>
      <Preview title={title} subtitle={subtitle} setTitle={setTitle} setSubtitle={setSubtitle}/>
    </div>
  );
};

export default Panel;
