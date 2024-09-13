import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/StadiumList.css';
import Pagination from "../PagiNation.js";

const StadiumList = () => {
    const [stadiums, setStadiums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [itemPerPage] = useState(6); // 한 페이지에서 게시글 6개 씩 보여줌
    const [stadiumSearch, setStadiumSearch] = useState(''); // 검색어
    const [filteredStadiums, setFilteredStadiums] = useState([]); // 필터링된 경기장 목록
    const navigate = useNavigate();

    useEffect(() => {
        AllStadiumList();
    }, []);

    const AllStadiumList = async () => {
        const res = await axios.get('/stadiums');
        setStadiums(res.data);
        setFilteredStadiums(res.data); // 초기에는 전체 목록을 표시
    };

    const handleRowClick = (stadium) => {
        navigate(`/stadiumDetail/${stadium.stadiumNo}`, { state: { stadium } });
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = () => {
        const filtered = stadiums.filter((stadium) =>
            stadium.stadiumName.toLowerCase().includes(stadiumSearch.toLowerCase()) ||
            stadium.stadiumAddress.toLowerCase().includes(stadiumSearch.toLowerCase())
        );
        setFilteredStadiums(filtered);
        setCurrentPage(1); // 검색 후 페이지를 첫 페이지로 설정
    };

    // Enter 키를 눌렀을 때 검색 실행
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const lastItem = currentPage * itemPerPage;
    const firstItem = lastItem - itemPerPage;
    const itemList = filteredStadiums.slice(firstItem, lastItem);

    console.log("필터링된 스타디움 정보:", filteredStadiums);

    return (
        <div className="stadium-list-container">
            <div className="stadium-search-input-button">
                <input
                    type="text"
                    placeholder="구장을 검색하세요."
                    onChange={(e) => setStadiumSearch(e.target.value)}
                    onKeyPress={handleKeyPress} // Enter 키를 눌렀을 때 검색 실행
                    className="stadium-search-input"
                />
                <button onClick={handleSearch} className="stadium-search-button">🔍</button>
            </div>

            {/* 검색 결과가 없을 때 메시지 표시 */}
            {filteredStadiums.length === 0 ? (
                <h1>검색된 정보가 없습니다.</h1>
            ) : (
                <div className="row stadium-list-block">
                    {itemList.map(stadium => (
                        <div className="col-4 stadium-item" key={stadium.stadiumNo} onClick={() => handleRowClick(stadium)}>
                            <div className="stadiumImg-stadiumName">
                                <div className="stadium-list-img">
                                    <img src={`../images${stadium.stadiumImage}`} alt={stadium.stadiumName} />
                                </div>
                            </div>
                            <div className="stadium-list-name">
                                {stadium.stadiumName} ({stadium.stadiumLocation})
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* 페이지네이션은 검색 결과가 있을 때만 표시 */}
            {filteredStadiums.length > 0 && (
                <Pagination
                    itemPerPage={itemPerPage}
                    totalItems={filteredStadiums.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            )}
        </div>
    );
}

export default StadiumList;