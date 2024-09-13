import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoRedirection = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const code = new URL(window.location.href).searchParams.get("code");
                console.log("Authorization Code:", code);

                if (code) {
                    const response = await axios.post(
                        '/oauth2/callback/kakao',
                        new URLSearchParams({
                            grant_type: 'authorization_code',
                            client_id: '8bbb8a3533ffe081525698b3125aa35c',
                            redirect_uri: 'http://localhost:3000/oauth2/callback/kakao',
                            code
                        }),
                        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                    );
                    console.log("Token Response:", response.data);

                    const { access_token } = response.data;

                    const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
                        headers: {
                            Authorization: `Bearer ${access_token}`
                        }
                    });

                    console.log("User Info:", userResponse.data);
                    navigate("/signup/kakao", { state: { userInfo: userResponse.data } });
                } else {
                    console.error("No authorization code found.");
                    navigate("/Signup");
                }
            } catch (error) {
                if (error.response) {
                    console.error("Error Response:", error.response.data);
                    console.error("Error Status Code:", error.response.status);
                    navigate("/Signup");
                } else {
                    console.error("Error:", error.message);
                    navigate("/Signup");
                }
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div>
            <h2>Logging in...</h2>
        </div>
    );
};

export default KakaoRedirection;