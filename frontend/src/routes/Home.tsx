// styles
import "./Home.css";
import Login from "./Login";
import wreath from "../assets/wreath.png";
import "../index.css";

const Home: React.FC = () => {
  return (
    <div className="home main">
      <div className="font">Create Your Own Digital Advent Calendar</div>
      <div className="calendar">
        <div className="parts">
          <img src={wreath} alt="calendar" />
        </div>
        <div className="parts">
          <Login />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
