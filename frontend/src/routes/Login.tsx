import { Input } from "@mui/material";

const Login: React.FC = () => {
  return (
    <div className="home">
      <h1>Login Landing Page</h1>
      <h2>Please enter your credentials to login.</h2>

      <Input style={{ margin: "10px" }} placeholder="Email" />
      <Input placeholder="Password" />
    </div>
  );
};

export default Login;
