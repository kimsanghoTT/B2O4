import React from "react";
import { Box, Button } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Google = ({ setLoginResult }) => {
  const navigate = useNavigate();

  const googleSocialLogin = useGoogleLogin({
    scope: "email profile",
    onSuccess: async ({ code }) => {
      try {
        const response = await axios.post("/auth/google/callback", { code });
        setLoginResult(response.data);
        navigate("/result", { state: response.data });
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
    onError: (errorResponse) => {
      console.error("Error during login:", errorResponse);
    },
    flow: "auth-code",
  });

  return (
    <Box>
      <img 
        src="./IOS_Google_icon.png"
        alt="Google Login" 
        style={{ cursor: 'pointer'}}
        onClick={googleSocialLogin}
      />
    </Box>
  );
};

export default Google