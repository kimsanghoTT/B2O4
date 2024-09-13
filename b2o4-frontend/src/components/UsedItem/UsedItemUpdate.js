import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyPageContext from '../MyPageContext';
import '../css/UsedItemUpdate.css';

const UsedItemUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {}; // 전달된 아이템 정보
  const { loginMember } = useContext(MyPageContext);
  const [memberName, setMemberName] = useState(loginMember ? loginMember.memberName : "");
  const [memberPhone, setMemberPhone] = useState(loginMember ? loginMember.memberPhone : "");


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);

  // 초기값 설정
  useEffect(() => {
    if (item) {
      setTitle(item.usedItemTitle);
      setContent(item.usedItemDescription);
    }
  }, [item]);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpdate = () => {
    if (!title || !content) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('memberNo', loginMember.memberNo);
    formData.append("memberName", memberName);
    formData.append("memberPhone", memberPhone);

    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    axios.put(`/usedItem/edit/${item.usedItemNo}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      alert("글이 성공적으로 수정되었습니다.");
      navigate(`/usedItemBoard`); 
    })
    .catch(error => {
      alert("글 수정에 실패했습니다.");
    });
  };

  return (
    <div className="usedItem-update-container">
      <h1>글 수정</h1>
      <div className="form-group">
        <label>제목:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>내용:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>이미지 업로드:</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
        />
      </div>
      <button onClick={handleUpdate} className="update-button">
        수정하기
      </button>
    </div>
  );
};

export default UsedItemUpdate;
