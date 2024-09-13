import React, { useState, useEffect } from "react";
import "../css/SidebarCss.css";

const Sidebar = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const goBack = () => {
    window.history.back();
  };

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 300) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 300) {
      setShowScroll(false);
    }
  };

  const checkFooterVisibility = () => {
    const footer = document.querySelector("footer");
    if (footer) {
      const footerTop = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (footerTop <= windowHeight) {
        setIsFooterVisible(true);
      } else {
        setIsFooterVisible(false);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    window.addEventListener("scroll", checkFooterVisibility);

    return () => {
      window.removeEventListener("scroll", checkScrollTop);
      window.removeEventListener("scroll", checkFooterVisibility);
    };
  }, [showScroll]);

  return (
    <div className={`sidebar-container ${isFooterVisible ? "hidden" : ""}`}>
      <div className="sidebar-buttons">
        <button className="sidebar-button" onClick={scrollToTop}>
          <i className="fas fa-home"></i> Home
        </button>
        <button className="sidebar-button" onClick={goBack}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>

      <button
        className={`scroll-to-top ${showScroll ? "visible" : ""}`}
        onClick={scrollToTop}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
};

export default Sidebar;
