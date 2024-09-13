import { useEffect, useState, useRef } from "react";
import axios from "axios";
import '../css/MainPage.css';
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MonthOfTheStadiumList = () => {
    const [stadiumList, setStadiumList] = useState([]);
    const [topStadiums, setTopStadiums] = useState([]);
    const navigate = useNavigate();
    const sliderRef = useRef(null);

    const getStadiumList = () => {
        axios.get("/main/stadium")
            .then(res => {
                setStadiumList(res.data);
            });
    };

    useEffect(() => {
        getStadiumList();
    }, []);

    useEffect(() => {
        if (stadiumList.length > 0) {
            //좋아요 - 싫어요가 가장 높은 3개 뽑기
            const sortedStadiums = [...stadiumList].sort((a, b) => b.totalLike - a.totalLike);
            const top3Stadiums = sortedStadiums.slice(0, 3);
            setTopStadiums(top3Stadiums);
        }
    }, [stadiumList]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
    };

    const handlePrev = () => {
        sliderRef.current.slickPrev();
    };

    const handleRowClick = (stadium) => {
        navigate(`/stadiumDetail/${stadium.stadiumNo}`, { state: { stadium: stadium } });
    };

    return (
        <div className='famous-stadium-list-container'>
            <div className='section-title'>
                <Link to="/StadiumList"><h1>Stadium of the Month</h1></Link>
                <hr />
            </div>
            <div className="slider-container">
                <Slider {...settings} ref={sliderRef}>
                    {stadiumList && stadiumList.map(stadium => (
                        <div key={stadium.stadiumNo} className={`stadium-card-body ${topStadiums.some(ts => ts.stadiumNo === stadium.stadiumNo) ? 'highlight' : ''}`} onClick={() => handleRowClick(stadium)}>
                            {topStadiums.some(famous => famous.stadiumNo === stadium.stadiumNo) &&
                                <img className="hot" src="/images/hotItem.jpg" alt="핫아이템"/>}
                            {stadium.stadiumImage ? 
                                <img src={`/images/${stadium.stadiumImage}`} alt='스타디움 사진' className="stadium-image" />
                                : <img src="/images/defaultImage.png" alt="이미지 없음" />}
                            <div className="stadium-desc row">
                                <div className="col-10">
                                    <div className="stadium-desc-except-price">
                                    <p className="stadium-name">{stadium.stadiumName}</p>
                                    <p className="stadium-address">{stadium.stadiumAddress}</p>
                                    <p className="stadium-capacity">최대 수용 인원 : {stadium.stadiumCapacity} 명</p>
                                    </div>
                                    <p className="stadium-price">{stadium.stadiumPrice.toLocaleString()} 원(1인)</p>
                                </div>
                                <div className="col-2">
                                    <p className="totalLike">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                        </svg>
                                        &nbsp;
                                        {stadium.totalLike}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <button className="slick-prev" onClick={handlePrev}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                    </svg>
                </button>
                <button className="slick-next" onClick={handleNext}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default MonthOfTheStadiumList;