// styles
import "./Preview.css";

// components
import Window from "./Window/Window";

// this array will be created based on the time user specifies
const windows = [
  "1.",
  "2.",
  "3.",
  "4.",
  "5.",
  "6.",
  "7.",
  "8.",
  "9.",
  "10.",
  "11.",
  "12.",
  "13.",
  "14.",
  "15.",
  "16.",
  "17.",
  "18.",
  "19.",
  "20.",
  "21.",
  "22.",
  "23.",
  "24.",
];

const Preview: React.FC = () => {
  return (
    <div className="preview">
      <div className="windows">
        {windows.map((window) => (
          <Window key={window} day={window} />
        ))}
      </div>
    </div>
  );
};

export default Preview;
