import React, { useState } from "react";
import "./Hamburger.css";
import { Link } from "react-router-dom";

interface MenuItem {
  text: string;
  link: string;
}

const HamburgerMenu: React.FC<{ menuItems: MenuItem[] }> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <div
        className={isOpen ? "menu-btn open" : "menu-btn"}
        onClick={toggleMenu}
      >
        <div className="menu-btn__burger"></div>
      </div>
      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.link} onClick={toggleMenu}>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HamburgerMenu;
