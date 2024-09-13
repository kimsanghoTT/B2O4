import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import MemberReviewUpload from "./MemberReviewUpload";
import axios from "axios";
import '../css/ReviewCss.css'

const MemberReviewDetail = () => {
  const location = useLocation();
  const list = location.state.list;
  const [contentBoxView, setContentBoxView] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [likeSum, setLikeSum] = useState(0);
  const [dislikeSum, setDislikeSum] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const { memberNo } = useParams();

  useEffect(() => {
    // 좋아요 합계
    axios
      .get(`/api/memberReview/${memberNo}/likeCount`)
      .then((response) => {
        setLikeSum(response.data);
      })
      .catch((error) => {
        console.error("좋아요를 불러오는데 실패하였습니다.", error);
      });

    // 싫어요 합계
    axios
      .get(`/api/memberReview/${memberNo}/dislikeCount`)
      .then((response) => {
        setDislikeSum(response.data);
      })
      .catch((error) => {
        console.error("싫어요를 불러오는데 실패하였습니다.", error);
      });

    // 리뷰 리스트
    axios
      .get(`/api/memberReview/${memberNo}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("리뷰를 불러오는데 실패했습니다.", error);
      });
  }, [reviews, memberNo]);

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
    <div className="memberReviewdetail-container">
      <div className="memberReviewdetail-content">
        <h3 className="headers">🏃‍♂️ {list.memberName} 님의 정보 🏃‍♀️</h3>
        <img src={`/images/${list.memberProfile}`} alt="Profile" />
        <p>참가자 이름 : {list.memberName}</p>
        <p>참가 매치 수 : {list.matchCount}</p>
        <p>랭크 : {list.memberRank}</p>
        <div className="icon-container">
          <label>
            <img src="/icon-like.png" alt="Like Icon" />
            <br />
            {likeSum} <br />
            좋아요
          </label>
          <label>
            <img src="/icon-dislikes.png" alt="Dislike Icon" />
            <br />
            {dislikeSum} <br />
            싫어요
          </label>
        </div>
      </div>
      <div className="member-review">
        <Link to="/memberInfo">
          <button>돌아가기</button>
        </Link>
        <button
          onClick={() => {
            setContentBoxView(!contentBoxView);
          }}
        >
          {contentBoxView ? "닫기" : "작성하기"}
        </button>
        <div className="contentBoxView-wrapper">
          {contentBoxView && <MemberReviewUpload />}
        </div>
        <div className="reviews">
          <h2 className="headers">✍️평가</h2>
          {currentReviews.length > 0 ? (
            currentReviews.map((review) => (
              <div key={review.memberReviewNo} className="review">
                <p>⚽</p>
                <p className="review-comment">
                  평가 글 : {review.memberComment}
                </p>
                <p>작성 날짜 : {review.memberCommentDate}</p>
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

export default MemberReviewDetail;