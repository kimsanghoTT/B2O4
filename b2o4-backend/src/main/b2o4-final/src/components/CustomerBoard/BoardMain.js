import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import '../css/BoardMain.css';
import Table from 'react-bootstrap/Table';
import Pagination from "../PagiNation";
import MyPageContext from "../MyPageContext";

const BoardMain = ({}) => {
    const navigate = useNavigate();
    const [boards,setBoards] = useState([]);
    useEffect(() => {
        BoardPostList();
      }, []);
    
      // boards 정보 가져오기
      const BoardPostList = async() => {
        const res = await axios.get('/boards');
        setBoards(res.data);
      };
      console.log("board DB 정보 불러오기" , boards);


      const handleRowClick = (board) => {
        if(!loginMember){
            alert("비로그인 상태입니다.")
            navigate('/login')
        }
        else {
        navigate(`/boardContent/${board.boardNo}`, { state: { board: board } });
        }
      };

      const [data, setData] = useState([]);
      const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
      const [itemPerPage] = useState(8); // 한 페이지에서 게시글 8 개 씩 보여줌


          // 현재페이지에서 첫번째 항목과 마지막 항목을 체크
    const lastItem = currentPage * itemPerPage;
    const firstItem = lastItem - itemPerPage;
    const itemList = boards.slice(firstItem, lastItem);

    // 이동할 페이지를 클릭할 때 사용할 핸들러
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const { loginMember } = useContext(MyPageContext);

    const BoardPosting = () => {

        if(loginMember){
            navigate('/boardPosting');
        } else {
            navigate('/login')
        }
    
    };

    return (
        <div>
            <img className="board-top-img" src="../images/5346ae379c2ae.png"/>
            <table className="board-table">
                <h2 className="customer-board-center-h2">고객센터</h2>
                <Table striped bordered hover size="sm" className="board-Table">
                <thead>
                    <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList.map(board => (
                    <tr key={board.boardNo} onClick={ () => handleRowClick(board)} className="content-table">
                        <td style={{padding: "10px"}}>{board.boardNo}</td>
                        <td>{board.boardTitle}</td>
                        <td>{board.memberName}</td>
                        <td>{board.boardCreateDate}</td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </table>
            <button className="posting-button" onClick={BoardPosting}>문의하기</button>
            <Pagination
                itemPerPage={itemPerPage}
                totalItems={boards.length}
                paginate={paginate}
                currentPage={currentPage} />
        </div>


    )

}

export default BoardMain;
