import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import "../css/SearchResultPageCss.css";

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState({
    stadiums: [],
    goods: [],
    gallery: [],
  });
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get("keyword") || "";

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const stadiumsResponse = await axios.get(
          `/api/search/stadiums?keyword=${keyword}`
        );
        const goodsResponse = await axios.get(
          `/api/search/goodsshops?keyword=${keyword}`
        );
        const galleryResponse = await axios.get(
          `/api/search/galleryboards?keyword=${keyword}`
        );

        setSearchResults({
          stadiums: stadiumsResponse.data,
          goods: goodsResponse.data,
          gallery: galleryResponse.data,
        });
      } catch (error) {
        console.error("검색 결과를 가져오는 중 오류 발생:", error);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  return (
    <div className="search-results-page">
      <h1 className="search-results-title">검색 결과: "{keyword}"</h1>

      <section className="search-results-section">
        <h2 className="search-results-subtitle">🥅 구장 🥅</h2>
        <div className="results-container">
          {searchResults.stadiums.length > 0 ? (
            searchResults.stadiums.map((stadium) => (
              <Link
                to={`/stadiumdetail/${stadium.stadiumNo}`}
                key={stadium.stadiumNo}
                state={{ stadium: stadium }}
                className="result-item"
              >
                <img
                  src={`/images/${stadium.stadiumImage}`}
                  alt={stadium.stadiumName}
                  className="result-image"
                />
                <div className="result-info">
                  <h3 className="result-title">
                    {stadium.stadiumName}
                  </h3>
                  <p className="result-location">
                    구장 위치 : {stadium.stadiumLocation}
                  </p>
                  <p className="result-price">
                    참가비 :{" "}
                    <strong className="price-color">
                      {stadium.stadiumPrice.toLocaleString()}
                    </strong>{" "}
                    원
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-results">구장 검색 결과가 없습니다.</p>
          )}
        </div>
      </section>

      <section className="search-results-section">
        <h2 className="search-results-subtitle">🎁 상품 정보 🎁</h2>
        <div className="results-container">
          {searchResults.goods.length > 0 ? (
            searchResults.goods.map((goods) => (
              <Link
                to={`/goodsDetail/${goods.goodsNo}`}
                key={goods.goodsNo}
                state={{ good: goods }} // 각 상품 정보를 state로 전달
                className="result-item"
              >
                <img
                  src={`/images/${goods.goodsImage}`}
                  alt={goods.goodsName}
                  className="result-image"
                />
                <div className="result-info">
                  <h3 className="result-title">
                    {goods.goodsName}
                  </h3>
                  <p className="result-kind">종류: {goods.goodsKind}</p>
                  <p className="result-price">
                    가격:{" "}
                    <strong className="price-color">
                      {goods.goodsPrice.toLocaleString()}
                    </strong>{" "}
                    원
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-results">용품 장터 검색 결과가 없습니다.</p>
          )}
        </div>
      </section>

      <section className="search-results-section">
        <h2 className="search-results-subtitle">🖊️ 갤러리 📸</h2>
        <div className="results-container">
          {searchResults.gallery.length > 0 ? (
            searchResults.gallery.map((board) => (
              <Link
                to={`/galleryBoard/${board.gbPostNo}`}
                key={board.gbPostNo}
                state={{ list: board }} // 각 게시글 정보를 state로 전달
                className="result-item"
              >
                <img
                  src={`/images/${board.gbImages}`}
                  alt={board.gbPostTitle}
                  className="result-image"
                />
                <div className="result-info">
                  <h3 className="result-title">
                    {board.gbPostTitle}
                  </h3>
                  <p className="result-date">
                    작성일 : {board.gbPostCreateDate}
                  </p>
                  <p className="result-author">작성자 : {board.memberName}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-results">갤러리 검색 결과가 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResultsPage;