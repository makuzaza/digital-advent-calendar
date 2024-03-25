// styles
import "./Panel.css";

// components
import Sidebar from "../components/Sidebar";

const Panel: React.FC = () => {
  return (
    <div className="panel">
      <Sidebar />
    </div>
  );
};

export default Panel;
