// styles
import { Button } from "@mui/material";
import "./Home.css";
import Login from "./Login";
import { Link } from "react-router-dom";
import wreath from "../assets/wreath.png";

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* <div className="font">Create Your Own Advent Calendar</div>
      <div className="calendar">
        <div className="parts"><img src={wreath} alt="calendar" style={{width: "80%"}}/>
        </div>
        <div className="parts"><Login/></div>
      </div>
      <div><Link to="/panel"><Button variant="contained" color="primary" style={{marginTop: "10px"}}>Create new</Button></Link></div> */}
    
    </div>
    
  );
};

export default Home;
