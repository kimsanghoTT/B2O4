import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/BoardContent.css";
import MyPageContext from "../MyPageContext";

const BoardContent = () => {
  const location = useLocation();
  const [boards, setBoards] = useState([]);
  const [commentContent, setCommentContent] = useState(""); // 변수명을 더 명확하게 수정
  const [comments, setComments] = useState([]); // 댓글 리스트를 저장할 상태 추가
  const board = location.state.board;
  const navigate = useNavigate();

  useEffect(() => {
    BoardComment();
  }, []);

  // boardComment 정보 가져오기
  const BoardComment = async () => {
    try {
      const res = await axios.get(`/boards/comment/${board.boardNo}`);
      setComments(res.data);
    } catch (error) {
      console.error("댓글 불러오기 실패", error);
    }
  };
  console.log("comment 불러오기", comments); // 전체 댓글 리스트 확인

  useEffect(() => {
    BoardPostList();
  }, []);

  const BoardPostList = async () => {
    const res = await axios.get("/boards");
    setBoards(res.data);
  };

  const { loginMember } = useContext(MyPageContext);

  const handleUpdateClick = () => {
    if (board.memberNo === loginMember.memberNo) {
      navigate(`/boardUpdate/${board.boardNo}`, { state: { board: board } });
    } else {
      alert("수정에 실패했습니다.");
    }
  };

  const handleBackClick = () => {
    navigate("/boardMain");
  };

  if (!loginMember) {
    return;
  }
  console.log("board 정보", board);
  console.log("memberNo", loginMember.memberNo);

  const sendingDate = {
    commentContent: commentContent, // 댓글 내용
    memberNo: loginMember.memberNo, // 로그인한 사용자 번호
    boardNo: board.boardNo, // 게시글 번호
  };

  // 댓글 작성하기
  const adminBoardComment = () => {
    axios
      .post(`/boards/comment`, sendingDate) // URL 수정
      .then((response) => {
        alert("댓글 작성 완료");
        setCommentContent(""); // 댓글 작성 후 입력 필드 초기화
        BoardComment(); // 댓글 리스트 새로고침
      })
      .catch((e) => {
        console.log("실패", e);
        alert("댓글 작성 실패");
      });
  };

  const handleContentCommentDelete = async (commentNo) => {
    try {
      await axios.delete(`/boards/comment?commentNo=${commentNo}`);
      setComments(comments.filter((c) => c.commentNo !== commentNo));
      alert("댓글이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("댓글 삭제 실패", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  console.log("loginMember", loginMember);
  console.log("board", board);

  return (
    <div>
      <img
        className="board-top-img"
        src="../images/5346ae379c2ae.png"
        alt="Board Top"
      />
      <div className="board-content-table">
        {loginMember.memberNo === board.memberNo && (
          <button onClick={handleUpdateClick} className="update-board-button">
            수정하기
          </button>
        )}
        <button onClick={handleBackClick} className="back-button-board-content">
          돌아가기
        </button>
        <table className="boardContent-table">
          <tbody className="board-tbody">
            <tr>
              <div className="content-top">
                <td className="board-title">{board.boardTitle}</td>
                <td className="board-name">{board.memberName}</td>
              </div>
            </tr>
            <td className="board-content">{board.boardContent}</td>
          </tbody>
        </table>
        <input
          className="admin-board-comment"
          type="text"
          hidden={loginMember.memberType !== "A"}
          placeholder="문의 답변"
          value={commentContent} // 상태 연결
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <div className="admin-post-board-comment-div">
          <button
            className="admin-post-board-comment"
            onClick={adminBoardComment}
            hidden={loginMember.memberType !== "A"}
          >
            작성하기
          </button>
        </div>
        {/* 댓글 목록 표시 */}
        <div className="comments-section">
          {comments.map((comment) => (
            <div key={comment.commentNo} className="comment-item">
              <p
                className="admin-board-content-delete-button"
                onClick={() => handleContentCommentDelete(comment.commentNo)}
                hidden={loginMember.memberType !== "A"}
              >
                &times;
              </p>
              <small>관리자 : {comment.memberName}</small>
              <p>{comment.commentContent}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardContent;
