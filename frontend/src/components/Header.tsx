import { Container, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import "../index.css";

const Header = () => {
  const location = useLocation();

  if (location.pathname === "/panel") {
    return null;
  }
  return (
    <Container>
      <div style={{ textAlign: "center"}}>
        <nav>
          <ul style={{ display: "flex", justifyContent: "center", gap: "10px", listStyle: "none" }}>
            <li>
              <Link to="/">
                <Button variant="contained">Home</Button>
              </Link>
            </li>
            <li>
              <Link to="/panel">
                <Button variant="contained">Create Calendar</Button>
              </Link>
            </li>
            <li>
              <Link to="/favourites">
                <Button variant="contained">Favourites</Button>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <Button variant="contained">Login</Button>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <Button variant="contained">Register</Button>
              </Link>
            </li> 
            <li>
            <Button variant="contained">Logout</Button>
            </li>
          </ul>
        </nav>
      </div>
    </Container>
  );
};

export default Header;
