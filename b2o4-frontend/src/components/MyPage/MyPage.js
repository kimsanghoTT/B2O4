import React, { useContext, useState, useEffect } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/MyPageCss.css";
import MyPageContext from "../MyPageContext";

const MyPage = () => {
  const { loginMember, setLoginMember } = useContext(MyPageContext);
  const [memberInfo, setMemberInfo] = useState({
    memberId: "",
    memberPw: "",
    memberEmail: "",
    memberName: "",
    memberPhone: "",
    memberAddress: "",
    memberProfile: "",
  });
  console.log(loginMember);
  const [defaultName, setDefaultName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");

  // 에러 메시지 상태
  const [idDefindMessage, setidDefindMessage] = useState("");
  const [pwDefindMessage, setpwDefindMessage] = useState("");
  const [phoneDefindMessage, setphoneDefindMessage] = useState("");
  const [nameDefindMessage, setnameDefindMessage] = useState(""); // 추가된 상태

  const mainNavigate = useNavigate();

  useEffect(() => {
    if (loginMember) {
      axios
        .get(`/api/mypage/${loginMember.memberId}`)
        .then((response) => {
          setMemberInfo(response.data);
          setDefaultName(response.data.memberName);
          if (response.data.memberProfile) {
            setProfileImagePreview(
              `/images/${response.data.memberProfile}`
            );
          }
        })
        .catch((error) => {
          console.error("멤버 불러오기 실패 :", error);
        });
    }
  }, [loginMember]);

  // 입력 값 변경 시 실시간 유효성 검사
  const checkDataInput = (name, value) => {
    const idCheck = /^[a-zA-Z0-9]{4,12}$/;
    const pwCheck = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const phoneCheck = /^\d{10,11}$/;
    const nameCheck = /^[가-힣a-zA-Z\s]{2,30}$/; // 이름 정규식

    switch (name) {
      case "memberId":
        if (!idCheck.test(value)) {
          setidDefindMessage(
            "아이디는 4~12자의 영문 대소문자와 숫자로만 구성되어야 합니다."
          );
        } else {
          setidDefindMessage("");
        }
        break;
      case "memberPw":
        if (!pwCheck.test(value)) {
          setpwDefindMessage(
            "비밀번호는 8자 이상이어야 하며, 문자와 숫자를 포함해야 합니다."
          );
        } else {
          setpwDefindMessage("");
        }
        break;
      case "memberPhone":
        if (!phoneCheck.test(value)) {
          setphoneDefindMessage("전화번호는 10~11자의 숫자만 입력해야 합니다.");
        } else {
          setphoneDefindMessage("");
        }
        break;
      case "memberName":
        if (!nameCheck.test(value)) {
          setnameDefindMessage(
            "이름은 2~30자의 한글, 영문 또는 공백으로 구성되어야 합니다."
          );
        } else {
          setnameDefindMessage("");
        }
        break;
      default:
        break;
    }
  };

  const userInfoChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    checkDataInput(name, value); // 입력 값 변경 시 실시간 유효성 검사
  };

  const profileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setProfileImagePreview(fileURL);
      return () => URL.revokeObjectURL(fileURL);
    }
  };

  const userInfoSubmit = async () => {
    const formData = new FormData();
    formData.append(
      "memberInfo",
      new Blob([JSON.stringify(memberInfo)], { type: "application/json" })
    );
    if (profileImage) {
      formData.append("memberProfile", profileImage);
    }

    if (window.confirm("수정된 정보를 저장하시겠습니까?")) {
      await axios
        .put("/api/mypage/update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert("회원 정보 업데이트 성공");
          setLoginMember((prevMember) => ({
            ...prevMember,
            ...response.data,
          }));
          mainNavigate("/");
        })
        .catch((error) => {
          console.error("회원 정보 업데이트 실패 :", error);
        });
    }
  };

  const userDeleteBtn = () => {
    if (window.confirm("정말로 회원 탈퇴를 하시겠습니까?")) {
      axios
        .delete(`/api/mypage/delete/${loginMember.memberNo}`)
        .then(() => {
          alert("회원 탈퇴가 완료되었습니다.");
          setLoginMember(null);
          mainNavigate("/");
        })
        .catch((error) => {
          console.error("회원 탈퇴 실패 :", error);
        });
    }
  };

  if (!loginMember) {
    return <div className="login-prompt">로그인이 필요합니다.</div>;
  }

  return (
    <div className="mypage-container">
      <h1 className="mypage-title">⚽{defaultName}님의 마이페이지⚽</h1>
      <div className="mypage-content">
        <div className="user-info">
          <label>
            이름
            <input
              type="text"
              name="memberName"
              value={memberInfo.memberName}
              onChange={userInfoChange}
              className="input-field"
            />
            {nameDefindMessage && (
              <div
                className={`error-message ${
                  nameDefindMessage.includes("유효") ? "valid" : "invalid"
                }`}
              >
                {nameDefindMessage}
              </div>
            )}
          </label>
          <label>
            이메일
            <input
              type="email"
              name="memberEmail"
              value={memberInfo.memberEmail}
              onChange={userInfoChange}
              className="input-field"
            />
          </label>
          <label>
            주소
            <input
              type="text"
              name="memberAddress"
              value={memberInfo.memberAddress}
              onChange={userInfoChange}
              className="input-field"
            />
          </label>
          <label>
            핸드폰 번호
            <input
              type="text"
              name="memberPhone"
              value={memberInfo.memberPhone}
              onChange={userInfoChange}
              className="input-field"
            />
            {phoneDefindMessage && (
              <div
                className={`error-message ${
                  phoneDefindMessage.includes("유효") ? "valid" : "invalid"
                }`}
              >
                {phoneDefindMessage}
              </div>
            )}
          </label>
        </div>
        <div className="user-profile">
          <label>
            프로필 이미지
            <div className="profile-thumbnail">
              {profileImagePreview && (
                <div className="profile-img">
                  <img src={profileImagePreview} className="profile-preview" />
                </div>
              )}
            </div>
            <label className="img-input">
              <img className="input-profile" src="/images/input-profile.gif" />
              프로필 업로드
              <input
                type="file"
                name="memberProfile"
                accept="image/*"
                onChange={profileChange}
                className="file-input"
              />
            </label>
          </label>
          <label>
            I D
            <input
              type="text"
              name="memberId"
              value={memberInfo.memberId}
              onChange={userInfoChange}
              className="input-field"
            />
            {idDefindMessage && (
              <div
                className={`error-message ${
                  idDefindMessage.includes("유효") ? "valid" : "invalid"
                }`}
              >
                {idDefindMessage}
              </div>
            )}
          </label>
          <label>
            P W
            <input
              type="password"
              name="memberPw"
              value={memberInfo.memberPw}
              onChange={userInfoChange}
              className="input-field"
            />
            {pwDefindMessage && (
              <div
                className={`error-message ${
                  pwDefindMessage.includes("유효") ? "valid" : "invalid"
                }`}
              >
                {pwDefindMessage}
              </div>
            )}
          </label>
        </div>
      </div>

      <div className="button-group">
        <div className="user-page-buttons">
          <button className="user-submit-button" onClick={userInfoSubmit}>
            수정하기
          </button>
          <button className="user-delete-button" onClick={userDeleteBtn}>
            회원 탈퇴
          </button>
          <Link to="/">
            <button className="home-button">홈으로 돌아가기</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyPage;