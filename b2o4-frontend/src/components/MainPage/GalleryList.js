import { useEffect, useState, useRef } from "react";
import '../css/MainPage.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GalleryList = () => {
    const [galleryItem, setGalleryItem] = useState([]);
    const navigate = useNavigate();
    const sliderRef = useRef(null);

    const getGalleryList = () => {
        axios.get("/main/gallery")
            .then(res => {
                setGalleryItem(res.data);
            })
    }

    useEffect(() => {
        getGalleryList();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 3,
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

    const handleRowClick = (gallery) => {
        navigate(`/galleryBoard/${gallery.gbPostNo}`, { state: { list:gallery } });
    };

    console.log(galleryItem);
    

    return (
        <div className='gallery-list-container'>
            <div className='section-title'>
                <Link to="/galleryBoard"><h1>Gallery</h1></Link>
                <hr />
            </div>
            <div className="slider-container">
                <Slider {...settings} ref={sliderRef}>
                    {galleryItem && galleryItem.map(gallery => (
                            <div onClick={() => handleRowClick(gallery)} key={gallery.gbPostNo} className="gallery-card-body">
                                {gallery.gbImages ? <img src={`/images/${
                                    gallery.gbImages.split(",")[0]
                                  }`} alt='갤러리 사진' />
                                    : <img src='./default-image.png' alt="이미지없음" />}
                                <div className="gallery-desc">
                                    <p className="gallery-desc-title">{gallery.gbPostTitle}</p>
                                    <p className="gallery-desc-name">{gallery.memberName}</p>
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
}

export default GalleryList;