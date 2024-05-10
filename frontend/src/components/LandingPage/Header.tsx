import React from "react";
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./headerStyles.module.css";
import Logout from "./Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";
import { useAppSelector } from "../../hooks/useAppDispatch";
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from "react";

const Header: React.FC = () => {
  const [user] = useAuthState(auth);
  const token = useAppSelector((state) => state.token.token);
  const navigate = useNavigate();
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const menuItems = [
    { text: "Home", link: "/" },
    { text: "Browse", link: "/calendars" },
    { text: "Create", link: "/panel" },
    { text: "Favourites", link: "/favourites" },
    { text: "About", link: "/about" },
    { text: "Admin", link: "/admin" },
  ];

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 769);
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);

    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  const drawerContent = (
    <div>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} onClick={() => navigate(item.link)} style={{ cursor: "pointer" }}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };


  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#10617a" }}>
        <Toolbar>
          <div className={`${styles.grow} ${styles.leftAlign}`}>
          {isMobileView && location.pathname !== "/panel" ? (
              <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerOpen}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={openDrawer}
                onClose={handleDrawerClose}
              >
                {drawerContent}
              </Drawer>
            </>
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
