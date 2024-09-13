import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/ReviewCss.css";

const ITEMS_PER_PAGE = 8;

const StadiumReviewMain = () => {
  const [stadiumList, setStadiumList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("stadium");
  const [currentPage, setCurrentPage] = useState(1);

  const handleButtonClick = (type) => {
    setActiveButton(type);
  };

  const fetchStadiums = async () => {
    try {
      const response = await axios.get("/api/stadiumReview");
      setStadiumList(response.data);
    } catch (error) {
      console.error("Error fetching stadiums:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStadiums();
  }, []);

  // 페이지네이션 관련 계산
  const totalPages = Math.ceil(stadiumList.length / ITEMS_PER_PAGE);
  const paginatedList = stadiumList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="stadiumReviewMain-container">
      <h1 className="headers">⚽구장 평가⚽</h1>
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
      <div className="stadiumReviewMain-content">
        {isLoading ? (
          <div className="loading-spinner">
            <img src="./loading.gif" alt="로딩 중" />
          </div>
        ) : (
          paginatedList.map((list) => (
            <Link
              key={list.stadiumNo}
              to={`/stadiumReviewDetail/${list.stadiumNo}`}
              state={{ list: list }}
              className="stadiumReview-link"
            >
              <div className="stadiumReview">
                <img
                  src={`/images/${list.stadiumImage}`}
                  className="stadiumReview-img"
                  alt={list.stadiumName}
                />
                <div className="stadiumReview-textline">
                  <h2>{list.stadiumName}</h2>
                  <hr />
                  <p>지역 : {list.stadiumLocation}</p>
                  <p>수용가능 인원 : {list.stadiumCapacity} 명</p>
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

export default StadiumReviewMain;