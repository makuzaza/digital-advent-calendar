import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import styles from "./headerStyles.module.css";
import Logout from "./Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { useEffect } from "react";

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [user] = useAuthState(auth);
  const token = useAppSelector((state) => state.token.token);

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (pathname === "/panel") {
    return null;
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "#10617a" }}>
      <Toolbar>
        <div className={`${styles.grow} ${styles.leftAlign}`}>
          <Link to="/" className={styles.navLink}>
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="/calendars" className={styles.navLink}>
            <Button color="inherit">Browse Calendars</Button>
          </Link>
          <Link to="/panel" className={styles.navLink}>
            <Button color="inherit">Create Calendar</Button>
          </Link>
          <Link to="/favourites" className={styles.navLink}>
            <Button color="inherit">Favourites</Button>
          </Link>
        </div>
        <div className={styles.rightAlign}>
          {token ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>
                Hello, {user?.displayName ? user?.displayName : user?.email}
              </span>
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
