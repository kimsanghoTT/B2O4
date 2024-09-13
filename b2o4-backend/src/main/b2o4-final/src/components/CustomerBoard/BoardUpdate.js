import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import '../css/BoardUpdate.css';

const BoardUpdate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);
    const [boardTitle, setBoardTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');
    const board = location.state.board;

    useEffect(() => {
        BoardUpdateReady();
        if (board) {
            setBoardTitle(board.boardTitle);
            setBoardContent(board.boardContent);
        }
    }, [board]);

    const BoardUpdateReady = async() => {
        const res = await axios.get('/boards');
        setBoards(res.data);
    };

    const UpdatePost = async (e) => {
        e.preventDefault();
        const updatedBoard = {
            ...board,
            boardTitle,
            boardContent,
        };
        await axios.put(`/boards?boardNo=${board.boardNo}`, updatedBoard);
        setBoards(boards.map(b => (b.boardNo === board.boardNo ? updatedBoard : b)));
        navigate("/boardMain");
    }

    const deletePost = async (e) => {
        e.preventDefault();
        await axios.delete(`/boards?boardNo=${board.boardNo}`);
        setBoards(boards.filter(b => b.boardNo !== board.boardNo));
        navigate("/boardMain");
    }

    const handleBackClick = () => {
        navigate(`/boardContent/${board.boardNo}`, { state: { board: board } });
    };

    return (
        <div>
            <img className="board-top-img" src="../images/5346ae379c2ae.png"/>
            <div className="board-update-table">
                <button onClick={handleBackClick} className="back-content-button">돌아가기</button>
                <button type="submit" className="update-success-button" onClick={UpdatePost}>글 수정 완료</button>
                <button type="button" className="delete-post" onClick={deletePost}>글 삭제 하기</button>

                <form className="update-form">
                    <div className="update-top">
                        <input 
                            className="board-update-title"
                            type="text" 
                            value={boardTitle} 
                            onChange={(e) => setBoardTitle(e.target.value)} 
                            required
                        />
                    </div>
                    <div>
                        <textarea 
                            className="board-update-content"
                            value={boardContent} 
                            onChange={(e) => setBoardContent(e.target.value)} 
                            required
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BoardUpdate;
