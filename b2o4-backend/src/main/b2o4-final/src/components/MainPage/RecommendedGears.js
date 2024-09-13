import { useEffect, useState, useRef } from "react";
import '../css/MainPage.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecommendedGears = () => {
    const [goodsList, setGoodsList] = useState([]);
    const navigate = useNavigate();
    const sliderRef = useRef(null);

    const getRecommendedGears = () => {
        axios.get("/main/goods")
            .then(res => {
                setGoodsList(res.data);
            });
    };

    useEffect(() => {
        getRecommendedGears();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 5,
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

    const handleRowClick = (goods) => {
        navigate(`/goodsDetail/${goods.goodsNo}`, { state: { good: goods } });
    };

    console.log(goodsList);

    return (
        <div className='recommended-goods-container'>
            <div className='section-title'>
                <Link to="/goodsShop"><h1>Recommended Gears</h1></Link>
                <hr />
            </div>
            <div className="slider-container">
                <Slider {...settings} ref={sliderRef}>
                    {goodsList && goodsList.map(goods => (
                        <div key={goods.goodsNo} className="recommended-goods-card-body" onClick={() => handleRowClick(goods)}>
                            {goods.goodsImage ?
                                <img src={`/images/${goods.goodsImage}`} alt='기어 사진' />
                                : <img src="/images/defaultImage.png" alt="이미지 없음" />}
                            <div className="recommended-goods-desc">
                                <div className="recommended-goods-name-box">
                                    <p className="recommended-goods-name">{goods.goodsName}</p>
                                </div>
                                <div>
                                    <p className="recommended-goods-kind">{goods.goodsKind}</p>
                                </div>
                                <div>
                                    <p className="recommended-goods-price">{goods.goodsPrice.toLocaleString()}원</p>
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

export default RecommendedGears;