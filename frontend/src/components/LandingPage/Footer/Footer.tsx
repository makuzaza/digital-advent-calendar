import React from "react";
import "./Footer.css";
import PrivacyModal from "./PrivacyModal"; 
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Footer: React.FC = () => {
    const location = useLocation();

    if (location.pathname === "/panel") {
      return null;
    }

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="item1">
                    
                    <PrivacyModal />
                </div>

                <div className="item2">
                    <span style={{ paddingRight: 5 }}>Copyright </span>
                    <Typography variant="body1">
                        {new Date().getFullYear()} YODA. All Rights Reserved.
                    </Typography>
                </div>
                <a
                    href="https://github.com/aj-kivimaki/digital-calendar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="item3"
                >
                    <GitHubIcon />
                </a>
                <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="item4"
                >
                    <FacebookIcon />
                </a>
                <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="item5"
                >
                    <YouTubeIcon />
                </a>

                
            </div>
        </footer>
    );
};

export default Footer;
