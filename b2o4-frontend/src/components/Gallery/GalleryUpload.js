import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MyPageContext from '../MyPageContext';
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from 'react-router-dom';

const GalleryUpload = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  
  const navigate = useNavigate();

  const {loginMember} = useContext(MyPageContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/gallery/posts');
      console.log("response.data : " + response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("게시물을 가져오는 데 실패했습니다.", error);
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    const formData = new FormData();

    if(files.length > 0) {
      Array.from(files).forEach(file => {
        formData.append("files", file);
      });
    }
    formData.append("title", title);
    formData.append("content", content);
    formData.append("memberNo", loginMember.memberNo);
    formData.append("memberName", loginMember.memberName);

    try {
      await axios.post('/gallery/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("게시글 작성이 완료되었습니다..");
      fetchPosts();
      navigate('/galleryBoard');
    } catch (error) {
      console.error("게시글 작성에 실패했습니다.", error);
    }
  };

  return (
    <div className="upload-container">
      <div className='upload'>
        <h1>게시글 작성</h1>
      </div>
      <div className='upload-input'>
        <div className='input-title'>
          <input type="text" placeholder="제목을 입력하세요." value={title} onChange={(e) => setTitle(e.target.value)} required/>
        </div>
          <div className='input-file'>
            <label htmlFor='imageUpload'><img src='camera.jpg'/></label>
            <input type="file" id='imageUpload' multiple onChange={handleFileChange} />
          </div>
          <div className='input-text'>
            {files.length > 0 && files.map ((file, index) => (
              <div key={index}>
                 <img src={URL.createObjectURL(file)} />
              </div>
             ))}
            <input type="text" placeholder="내용을 입력하세요." value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
        <Button variant="success" onClick={handleUpload}>업로드하기</Button>
      </div>
    </div>
  );
}

export default GalleryUpload;
