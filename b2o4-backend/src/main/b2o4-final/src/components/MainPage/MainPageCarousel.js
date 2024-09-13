import { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import '../css/MainPage.css';
import { Link } from "react-router-dom";

const MainPageCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="carousel-wrapper"> {/* Wrapping the carousel */}
            <Carousel activeIndex={index} onSelect={handleSelect} interval={1500}>
                <Carousel.Item className='carousel-items'>
                    <Link to="/galleryBoard">
                        <img src="/images/tothegallery.jpg" alt='캐러셀 이미지 1' className="carousel-image" />
                    </Link>
                    <Carousel.Caption className='carousel-caption-text'>
                        <h3>갤러리 게시판</h3>
                        <p>멋진 순간들을 공유하세요</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className='carousel-items'>
                    <Link to="/GoodsShop">
                        <img src="/images/totheshop.jpg" alt='캐러셀 이미지 2' className="carousel-image" />
                    </Link>
                    <Carousel.Caption className='carousel-caption-text'>
                        <h3>스포츠 용품</h3>
                        <p>경기에 나설 준비, 여기서 시작해보세요</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className='carousel-items'>
                    <Link to="/LiveStreamingPage">
                        <img src="/images/tothelive.jpg" alt='캐러셀 이미지 3' className="carousel-image" />
                    </Link>
                    <Carousel.Caption className='carousel-caption-text'>
                        <h3>이벤트 라이브 중계</h3>
                        <p>지금 진행 중인 경기 실황을 놓치지 마세요</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className='carousel-items'>
                    <Link to="/StadiumList">
                        <img src="/images/tothestadiumlist.jpg" alt='캐러셀 이미지 4' className="carousel-image" />
                    </Link>
                    <Carousel.Caption className='carousel-caption-text'>
                        <h3>구장 보러가기</h3>
                        <p>친구들과, 또는 동료들과 함께 뛸 구장을 찾아보세요</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default MainPageCarousel;
