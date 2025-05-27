import React, { useState, useEffect } from "react";
import "./Menu.css";

const Menu = () => {
  const [activeHash, setActiveHash] = useState(window.location.hash || "#home");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || "#home");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const menuItems = [
    { label: "Tshirt", href: "#tshirt" },
    { label: "Hoodie", href: "#hoodie" },
    { label: "Sleevie", href: "#sleevie" },
    { label: "Cap", href: "#cap" },
   
  ];

  return (
    <nav className="menu-container">
      <ul className="menu-list">
        {menuItems.map(({ label, href, external }) => (
          <li key={href}>
            <a
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={`menu-link ${activeHash === href ? "active" : ""}`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
