// styles
import { Button, Input } from "@mui/material";
import "./Register.css";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  return (
    <div className="home">
     <h1>Register</h1>
      <p>Please enter your credentials to register:</p>
      <div>
      <Input style={{ margin: "5px", backgroundColor: "lightgrey", borderRadius: "5px", padding: "5px" }} placeholder="Your Name" />
      <Input style={{ margin: "5px", backgroundColor: "lightgrey", borderRadius: "5px", padding: "5px" }} placeholder="Your Email" />
      <Input style={{ margin: "5px", backgroundColor: "lightgrey", borderRadius: "5px", padding: "5px" }} placeholder="Password" />
      <Input style={{ margin: "5px", backgroundColor: "lightgrey", borderRadius: "5px", padding: "5px" }} placeholder="Confirm Password" />
      </div>
      <Button variant="contained" color="primary" style={{marginTop: "10px"}}>Register</Button>
      <div style={{ marginTop: "10px" }}>
        Already Have An Account?  
        <Link style={{ color: "white", marginLeft: "10px" }}to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
