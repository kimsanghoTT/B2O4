import React from "react";
import '../css/MainPage.css';
import MainPageCarousel from "./MainPageCarousel";
import MonthOfTheStadiumList from "./MonthOfTheStadiumList";
import GalleryList from "./GalleryList";
import RecommendedGears from "./RecommendedGears";
import Weather from "./Weather";

const Main = () => {

    return (
        <div className='main-container col-9'>
            <div className='carousel-container'>
                <MainPageCarousel />
            </div>
            <div className="main-content">
                <div className="recommended-content ">
                    <MonthOfTheStadiumList />
                    <GalleryList />
                    <RecommendedGears />
                </div>
                <div className="weather-container">
                    <Weather/>
                </div>
            </div>
        </div>
    )
}
export default Main;