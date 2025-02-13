import React, { useState, useEffect } from "react";
import Logo from "../assets/img/logo.png";

const Header = () => {
  // State for sticky header
  const [isSticky, setIsSticky] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLinkClicked, setIsLinkClicked] = useState(false);

  // Handle sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Set active link based on scroll position, but only if a link wasn't clicked
      if (!isLinkClicked) {
        const sections = [
          "home",
          "about",
          "amenities",
          "highlights",
          "price",
          "floor-plan",
          "location",
        ];
        const scrollPosition = window.scrollY + 200;
        sections.forEach((section) => {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;
            if (scrollPosition >= offsetTop && scrollPosition <= offsetBottom) {
              setActiveLink(section);
            }
          }
        });
      }
    };

    // Add scroll event listener to handle sticky header and active link
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLinkClicked]); // Only trigger scroll logic when `isLinkClicked` changes

  // Handle active menu link on click
  const handleLinkClick = (id) => {
    // Immediately set the active link and scroll to the section
    setActiveLink(id);
    setIsLinkClicked(true); // Mark that a link has been clicked
    setIsMenuOpen(false); // Close the menu on link click

    const element = document.getElementById(id);
    if (element) {
      // Use setTimeout to make sure the DOM update happens before scrolling
      setTimeout(() => {
        window.scrollTo({
          top: element.offsetTop - 70, // Smooth scroll with some offset for fixed navbar
          behavior: "smooth",
        });

        // After the scroll, reset the `isLinkClicked` state
        setIsLinkClicked(false);
      }, 0); // Ensures that the scroll happens after the state update
    }
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  

  return (
    <header className={isSticky ? "sticky" : ""}>
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <a
              href="#"
              className="navbar-toggle collapsed"
              // data-toggle="collapse"
              // data-target="#main-menu"
              aria-expanded={isMenuOpen ? "true" : "false"}
              onClick={toggleMenu}
            >
              <i className="fa fa-bars"></i>
            </a>
            <a className="navbar-brand" href="/">
              <img src={Logo} alt="Prestige Siddharth Vihar" />
            </a>
          </div>

          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "in" : ""}`}
            id="main-menu"
          >
            <div className="close_menu">
              <button
              className="btn btn-danger"
                onClick={closeMenu}
              >
                X
              </button>
            </div>
            <ul className="nav navbar-nav navbar-right" id="menu">
              <li className={activeLink === "home" ? "active" : ""}>
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => handleLinkClick("home")}
                >
                  Home
                </a>
              </li>
              <li className={activeLink === "about" ? "active" : ""}>
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => handleLinkClick("about")}
                >
                  Overview
                </a>
              </li>
              <li className={activeLink === "amenities" ? "active" : ""}>
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => handleLinkClick("amenities")}
                >
                  Amenities
                </a>
              </li>
              <li className={activeLink === "highlights" ? "active" : ""}>
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => handleLinkClick("highlights")}
                >
                  Highlights
                </a>
              </li>
              <li className={activeLink === "price" ? "active" : ""}>
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => handleLinkClick("price")}
                >
                  Price List
                </a>
              </li>
              <li className={activeLink === "floor-plan" ? "active" : ""}>
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => handleLinkClick("floor-plan")}
                >
                  Floor Plan
                </a>
              </li>
              <li className={activeLink === "location" ? "active" : ""}>
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => handleLinkClick("location")}
                >
                  Location Map
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
