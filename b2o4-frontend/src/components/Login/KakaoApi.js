import React from 'react';

const KakaoApi = () => {
    const Rest_api_key = "8bbb8a3533ffe081525698b3125aa35c";
    const redirect_uri = "http://localhost:3000/oauth2/callback/kakao";

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    const handleLogin = () => {
        window.location.href = kakaoURL;
    };

    return (
        <div>
            <img
                height="50"
                src="kakao.png"
                onClick={handleLogin}
                style={{ cursor: 'pointer' }}
                alt="Kakao Login"
            />
        </div>
    );
};

export default KakaoApi;