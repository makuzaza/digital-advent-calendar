import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import styles from "./headerStyles.module.css";

const Header = () => {
  const location = useLocation();

  if (location.pathname === "/panel") {
    return null;
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#10617a' }}>
      <Toolbar>
        <div className={styles.grow}>
          <Link to="/" className={styles.navLink}>
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="/panel" className={styles.navLink}>
            <Button color="inherit">Create Calendar</Button>
          </Link>
          <Link to="/favourites" className={styles.navLink}>
            <Button color="inherit">Favourites</Button>
          </Link>
          <Link to="/login" className={styles.navLink}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/register" className={styles.navLink}>
            <Button color="inherit">Register</Button>
          </Link>
        </div>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
