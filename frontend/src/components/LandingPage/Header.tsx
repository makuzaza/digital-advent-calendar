import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import styles from "./headerStyles.module.css";
import Logout from "./Logout";
// import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";

const Header = () => {
  const location = useLocation();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user] = useAuthState(auth);

  /*  const handleLogout = () => {
    setIsLoggedIn(false);
  }; */

  if (location.pathname === "/panel") {
    return null;
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "#10617a" }}>
      <Toolbar>
        <div className={`${styles.grow} ${styles.leftAlign}`}>
          <Link to="/" className={styles.navLink}>
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="/panel" className={styles.navLink}>
            <Button color="inherit">Create Calendar</Button>
          </Link>
          <Link to="/favourites" className={styles.navLink}>
            <Button color="inherit">Favourites</Button>
          </Link>
        </div>
        <div className={styles.rightAlign}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>Hello, {user.email}</span>
              <div style={{ marginRight: "20px", marginLeft: "20px" }}>
                <Logout />
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className={styles.navLink}>
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/register" className={styles.navLink}>
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* <Logout /> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
