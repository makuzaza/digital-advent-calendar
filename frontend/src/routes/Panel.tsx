// styles
import "./Panel.css";

// components
import Sidebar from "../components/Sidebar";
import Preview from "../components/Preview";

const Panel: React.FC = () => {
  return (
    <div className="panel">
      <Sidebar />
      <Preview />
    </div>
  );
};

export default Panel;
