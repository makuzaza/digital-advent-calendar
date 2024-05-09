import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styles from "./headerStyles.module.css";
import Logout from "./Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";
import { useAppSelector } from "../../hooks/useAppDispatch";
import HamburgerMenu from "../Hamburger";

const Header: React.FC = () => {
  const [user] = useAuthState(auth);
  const token = useAppSelector((state) => state.token.token);
  const navigate = useNavigate();

  const menuItems = [
    { text: "Home", link: "/" },
    { text: "Browse Calendars", link: "/calendars" },
    { text: "Create Calendar", link: "/panel" },
    { text: "Favourites", link: "/favourites" },
    { text: "About", link: "/about" },
  ];

  const mobileView = window.matchMedia("(max-width: 480px)").matches;

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#10617a" }}>
        <Toolbar>
          <div className={`${styles.grow} ${styles.leftAlign}`}>
            {mobileView ? (
              <HamburgerMenu menuItems={menuItems} />
            ) : (
              menuItems.map((item, index) => (
                <Link to={item.link} className={styles.navLink} key={index}>
                  <Button color="inherit">{item.text}</Button>
                </Link>
              ))
            )}
          </div>
          <div className={styles.rightAlign}>
            {token ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span onClick={() => navigate("/userinfo")}>
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
    </>
  );
};

export default Header;
