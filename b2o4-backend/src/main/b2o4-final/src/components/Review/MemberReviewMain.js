import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/ReviewCss.css";

const ITEMS_PER_PAGE = 8;

const MemberReviewMain = () => {
  const [memberList, setMemberList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("member");
  const [currentPage, setCurrentPage] = useState(1);

  const handleButtonClick = (type) => {
    setActiveButton(type);
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get("/api/memberReview");
      setMemberList(response.data);
    } catch (error) {
      console.error("유저 리스트 불러오기 실패 : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  
  const totalPages = Math.ceil(memberList.length / ITEMS_PER_PAGE);
  const paginatedList = memberList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="memberReviewMain-container">
      <h1 className="headers">😎참가자 평가😎</h1>
      <div className="button-group">
        <Link to="/stadiumInfo">
          <button
            className={`stadiumchange-btn ${
              activeButton === "stadium" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("stadium")}
          >
            구장 평가
          </button>
        </Link>
        <Link to="/memberInfo">
          <button
            className={`memberchange-btn ${
              activeButton === "member" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("member")}
          >
            참가자 평가
          </button>
        </Link>
      </div>
      <div className="memberReviewMain-content">
        {isLoading ? (
          <div className="loading-spinner">
            <img src="./loading.gif" alt="로딩 중" />
          </div>
        ) : (
          paginatedList.map((list) => (
            <Link
              key={list.memberNo}
              to={`/memberReviewDetail/${list.memberNo}`}
              state={{ list: list }}
              className="memberReview-link"
            >
              <div className="memberReview">
                <img
                  src={`/images/${list.memberProfile}`}
                  className="memberReview-img"
                  alt={`${list.memberName} 프로필`}
                />
                <div className="memberReview-textline">
                  <h2>{list.memberName}</h2>
                  <hr />
                  <p>레벨 : {list.memberRank}</p>
                  <p>참여 경기 수 : {list.memberCount} 게임</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <div className="review-pagination">
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
    </div>
  );
};

export default MemberReviewMain;