import { Button, Input } from "@mui/material";
import { loginWithEmailAndPassword } from "../auth/firebase";
import { setToken } from "../store/tokenSlice";
import { setUid } from "../store/uidSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const newUser = await loginWithEmailAndPassword(email, password);
      dispatch(setToken(newUser.tokenId));
      dispatch(setUid(newUser.uid));
      navigate("/favourites");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="home login"
      style={{ background: "transparent", margin: "10px" }}
    >
      <h1>Start with Login</h1>
      <p>Please enter your credentials to login:</p>
      <div style={{ textAlign: "center" }}>
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
      </div>
      <Button
        onClick={handleLogin}
        variant="contained"
        color="primary"
        style={{ margin: "10px" }}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
