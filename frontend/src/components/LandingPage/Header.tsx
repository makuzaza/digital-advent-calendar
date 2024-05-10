import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styles from "./headerStyles.module.css";
import Logout from "./Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";
import { useAppSelector } from "../../hooks/useAppDispatch";
import HamburgerMenu from "../Hamburger";
import { AccountCircle } from "@mui/icons-material";

const Header: React.FC = () => {
  const [user] = useAuthState(auth);
  const token = useAppSelector((state) => state.token.token);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menuItems = [
    { text: "Home", link: "/" },
    { text: "Browse", link: "/calendars" },
    { text: "Create", link: "/panel" },
    { text: "Favourites", link: "/favourites" },
    { text: "About", link: "/about" },
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
              <div>
                <IconButton
                  onClick={handleMenuOpen}
                  color="inherit"
                  aria-controls="menu"
                  aria-haspopup="true"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => navigate("/userinfo")}>
                    Hello, {user?.displayName ? user?.displayName : user?.email}
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/admin")}>Admin</MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Logout />
                  </MenuItem>
                </Menu>
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
