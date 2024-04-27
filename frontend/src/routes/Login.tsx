import { Button, Input } from "@mui/material";
import { loginWithEmailAndPassword } from "../auth/firebase";
import { setToken } from "../store/tokenSlice";
import { setUid } from "../store/uidSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const newUser = await loginWithEmailAndPassword(email, password);
      dispatch(setToken(newUser.tokenId));
      dispatch(setUid(newUser.uid));
      if (newUser.tokenId) {
        setError(null);
        navigate("/favourites");
      } else {
        setEmail("");
        setPassword("");
        setError("Invalid credentials. Please try again.");
      }
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
      {!error ? (
        <p>Please enter your credentials to login:</p>
      ) : (
        <p className="error">{error}</p>
      )}
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
      <div style={{ marginTop: "10px" }}>
        Don't have an account?
        <Link style={{ color: "white", margin: "10px" }} to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
