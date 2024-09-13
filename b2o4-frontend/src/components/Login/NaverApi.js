import React from "react";
import { Link } from "react-router-dom";

const NaverApi = () => {
  return (
    <div>
      <Link to="/naverLogin">        
        <img
          height="50"
          src="btnW_icon_circle.png"
          alt="Naver Login"
        />
      </Link>
    </div>
  );
};

export default NaverApi;