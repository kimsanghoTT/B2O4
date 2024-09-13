import React, { useContext, useState } from "react";
import axios from "axios";
import MyPageContext from "../MyPageContext";
import { Link } from "react-router-dom";
import "../css/Login.css";
import Button from "react-bootstrap/esm/Button";
import NaverApi from "./NaverApi";
import KakaoApi from "./KakaoApi";
import GoogleApi from "./GoogleApi";

const Login = () => {
  const { loginMember, setLoginMember } = useContext(MyPageContext);

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const login = () => {
    axios.post("/login", { memberId: id, memberPw: pw }).then((response) => {
      const { data } = response;
      console.log(data);

      if (data.loginMember === null) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        return;
      }

      setLoginMember(data.loginMember);
      setId("");
      setPw("");
      alert("로그인 성공~!");
      console.log("로그인 멤버 : " + id);
    });
  };

  const logout = () => {
    setId("");
    setPw("");
    setLoginMember(null);
    localStorage.removeItem("loginMember");
    console.log("로그인 멤버 : " + id);
  };

  return (
    <div className="wrapper-login">
      <div className="login-container">
        {!loginMember && (
          <>
            <h2>
              L <img src="soccer.jpg" /> g i n
            </h2>
            <div className="input-login">
              <div className="input-fields">
                <input
                  type="text"
                  onChange={(e) => setId(e.target.value)}
                  value={id}
                  placeholder="Id"
                />
                <input
                  type="password"
                  onChange={(e) => setPw(e.target.value)}
                  value={pw}
                  placeholder="Password"
                />
              </div>
              <button onClick={login}>로그인</button>
            </div>

            <ul className="login-list">
              <li className="login-item">
                <Link to="/findId" className="login-link">
                  <img src="soccer.jpg" />
                  &nbsp;아이디 찾기
                </Link>
              </li>
              <pre>|</pre>
              <li className="login-item">
                <Link to="/findPw" className="login-link">
                  <img src="soccer.jpg" />
                  &nbsp;비밀번호 찾기
                </Link>
              </li>
              <pre>|</pre>
              <li className="login-item">
                <Link to="/Signup" className="login-link">
                  <img src="soccer.jpg" />
                  &nbsp;회원가입
                </Link>
              </li>
            </ul>
            <ul className="login-api">
              <li className="api-item">
                <NaverApi />
              </li> 
              <li className="api-item">
                <GoogleApi />
              </li>
              <li className="api-item">
                <KakaoApi />
              </li>
            </ul>
          </>
        )}
        {loginMember && (
          <div className="login-complete">
            <h1>{loginMember.memberId}님 환영합니다</h1>
            <div className="login-complete-buttons">
              <Link to="/">
                <Button variant="light">Home</Button>
              </Link>
              <Button variant="dark" onClick={logout}>
                <img src="" />
                logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Login;