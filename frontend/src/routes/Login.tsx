import { Button, Input } from "@mui/material";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { setToken } from "../store/tokenSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/favourites");
  }, [user, loading, navigate]);

  const handleLogin = async () => {
    const newToken = await loginWithEmailAndPassword(email, password);
    dispatch(setToken(newToken));
  };

  return (
    <div className="home" style={{ margin: "10px" }}>
      <h1>Start with Login</h1>
      <p>Please enter your credentials to login:</p>
      <div style={{}}>
        <Input
          style={{
            margin: "5px",
            backgroundColor: "lightgrey",
            borderRadius: "5px",
            padding: "5px",
          }}
          placeholder="Your Email"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        onClick={handleLogin}
        variant="contained"
        color="primary"
        style={{ marginTop: "10px" }}
      >
        Login
      </Button>
      <p>email: test@test.com</p>
      <p>password: test1234</p>
    </div>
  );
};

export default Login;
