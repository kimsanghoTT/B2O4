import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import StadiumReviewUpload from "./StadiumReviewUpload";
import '../css/ReviewCss.css';

const StadiumReviewDetail = () => {
  const location = useLocation();
  const list = location.state.list;
  const [contentBoxView, setContentBoxView] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [likeSum, setLikeSum] = useState(0);
  const [dislikeSum, setDislikeSum] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const { stadiumNo } = useParams();

  useEffect(() => {
    // 좋아요 합계
    axios
      .get(`/api/stadiumReview/${stadiumNo}/likeCount`)
      .then((response) => {
        setLikeSum(response.data);
      })
      .catch((error) => {
        console.error("좋아요 합계를 가져오는 데 실패했습니다.", error);
      });
    // 싫어요 합계
    axios
      .get(`/api/stadiumReview/${stadiumNo}/dislikeCount`)
      .then((response) => {
        setDislikeSum(response.data);
      })
      .catch((error) => {
        console.error("싫어요 합계를 가져오는 데 실패했습니다.", error);
      });
    // 평가 보기
    axios
      .get(`/api/stadiumReview/${stadiumNo}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("리뷰를 불러오는데 실패했습니다.", error);
      });
  }, [stadiumNo, reviews]);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const pagination = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reviews.length / reviewsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="stadiumReviewdetail-container">
      <div className="stadiumReviewdetail-content">
      <h3 className="headers">🥅 {list.stadiumName} 의 정보 🥅</h3>
        <img src={`/images/${list.stadiumImage}`} alt={list.stadiumName} />
        <p>풋살장 이름 : {list.stadiumName}</p>
        <p>매칭 인원 수 : {list.stadiumCapacity} 명</p>
        <p>주소 : {list.stadiumAddress}</p>
        <div className="icon-container">
          <label>
            <img src="/icon-like.png" alt="Like Icon" />
            <br />
            {likeSum} <br/>
            좋아요
          </label>
          <label>
            <img src="/icon-dislikes.png" alt="Dislike Icon" />
            <br />
            {dislikeSum} <br/>
            싫어요
          </label>
        </div>
      </div>
      <div className="stadiumreview">
        <Link to="/stadiumInfo"><button>돌아가기</button></Link>
        <button onClick={() => setContentBoxView(!contentBoxView)}>
          {contentBoxView ? "닫기" : "작성하기"}
        </button>
        <div className="contentBoxView-wrapper">
          {contentBoxView && <StadiumReviewUpload />}
        </div>

        {/* 구장 리뷰들 보여줘야 함 */}
        <div className="reviews">
          <h2 className="headers">✍️평가</h2>
          {currentReviews.length > 0 ? (
            currentReviews.map((review) => (
              <div key={review.stadiumReviewNo} className="review">
                <p>⚽</p>
                <p className="review-comment">
                 <strong className="review-comment-info">평가 글</strong> : {review.stadiumComment}
                </p>
                <p>작성 날짜 : {review.stadiumCommentDate}</p>
                <p>
                  {review.likeCount > 0 && <span>👍</span>}
                  {review.dislikeCount > 0 && <span>👎</span>}
                </p>
              </div>
            ))
          ) : (
            <p className="review-defind">평가 글이 없습니다.</p>
          )}
          <div className="pagination">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => pagination(number)}
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StadiumReviewDetail;