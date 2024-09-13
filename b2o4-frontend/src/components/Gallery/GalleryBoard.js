import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import MyPageContext from "../MyPageContext";
import "../css/GalleryBoard.css";
import Pagination from "./Pagination.js";

const GalleryBoard = () => {
  const { loginMember } = useContext(MyPageContext);

  const [GBList, setGBList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gbPerPage = 12;

  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

  const boardList = async () => {
    const response = await axios.get("/gallery/posts");
    setGBList(response.data);
  };

  useEffect(() => {
    boardList();
  }, []);

  const lastGB = currentPage * gbPerPage;
  const firstGB = lastGB - gbPerPage;
  const currentPhotos = GBList.slice(firstGB, lastGB);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClick = () => {
    if (loginMember) {
      navigate("/galleryUpload"); // 로그인 되어 있으면 업로드 페이지로 이동
    } else {
      navigate("/login"); // 로그인 되어 있지 않으면 로그인 페이지로 이동
    }
  };

  return (
    <div className="galleryBoard-container">
      <div className="gallery-grid">
        {currentPhotos.map((list) => (
          <div className="gallery-item" key={list.gbPostNo}>
            <Link
              to={`/galleryBoard/${list.gbPostNo}`}
              state={{ list: list }}
              className="gallery-link"
            >
              {list.gbImages ? (
                <img
                  className="gallery-item-img"
                  src={`/images/${list.gbImages.split(",")[0]}`}
                  alt={list.gbPostTitle}
                />
              ) : (
                <img
                  className="gallery-item-img"
                  src="./default-image.png"
                  alt="Default"
                />
              )}
              <div className="gallery-body">
                <h5 className="gallery-title">{list.gbPostTitle}</h5>
                <div className="gallery-text">
                  <p>
                    {list.memberName} &nbsp; | &nbsp; {list.gbPostCreateDate}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="pagination-container">
        <Pagination
          className="pagination"
          itemPerPage={gbPerPage}
          totalItems={GBList.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <div className="write-button">
          <Button variant="primary" onClick={handleClick}>
            글쓰기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GalleryBoard;
