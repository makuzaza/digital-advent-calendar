// styles
import "./Panel.css";
import { useState } from "react";

// components
import Sidebar from "../components/Sidebar";
import Preview from "../components/Preview";
import Modal from "../components/Modal/Modal";

const Panel: React.FC = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [day, setDay] = useState(1);
  const [windows, setWindows] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ]);

  return (
    <div className="panel">
      <Sidebar
        title={title}
        subtitle={subtitle}
        setTitle={setTitle}
        setSubtitle={setSubtitle}
      />
      <Preview
        title={title}
        subtitle={subtitle}
        setTitle={setTitle}
        setSubtitle={setSubtitle}
        setOpenModal={setOpenModal}
        setDay={setDay}
        windows={windows}
      />
      {openModal && (
        <Modal
          day={day}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setDay={setDay}
          amountOfWindows={windows.length}
        />
      )}
    </div>
  );
};

export default Panel;
