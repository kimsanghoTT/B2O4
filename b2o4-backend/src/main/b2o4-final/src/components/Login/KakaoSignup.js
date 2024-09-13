import React from "react";
import { Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const KakaoSignup = () => {
    const location = useLocation();
    const userInfo = location.state?.userInfo || {};
    console.log("userInfo : ", userInfo);

    return (
        <Box>
            <h2>Login Result</h2>
            <p>User ID: {userInfo.id}</p>  {/* 변경: userId -> id */}
            <p>Email: {userInfo.email}</p>
            <p>Name: {userInfo.name}</p>
            <p>Access Token: {userInfo.accessToken}</p>

            {/* 회원가입 폼을 여기에 추가 */}
            <Link to="/"><button>HOME</button></Link>
        </Box>
    );
};

export default KakaoSignup;