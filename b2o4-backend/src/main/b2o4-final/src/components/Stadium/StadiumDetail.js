import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/StadiumDetail.css';
import MyPageContext from "../MyPageContext";

const StadiumDetail = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const [stadiums, setStadiums] = useState([]);
    const stadium = location.state.stadium;

    console.log("location", location);

    useEffect(() => {
        StadiumDetailList();
    }, []);

    const StadiumDetailList = async() => {
        const res = await axios.get('/stadiums');
        setStadiums(res.data);
    };

    const handleBackClick = () => {
        navigate("/stadiumList");
    };


    const { loginMember } = useContext(MyPageContext);

    const makeReservation = () => {

        if(loginMember){
            navigate(`/reservationStadium/${stadium.stadiumNo}`, { state: { stadium } });
        } else {
            navigate('/login')
        }
    
    };
        
    console.log(typeof stadium.stadiumPrice);

    return (
        <div> 
            <button onClick={handleBackClick} className="go-stadiumList-button">돌아가기</button>
                <div className="stadium-detail-container">
                        <div className="col-4 stadium-reservation-img-table">
                            <td><img src={`../images${stadium.stadiumImage}`} alt="stadium"/></td>
                        </div>
                        <div className="col-4 stadium-detail-text">
                            <td className="stadium-detail-name">{stadium.stadiumName}</td>
                            <hr></hr>
                            <td>구장주소 : {stadium.stadiumAddress}</td>
                            <hr></hr>
                            <td>수용인원 : {stadium.stadiumCapacity}명</td>
                            <hr></hr>
                            <td>주차여부 : {stadium.stadiumParking == 'Y' ? "가능" : "불가능"}</td>
                            <hr></hr>
                            <td>실내외 : {stadium.stadiumInOutdoor == 'I' ? "실내" : "실외"} </td>
                            <hr></hr>
                            <td>신발렌트 : {stadium.shoesRent == 'Y' ? "가능" : "불가능"}</td>
                            <hr></hr>
                            <td>인당가격 : \ {stadium.stadiumPrice.toLocaleString()}</td>
                        </div>
                </div>
            <div className="go-reservation-button-div">
                <button onClick={makeReservation} className="go-reservation-button">예약하기</button>
            </div>
        </div>
    )
}

export default StadiumDetail;