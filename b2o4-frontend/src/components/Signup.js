import React, { useState } from 'react';
import './css/Signup.css'; // CSS 파일을 별도로 분리
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState({
    memberId: '',
    memberPw: '',
    memberPwConfirm: '',
    memberName: '',
    memberPhone: '',
    memberEmail: '',
    memberAddress: '',
    memberDetailAddress: '', // 상세 주소 필드 추가
    memberBirth: '',
    profileImage: '', // 미리보기를 위한 URL을 저장
    memberProfile: null,  // 이미지 파일을 저장할 상태 추가
  });
  const [errors, setErrors] = useState({
    memberId: '',
    memberPw: '',
    memberPwConfirm: '',
    memberName: '',
    memberPhone: '',
    memberEmail: '',
    memberAddress: '',
    memberDetailAddress: '',
    memberBirth: '',
    profileImage: ''
  });
  const [isIdAvailable, setIsIdAvailable] = useState(null); // 아이디 중복 검사 결과 저장
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'memberId') setIsIdAvailable(null); // 아이디 입력 시 중복 확인 초기화
    // 입력 값이 비어있을 때 오류 메시지 삭제
    if (value === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }));
    } else {
      validateField(name, value);
    }
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value
    }));
  };
  const validateField = (name, value) => {
    let errorMsg = '';
    switch (name) {
      case 'memberId':
        if (!/^[a-zA-Z0-9]{4,12}$/.test(value)) {
          errorMsg = '아이디는 4-12자의 영문, 숫자 조합이어야 합니다.';
        }
        break;
      case 'memberPw':
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
          errorMsg = '비밀번호는 최소 8자, 하나 이상의 문자 및 숫자를 포함해야 합니다.';
        }
        break;
      case 'memberPwConfirm':
        if (value !== member.memberPw) {
          errorMsg = '비밀번호가 일치하지 않습니다.';
        }
        break;
      case 'memberName':
        if (!/^[가-힣a-zA-Z\s]{2,30}$/.test(value)) {
          errorMsg = '이름은 2-30자의 한글 또는 영문이어야 합니다.';
        }
        break;
      case 'memberPhone':
        if (!/^\d{10,11}$/.test(value)) {
          errorMsg = '핸드폰번호는 - 없이 10-11자리의 숫자이어야 합니다.';
        }
        break;
      case 'memberEmail':
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)) {
          errorMsg = '올바른 이메일 주소를 입력해주세요.';
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMember({
        ...member,
        profileImage: URL.createObjectURL(file), // 미리보기를 위한 URL 생성
        memberProfile: file // 실제 업로드할 파일을 상태에 저장
      });
    }
  };
  const handleIdCheck = async () => {
    const memberIdError = errors.memberId;
    // 아이디 유효성 검사 먼저 체크
    if (memberIdError) {
      alert(memberIdError);
      return;
    }
    if (!member.memberId.trim()) {
      alert("아이디를 입력하세요");
      setIsIdAvailable(false);
      return;
    }
    try {
      const response = await axios.get('/api/idCheck', {
        params: { id: member.memberId },
      });
      if (response.data.isAvailable) {
        setIsIdAvailable(true);
        setErrors((prevErrors) => ({
          ...prevErrors,
          memberId: '',
        }));
      } else {
        setIsIdAvailable(false);
        setErrors((prevErrors) => ({
          ...prevErrors,
          memberId: '이미 사용 중인 아이디입니다.',
        }));
      }
    } catch (error) {
      console.error('ID 체크 중 문제 발생:', error);
      setIsIdAvailable(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // 모든 필드에 대한 유효성 검사 수행
    Object.keys(member).forEach((name) => validateField(name, member[name]));
    
    // 오류가 있는 경우 제출 중지
    if (Object.values(errors).some((error) => error !== '')) {
      console.log('유효성 검사 오류:', errors);
      return;
    }
    console.log('Member Data:', member);
    const formData = new FormData();
    formData.append('memberId', member.memberId);
    formData.append('memberPw', member.memberPw);
    formData.append('memberName', member.memberName);
    formData.append('memberPhone', member.memberPhone);
    formData.append('memberEmail', member.memberEmail);
    formData.append('memberAddress', member.memberAddress);
    formData.append('memberDetailAddress', member.memberDetailAddress); // 상세 주소 추가
    formData.append('memberBirth', member.memberBirth);
    formData.append('profileImage', member.memberProfile);
    fetch('/api/members', {
      method: "POST",
      body: formData
    })
      .then((response) => {
        if (response.ok) {
          return response.text(); // 서버에서 받은 응답 텍스트를 반환
        } else {
          throw new Error('회원가입 실패');
        }
      })
      .then((fileName) => {
        console.log('성공:', fileName);
        alert('회원가입 성공하였습니다!'); // 성공 메시지
        setMember({
          memberId: '',
          memberPw: '',
          memberPwConfirm: '',
          memberName: '',
          memberPhone: '',
          memberEmail: '',
          memberAddress: '',
          memberDetailAddress: '', // 초기화
          memberBirth: '',
          profileImage: '',
          memberProfile: null,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error('오류 발생:', error);
        alert('회원가입 실패하였습니다!'); // 실패 메시지
      });
  };
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        setMember((prevMember) => ({
          ...prevMember,
          memberAddress: data.address
        }));
      }
    }).open();
  };
  return (
    <div className="signup-background">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              아이디
              <div className="input-container">
                <input
                  type="text"
                  name="memberId"
                  value={member.memberId}
                  onChange={handleChange}
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={handleIdCheck}
                  className="check-button"
                >
                  중복확인
                </button>
              </div>
              {errors.memberId && (
                <div className="error-message">{errors.memberId}</div>
              )}
              {isIdAvailable === true && (
                <div className="success-message">
                  사용 가능한 아이디입니다.
                </div>
              )}
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              비밀번호
              <input
                type="password"
                name="memberPw"
                value={member.memberPw}
                onChange={handleChange}
                className="form-input"
              />
              {errors.memberPw && (
                <div className="error-message">{errors.memberPw}</div>
              )}
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              비밀번호 확인
              <input
                type="password"
                name="memberPwConfirm"
                value={member.memberPwConfirm}
                onChange={handleChange}
                className="form-input"
              />
              {errors.memberPwConfirm && (
                <div className="error-message">{errors.memberPwConfirm}</div>
              )}
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              이름
              <input
                type="text"
                name="memberName"
                value={member.memberName}
                onChange={handleChange}
                className="form-input"
              />
              {errors.memberName && (
                <div className="error-message">{errors.memberName}</div>
              )}
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              핸드폰번호
              <input
                type="text"
                name="memberPhone"
                value={member.memberPhone}
                onChange={handleChange}
                className="form-input"
              />
              {errors.memberPhone && (
                <div className="error-message">{errors.memberPhone}</div>
              )}
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              이메일
              <input
                type="email"
                name="memberEmail"
                value={member.memberEmail}
                onChange={handleChange}
                className="form-input"
              />
              {errors.memberEmail && (
                <div className="error-message">{errors.memberEmail}</div>
              )}
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              생년월일
              <input
                type="date"
                name="memberBirth"
                value={member.memberBirth}
                onChange={handleChange}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              주소
              <div className="input-container">
                <input
                  type="text"
                  name="memberAddress"
                  value={member.memberAddress}
                  onChange={handleChange}
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={handleAddressSearch}
                  className="address-search-button"
                >
                  주소 검색
                </button>
              </div>
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              상세 주소
              <input
                type="text"
                name="memberDetailAddress"
                value={member.memberDetailAddress}
                onChange={handleChange}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              프로필
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input"
              />
            </label>
            {member.profileImage && (
              <div className="profile-preview">
                <img
                  src={member.profileImage}
                  alt="Profile Preview"
                  className="profile-image"
                />
              </div>
            )}
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;