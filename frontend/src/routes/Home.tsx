// styles
import { Button } from "@mui/material";
import "./Home.css";
import Login from "./Login";
import { Link } from "react-router-dom";
import wreath from "../assets/wreath.png";
import "../index.css";

const Home: React.FC = () => {
  return (
    <div className="home main">
      <div className="font">Create Your Own Digital Advent Calendar</div>
      <div className="calendar">
        <div className="parts">
          <img
            src={wreath}
            alt="calendar"
            style={{ width: "400px", margin: "10px" }}
          />
        </div>
        <div className="parts">
          <Login />
        </div>
      </div>
      <div>
        <Link to="/panel">
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: "30px" }}
          >
            Create new
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
