import React, { useState, useContext } from "react";
import axios from 'axios';
import MyPageContext from '../MyPageContext'; // MyPageContext를 불러옴
import { useNavigate } from "react-router-dom";
import '../css/BoardPosting.css';

const BoardPosting = () => {
    const { loginMember } = useContext(MyPageContext); // 로그인 정보
    console.log("로그인한 사람 정보", loginMember);
    const [posting, setPosting] = useState([]);
    const [boardTitle, setBoardTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');
    const navigate = useNavigate();

    // addPost 함수 수정: boardTitle, boardContent, memberNo 정보를 포함한 객체를 전송
    const addPost = async (board) => {
        try {
            const res = await axios.post('/boards', board);
            setPosting([...posting, res.data]);
        } catch (err) {
            console.error("Error adding post:", err);
        }
    }

    const handleBackClick = () => {
        navigate("/boardMain");
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // 게시글 정보와 함께 loginMember의 memberNo 정보를 추가하여 전달
        const boardData = {
            boardTitle: boardTitle,
            boardContent: boardContent,
            memberNo: loginMember.memberNo
        };
        
        if(!boardTitle && !boardContent) {
            e.preventDefault();
            alert("제목 및 내용을 작성하세요.");
        } else {
            alert("글 등록이 완료되었습니다.");
            console.log("보낼 데이터", boardData);
            addPost(boardData);
            navigate("/boardMain");
        }
    }

    return (
        <div>
            <img className="board-top-img" src="../images/5346ae379c2ae.png"/>
            <div className="board-post-table">
                <button onClick={handleBackClick} className="post-back-button">돌아가기</button>
                <button onClick={handleSubmit} type="submit" className="post-button">글 작성 완료</button>
                <form className="post-table">
                    <div>
                        <input type="text" className="posting-title" value={boardTitle} placeholder="제목을 입력하세요." onChange={(e) => setBoardTitle(e.target.value)} required />
                    </div>
                    <div>
                        <textarea className="posting-content" value={boardContent} placeholder="내용을 입력하세요." onChange={(e) => setBoardContent(e.target.value)} required />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BoardPosting;
