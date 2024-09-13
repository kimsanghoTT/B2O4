import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyPageContext from '../MyPageContext';
import '../css/UsedItemDetail.css'; 

const UsedItemDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {}; 
  const { loginMember } = useContext(MyPageContext);

  if (!item) {
    return <p>해당 글을 찾을 수 없습니다.</p>;
  }

  const handleDelete = () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      axios.delete(`/usedItem/delete/${item.usedItemNo}`, {
        data: { memberNo: loginMember.memberNo }
      })
      .then(response => {
        alert('게시글이 삭제되었습니다.');
        navigate('/usedItemBoard'); 
      })
      .catch(error => {
        console.log('error : ', error);
        alert('게시글 삭제에 실패했습니다.');
      });
    }
  };

  const handleEdit = () => {
    navigate(`/usedItem/edit/${item.usedItemNo}`, { state: { item } });
  };

  return (
    <div className="usedItem-detail-container">
      <h1 className="usedItem-detail-title">{item.usedItemTitle}</h1>
      <hr className="usedItem-detail-divider" />
      <div className="usedItem-detail-images">
        {item.usedItemImages.split(',').map((image, index) => (
          image ? (
            <img
              key={index}
              src={`/images/${image}`}
              alt={`Used Item ${index}`}
              className="usedItem-detail-image"
            />
          ) : null
        ))}
      </div>
      <div className="usedItem-detail-info">
        <p className="usedItem-detail-seller">판매자: {item.memberName}</p>
        <p className="usedItem-detail-phone">연락처: {item.memberPhone}</p>
        <p className="usedItem-detail-description">설명: {item.usedItemDescription}</p>
        {loginMember && loginMember.memberNo === item.memberNo && (
          <div className="usedItem-detail-buttons">
            <button onClick={handleEdit} className="usedItem-detail-edit-button">
              수정하기
            </button>
            <button onClick={handleDelete} className="usedItem-detail-delete-button">
              삭제하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsedItemDetail;
