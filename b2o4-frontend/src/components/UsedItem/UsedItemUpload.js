import React, { useContext, useState } from "react";
import MypageContext from "../MyPageContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/UsedItemUpload.css';

const UsedItemUpload = () => {
  const { loginMember } = useContext(MypageContext);
  const navigate = useNavigate();

  // 상품 정보 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [memberName, setMemberName] = useState(loginMember ? loginMember.memberName : "");
  const [memberPhone, setMemberPhone] = useState(loginMember ? loginMember.memberPhone : "");

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginMember) {
      alert("로그인이 필요합니다!!");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("memberNo", loginMember.memberNo);
    formData.append("memberName", memberName);
    formData.append("memberPhone", memberPhone);
    formData.append("files", files);

    // 파일들을 formData에 추가
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await axios.post("/usedItem/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      navigate("/usedItemBoard");

    } catch (error) {
      console.error("글 업로드 에러:", error);
      alert("글 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="usedItem-upload-container">
      <h1>중고물품 등록</h1>
      <form onSubmit={handleSubmit} className="usedItem-upload-form">
        <div className="usedItem-upload-form-group">
          <label htmlFor="title">제목 : </label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>

          <label htmlFor="memberName">판매자 : </label>
          <input type="text" id="memberName" value={memberName} onChange={(e) => setMemberName(e.target.value)} required/>

          <label htmlFor="memberPhone">연락처 : </label>
          <input type="text" id="memberPhone" value={memberPhone} onChange={(e) => setMemberPhone(e.target.value)} required/>
        </div>

        <div className="usedItem-upload-form-group">
          <label htmlFor="content">상품 설명</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required></textarea>
        </div>

        <div className="usedItem-upload-form-group">
          <label htmlFor="files">상품 이미지</label>
          <input
            type="file"
            id="files"
            onChange={handleFileChange}
            multiple
            required/>
        </div>

        <button type="submit" className="usedItem-upload-button">게시글 등록</button>
      </form>
    </div>
  );
};

export default UsedItemUpload;
