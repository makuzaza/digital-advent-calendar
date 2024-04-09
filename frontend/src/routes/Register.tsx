// styles
import { Input } from "@mui/material";
import "./Register.css";

const Register: React.FC = () => {
  return (
    <div className="register">
     <h1>Register Landing Page</h1>
      <h2>Please enter your credentials to register.</h2>
      <Input style={{ margin: "10px" }} placeholder="Your Name" />
      <Input style={{ margin: "10px" }} placeholder="Your email" />
      <Input placeholder="Password" />

    </div>
  );
};

export default Register;
