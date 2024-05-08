// styles
import { Button, Input } from "@mui/material";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const newUser = {
      email: email,
      password: password,
      displayName: name,
    };

    // register new user
    axios
      .post("https://caas-deploy.onrender.com/auth/signup", newUser)
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      });
  };

  return (
    <div className="home register">
      <h1>Register</h1>
      <p>Please enter your credentials to register:</p>
      <div>
        <Input
          style={{
            margin: "5px",
            backgroundColor: "lightgrey",
            borderRadius: "5px",
            padding: "5px",
          }}
          placeholder="Your Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          style={{
            margin: "5px",
            backgroundColor: "lightgrey",
            borderRadius: "5px",
            padding: "5px",
          }}
          placeholder="Your Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          style={{
            margin: "5px",
            backgroundColor: "lightgrey",
            borderRadius: "5px",
            padding: "5px",
          }}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          style={{
            margin: "5px",
            backgroundColor: "lightgrey",
            borderRadius: "5px",
            padding: "5px",
          }}
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button
        onClick={handleRegister}
        variant="contained"
        color="primary"
        style={{ marginTop: "10px" }}
      >
        Register
      </Button>
      <div style={{ marginTop: "10px" }}>
        Already Have An Account?
        <Link style={{ color: "white", margin: "10px" }} to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
