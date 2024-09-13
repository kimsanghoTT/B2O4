import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/GalleryModal.css';

const PasswordChange = ({ userInfo }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // 비밀번호 유효성 검사 정규식
  const passwordValidationRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      setError("모든 필드를 입력하세요.");
      return;
    }

    if (!passwordValidationRegex.test(newPassword)) {
        setError('비밀번호는 최소 8자, 하나 이상의 문자와 숫자를 포함해야 합니다.');
        return;
      }

    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setSuccess('');
      return;
    }

    try {
      const response = await axios.put('/passwordChange', {
        memberEmail: userInfo.memberEmail,
        memberPw: newPassword,
      });

      if (response.data === '비밀번호 수정 성공') {
        setSuccess("비밀번호가 성공적으로 변경되었습니다.");
        setError('');
      } else {
        setError("비밀번호 변경에 실패하였습니다.");
      }
    } catch (error) {
      console.error('Axios error:', error);
      setError("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <div className='password-change-container'>
      <h2>비밀번호 변경</h2>
      {success && <div style={{ color: 'green' }}>{success}</div>}
      {!success ? (
        <div className='password-container'>
          <div>
            <br/><br/>
            <label>새 비밀번호:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label>비밀번호 확인:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className='btn btn-dark' onClick={handlePasswordChange}>비밀번호 변경</button>
        </div>
      ) : (
        <button className='btn btn-success login-page-button' onClick={handleLoginRedirect}>로그인 하러 가기</button>
      )}
    </div>
  );
};

export default PasswordChange;