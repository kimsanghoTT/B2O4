import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "./Google";
import GoogleResult from "./GoogleSignup";

const GoogleApi = () => {
  const [loginResult, setLoginResult] = useState(null);

  console.log("로그인결과 :", loginResult);

  return (
    <GoogleOAuthProvider clientId="555533922242-djui4v1cph2l7du35u0al7rfonke1102.apps.googleusercontent.com">
      <Google setLoginResult={setLoginResult} />
    </GoogleOAuthProvider>
  );
};

export default GoogleApi;