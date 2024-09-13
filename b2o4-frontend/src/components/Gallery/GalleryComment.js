import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MyPageContext from "../MyPageContext";
import axios from "axios";
import "../css/GalleryComment.css";

const GalleryComment = () => {
  const { loginMember } = useContext(MyPageContext);
  const location = useLocation();
  const list = location.state.list;

  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [anonymousCount, setAnonymousCount] = useState(() => {
    const storedCount = localStorage.getItem(`anonymousCount_${list.gbPostNo}`);
    return storedCount ? parseInt(storedCount, 10) : 1;
  });
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [showReplies, setShowReplies] = useState({});

  const fetchComment = async () => {
    try {
      const response = await axios.get("/gallery/comment");
      const comments = response.data.filter(
        (comment) => comment.gbPostNo === list.gbPostNo
      );

      const topLevelComments = [];
      const commentMap = new Map();

      comments.forEach((comment) => {
        commentMap.set(comment.gbCommentNo, { ...comment, replies: [] });
        if (comment.gbCommentClass === 1) {
          const parentComment = commentMap.get(comment.parentCommentNo);
          if (parentComment) {
            parentComment.replies.push(comment);
          }
        } else {
          topLevelComments.push(commentMap.get(comment.gbCommentNo));
        }
      });

      topLevelComments.forEach((comment) => {
        comment.replies.sort(
          (a, b) =>
            new Date(b.gbCommentCreateDate) - new Date(a.gbCommentCreateDate)
        );
      });

      topLevelComments.sort(
        (a, b) =>
          new Date(b.gbCommentCreateDate) - new Date(a.gbCommentCreateDate)
      );
      setCommentList(topLevelComments);
    } catch (error) {
      console.error("댓글 목록을 가져오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  const commentWrite = async () => {
    const formData = new FormData();

    if (files.length > 0) {
      Array.from(files).forEach((file) => formData.append("files", file));
    }

    formData.append("gbCommentContent", content);
    formData.append("gbPostNo", list.gbPostNo);
    formData.append("memberNo", loginMember ? loginMember.memberNo : 0);
    formData.append(
      "memberName",
      loginMember ? loginMember.memberName : `익명${anonymousCount}`
    );

    try {
      await axios.post("/gallery/comment", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("댓글 작성이 완료되었습니다.");
      setContent("");
      setFiles([]);
      fetchComment();

      if (!loginMember) {
        const newCount = anonymousCount + 1;
        setAnonymousCount(newCount);
        localStorage.setItem(`anonymousCount_${list.gbPostNo}`, newCount);
      }
    } catch (error) {
      console.error("댓글 작성에 실패했습니다.", error);
    }
  };

  const commentDelete = async (gbCommentNo) => {
    try {
      await axios.delete(`/gallery/comment/${gbCommentNo}`);
      alert("삭제되었습니다.");
      fetchComment();
    } catch (error) {
      console.error("댓글 삭제에 실패했습니다.", error);
    }
  };

  const replyWrite = async () => {
    if (activeCommentId === null) return;

    const formData = new FormData();

    formData.append("gbCommentContent", replyContent);
    formData.append("gbPostNo", list.gbPostNo);
    formData.append("parentCommentNo", activeCommentId);
    formData.append("gbCommentClass", 1);
    formData.append("memberNo", loginMember ? loginMember.memberNo : 0);
    formData.append(
      "memberName",
      loginMember ? loginMember.memberName : `익명${anonymousCount}`
    );

    try {
      await axios.post("/gallery/comment/reply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("답글 작성이 완료되었습니다.");
      setReplyContent("");
      setActiveCommentId(null);
      fetchComment();

      if (!loginMember) {
        const newCount = anonymousCount + 1;
        setAnonymousCount(newCount);
        localStorage.setItem(`anonymousCount_${list.gbPostNo}`, newCount);
      }
    } catch (error) {
      console.error("답글 작성에 실패했습니다.", error);
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment.gbCommentNo} className="comment-item">
        <div className="name-date">
          <div>
            <p className="comment-writer">
              <strong>{comment.memberName}</strong>
            </p>
          </div>
          <div className="comment-date">
            <p>{comment.gbCommentCreateDate}</p>
          </div>
        </div>
        <div className="comment-content">
          {comment.gbCommentImages &&
            comment.gbCommentImages
              .split(",")
              .map((image) => (
                <img
                  key={image}
                  src={`/images/${image}`}
                  alt={comment.gbCommentNo}
                />
              ))}
          <p>{comment.gbCommentContent}</p>
        </div>
        <div className="comment-reply">
          {comment.gbCommentClass === 0 && (
            <button
              onClick={() => {
                if (activeCommentId === comment.gbCommentNo) {
                  setActiveCommentId(null);
                  setShowReplies((prev) => ({
                    ...prev,
                    [comment.gbCommentNo]: false,
                  }));
                } else {
                  setActiveCommentId(comment.gbCommentNo);
                  setShowReplies((prev) => ({
                    ...prev,
                    [comment.gbCommentNo]: true,
                  }));
                }
              }}
            >
              {activeCommentId === comment.gbCommentNo ? "답글 숨기기" : "답글"}
            </button>
          )}
          {loginMember &&
            list &&
            ((loginMember.memberNo === list.memberNo &&
              (loginMember.memberNo === comment.memberNo ||
                comment.memberName.startsWith("익명"))) ||
              loginMember.memberNo === comment.memberNo) && (
              <button onClick={() => commentDelete(comment.gbCommentNo)}>
                삭제
              </button>
            )}
        </div>
        {activeCommentId === comment.gbCommentNo && (
          <div className="reply-write">
            <p>
              {loginMember ? loginMember.memberName : `익명${anonymousCount}`}
            </p>
            <div className="content-submit">
              <input
                type="text"
                placeholder="답글을 남겨보세요"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <button onClick={replyWrite}>등록</button>
            </div>
          </div>
        )}
        {showReplies[comment.gbCommentNo] && comment.replies.length > 0 && (
          <div className="reply-list">{renderComments(comment.replies)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="comment-container">
      <div className="comment-title">
        <p>Comments</p>
      </div>
      <div className="comment-view">{renderComments(commentList)}</div>
      <div className="comment-write">
        <div className="name-file">
          <p>
            {loginMember ? loginMember.memberName : `익명${anonymousCount}`}
          </p>
          <label htmlFor="imageUpload">
            <img src="/camera.jpg" alt="카메라 아이콘" />
            이미지 선택
          </label>
          <input
            type="file"
            id="imageUpload"
            multiple
            onChange={handleFileChange}
          />
        </div>

        <div className="content-submit">
          <input
            type="text"
            placeholder="댓글을 남겨보세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={commentWrite}>등록</button>
        </div>
      </div>
    </div>
  );
};

export default GalleryComment;
