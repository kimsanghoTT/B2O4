import React, { useContext, useState, useEffect } from "react";
import MypageContext from "../MyPageContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/UsedItemBoard.css";

const UsedItemBoard = () => {
  const { loginMember } = useContext(MypageContext);
  const [usedItemList, setUsedItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 6; 

  const navigate = useNavigate();

  // 중고 목록 가져오기
  useEffect(() => {
    axios
      .get("/usedItem/all")
      .then((response) => {
        console.log(response.data); // 데이터 확인
        setUsedItemList(response.data);
      })
      .catch((error) => {
        console.log("error : ", error);
      });
  }, []);

  // 비로그인 시 로그인 화면으로
  const handleLogin = () => {
    if (loginMember) {
      navigate("/usedItem/upload");
    } else {
      navigate("/login");
    }
  };

  // 현재 페이지에 해당하는 아이템만 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = usedItemList.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(usedItemList.length / itemsPerPage);

  return (
    <div className="usedItem-container">
      <div className="header">
        <h1>중고나라</h1>
        <button onClick={handleLogin} className="upload-button">
          {loginMember ? "상품 등록하기" : "로그인 후 상품 등록하기"}
        </button>
      </div>
      <hr></hr>
      <div className="usedItem-list">
        {Array.isArray(currentItems) && currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div key={item.usedItemNo} className="usedItem-card">
              {/* 첫 번째 이미지만 */}
              <div className="usedItem-images">
                {item.usedItemImages.split(",")[0] && (
                  <img
                    src={`/images/${item.usedItemImages.split(",")[0]}`}
                    alt={`Used Item`}
                    className="usedItem-image"
                  />
                )}
              </div>
              <div className="usedItem-info">
                <p>글 번호 : {item.usedItemNo}</p>
                <h3 className="usedItem-title">{item.usedItemTitle}</h3>
                <p className="usedItem-user">판매자 : {item.memberName}</p>
                <p className="usedItem-userPhone">연락처 : {item.memberPhone}</p>

                <Link
                  to={`/usedItem/${item.usedItemNo}`}
                  state={{ item }}
                  className="detail-button"
                >
                  <button>상세보기</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>중고 아이템이 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsedItemBoard;
