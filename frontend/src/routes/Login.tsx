import { Button, Input } from "@mui/material";

const Login: React.FC = () => {
  return (
    <div className="home login" style={{ background: "transparent", margin: "10px" }}>
      <h1>Start with Login</h1>
      <p>Please enter your credentials to login:</p>
      <div style={{ textAlign: "center"}}>
      <Input style={{ margin: "5px", backgroundColor: "lightgrey", borderRadius: "5px", padding: "5px" }} placeholder="Your Email" />
      <Input style={{  margin: "5px", backgroundColor: "lightgrey", borderRadius: "5px", padding: "5px" }} placeholder="Password" />    
      </div>
      <Button variant="contained" color="primary" style={{margin: "10px"}}>Login</Button>
    </div>
  );
};

export default Login;
