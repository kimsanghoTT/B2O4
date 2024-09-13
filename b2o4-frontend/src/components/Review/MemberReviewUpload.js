import React, { useContext, useEffect, useState } from "react";
import MyPageContext from "../MyPageContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const MemberReviewUpload = () => {
  const memberInputReview = "/api/memberinputreview";

  const { reviewList, setReviewList, loginMember } = useContext(MyPageContext);

  const [inputReview, setInputReview] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { memberNo } = useParams(); // 평가 대상의 번호

  useEffect(() => {
    if (loginMember) {
      const existingReview = reviewList.find(
        (review) =>
          review.reviewMemberNo === loginMember.memberNo &&
          review.memberNo === memberNo
      );
      if (existingReview) {
        setHasReviewed(true);
        setLiked(existingReview.likeCount > 0);
        setDisliked(existingReview.dislikeCount > 0);
        setLikeCount(existingReview.likeCount);
        setDislikeCount(existingReview.dislikeCount);
      }
    }
  }, [reviewList, loginMember, memberNo]);

  const addReview = () => {
    if (inputReview.trim().length === 0) {
      alert("평가를 작성해주세요.");
      return;
    }

    if (!memberNo.trim().length) {
      alert("참가자를 선택해주세요.");
      return;
    }

    if (!loginMember || !loginMember.memberNo) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (hasReviewed) {
      alert("이미 리뷰를 작성하셨습니다.");
      return;
    }

    if (!liked && !disliked) {
      alert("좋아요 또는 싫어요를 선택해주세요.");
      return;
    }

    axios
      .post(memberInputReview, {
        memberNo,
        likeCount: liked ? 1 : 0,
        dislikeCount: disliked ? 1 : 0,
        memberComment: inputReview,
        reviewMemberNo: loginMember.memberNo, // 평가하는 사람의 번호
      })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          const newReview = {
            memberReviewNo: data.memberReviewNo,
            memberNo,
            likeCount: liked ? 1 : 0,
            dislikeCount: disliked ? 1 : 0,
            memberComment: inputReview,
            reviewMemberNo: loginMember.memberNo,
          };

          const newReviewList = Array.isArray(reviewList)
            ? [...reviewList, newReview]
            : [newReview];

          setReviewList(newReviewList);
          setInputReview("");
          setHasReviewed(true);
        } else {
          alert("리뷰 업로드에 실패했습니다.");
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  const likeBtn = () => {
    if (!liked) {
      if (disliked) {
        setDisliked(false);
        setDislikeCount(dislikeCount - 1);
      }
      setLiked(true);
      setLikeCount(likeCount + 1);
    } else {
      setLiked(false);
      setLikeCount(likeCount - 1);
    }
  };

  const disLikeBtn = () => {
    if (!disliked) {
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
      setDisliked(true);
      setDislikeCount(dislikeCount + 1);
    } else {
      setDisliked(false);
      setDislikeCount(dislikeCount - 1);
    }
  };

  return (
    <div>
      <main>
        <div>
          <button onClick={likeBtn} disabled={hasReviewed}>
            👍 {likeCount}
          </button>
          <button onClick={disLikeBtn} disabled={hasReviewed}>
            👎 {dislikeCount}
          </button>
        </div>
        <section className="review-content">
          <label style={{ display: "none" }}>
            평가 대상 번호:
            <input
              type="text"
              value={memberNo}
              readOnly
              style={{ display: "none" }}
            />
          </label>
          <label>
            내용
            <textarea
              type="text"
              onChange={(e) => setInputReview(e.target.value)}
              placeholder="평가 내용을 입력해 주세요."
              value={inputReview}
              className="review-text"
            />
          </label>
          <br />
          <button onClick={addReview} disabled={hasReviewed}>
            작성하기
          </button>
        </section>
      </main>
    </div>
  );
};

export default MemberReviewUpload;
