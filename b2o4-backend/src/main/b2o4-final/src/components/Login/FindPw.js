import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/FindLogin.css";
import axios from "axios";
import Modal from "../Layout/GalleryModal";
import PasswordChange from "./PasswordChange";

const FindPw = () => {
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [operationKey, setOperationKey] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [change, setChange] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const findResult = async () => {
    if (!memberId || !memberName || !memberPhone) {
      alert("모두 입력해주세요!");
      return;
    }
    try {
      const response = await axios.post(
        "/findPw",
        {
          memberId,
          memberName,
          memberPhone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.data) {
        setUserInfo(response.data);
        alert("회원 정보를 조회하고 있습니다.");
        setErrorMessage("");
        setChange(true);
      } else {
        setErrorMessage("일치하는 정보가 없습니다. 다시 입력해주세요");
      }
    } catch (error) {
      console.error("Axios error:", error);
      alert("일치하는 정보가 없습니다.");
    }
  };

  const sendCode = async () => {
    try {
      const params = new URLSearchParams();
      params.append('email', userInfo.memberEmail);

      const response = await axios.post('/auth/send-code', params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.data.status === 'success') {
        alert('인증 코드가 발송되었습니다.');
        setOperationKey(true);
      } else {
        alert('인증 코드 발송에 실패하였습니다.');
      }
    } catch (error) {
      console.error('Axios error:', error);
      alert('Axios error: ' + error.message);
    }
  };

  const submitSuccess = async () => {
    if (!securityCode) {
      alert("인증 코드를 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "/auth/verify-code",
        new URLSearchParams({
          email: userInfo.memberEmail,
          code: securityCode,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data.status === "success") {
        alert("인증이 완료되었습니다.");
        setIsModalOpen(true);
      } else {
        alert("인증 코드가 유효하지 않습니다.");
      }
    } catch (error) {
      console.error("Axios error:", error);
      alert("인증 코드 검증에 실패하였습니다.");
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="findIdPw-container">
      <div className="find-Id-Pw">
        <Link to="/findId" className="Link-list">
          아이디 찾기
        </Link>
        <Link to="/findPw" className="Link-list">
          비밀번호 찾기
        </Link>
      </div>

      <div className="findPw-container">
        <div className="findPw-title">
          <h1>비밀번호 찾기</h1>
        </div>
        {!change ? (
          <div className="findPw">
              <div>
                <input
                  type="text"
                  placeholder="아이디를 입력하세요."
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="이름을 입력하세요."
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="-을 제외한 전화번호 11자리를 입력하세요."
                  value={memberPhone}
                  onChange={(e) => setMemberPhone(e.target.value)}
                  required
                />
              </div>
              {errorMessage && (
              <div className="error-message">
                <p>{errorMessage}</p>
              </div>
            )}
            <div className="findPw-button">
              <button onClick={findResult}>비 밀 번 호 &nbsp; 찾 기</button>
            </div>
 
            <ul className="login-list">
              <li className="login-item">
                <Link to="/login" className="login-link">
                  <img src="soccer.jpg" />
                  &nbsp; 로그인
                </Link>
              </li>
              <li className="login-item">
                <Link to="/Signup" className="login-link">
                  <img src="soccer.jpg" />
                  &nbsp;회원가입
                </Link>
              </li>
            </ul>
          </div>
          
        ) : (
            <div className="findPw">
              <div className="email-auth">
              <div className="email-Auth-content">
                <h4>인증받을 본인의 이메일을 <br/>확인해주세요.</h4>
                <div className="email-Auth">
                  <p>"{userInfo.memberEmail}"</p>
                </div>
              </div>
              {!operationKey ? (
                <div className="email-Auth">
                  <button className="btn btn-dark" onClick={sendCode}>
                    인증코드 발송
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    placeholder="인증코드를 입력해주세요."
                  />
                  <br />
                  <button className="btn btn-dark" onClick={submitSuccess}>인증코드 제출하기</button>
                </div>
              )}
              </div>
              <ul className="login-list">
              <li className="login-item">
                <Link to="/login" className="login-link">
                  <img src="soccer.jpg" />
                  &nbsp; 로그인
                </Link>
              </li>
              <li className="login-item">
                <Link to="/Signup" className="login-link">
                  <img src="soccer.jpg" />
                  &nbsp;회원가입
                </Link>
              </li>
            </ul>
            </div>
        )}
      </div>

      {/* 모달 추가 */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <PasswordChange userInfo={userInfo} />
      </Modal>
    </div>
  );
};

export default FindPw;