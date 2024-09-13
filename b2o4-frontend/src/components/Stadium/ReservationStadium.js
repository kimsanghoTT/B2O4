import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/ReservationStadium.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const ReservationStadium = () => {
  const [personCount, setPersonCount] = useState(1); 
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [stadiumCapacity, setStadiumCapacity] = useState(1); 
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const stadium = location.state?.stadium;

  
  useEffect(() => {
    flatpickr(".reservationDate", {
      dateFormat: "Y-m-d",
      minDate: "today",
      maxDate: new Date().fp_incr(14),
      onChange: (selectedDates) => {
        const selectedDate = selectedDates[0];
        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() + 1);
        setReservationDate(nextDay.toISOString().split("T")[0]);
        console.log("Selected Date: ", nextDay);
      },
    });
  }, []);
  
  useEffect(() => {
    if (!stadium) {
      setError('구장 데이터가 없습니다. 홈 페이지로 돌아갑니다...');
      setTimeout(() => navigate('/'), 3000);
      return;
    }
    fetchStadiumDetails();
  }, [stadium, navigate]);

  const fetchStadiumDetails = async () => {
    try {
      const res = await axios.get(`/stadiums/stadiumDetail/${stadium.stadiumNo}`);
      if (res.data && res.data.stadiumCapacity) {
        setStadiumCapacity(res.data.stadiumCapacity);
      }
    } catch (err) {
      console.error('구장 세부 정보를 가져오는 중 오류 발생:', err);
      setError('구장 세부 정보를 로드하지 못했습니다.');
    }
  };

  const handlePersonCountChange = (event) => {
    setPersonCount(parseInt(event.target.value));
  };

  const handleDateChange = (event) => {
    setReservationDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setReservationTime(event.target.value);
  };

  const calculateTotalPrice = () => {
    return stadium.stadiumPrice * personCount;
  };

  const handlePayment = () => {
    const paymentInfo = {
      stadium,
      personCount,
      reservationDate,
      reservationTime,
      totalPrice: calculateTotalPrice(),
    };
  
    sessionStorage.setItem('paymentInfo', JSON.stringify(paymentInfo)); 
    sessionStorage.setItem('hasRequested', 'false'); // 새로운 결제 시작 시 플래그를 false로 설정
  
    navigate('/payment/checkout', {
      state: paymentInfo
    });
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!stadium) {
    return <div>로딩 중...</div>;
  }

  const handleBackClick = () => {
    navigate("/StadiumList");
  };

  return (
    <div className="stadium-reservation-container">
      <button onClick={handleBackClick} className="go-stadiumList-button-res">돌아가기</button>
      <div className="stadium-reservation-div">
        <td className="reservation-stadium-name"><span id="stadiumName">{stadium.stadiumName}({stadium.stadiumLocation})</span></td>
        <input
          type="date"
          className="reservationDate"
          name="closingDate"
          min={minDate}
          max={maxDate}
          value={reservationDate}
          onChange={handleDateChange} 
          placeholder="날짜 선택하기"
          required
        />
        &nbsp; &nbsp; &nbsp;
        <select className="reservationTime-select" value={reservationTime} onChange={handleTimeChange}>
          <option>예약 시간</option>
          <option value="06:00 ~ 08:00">06:00 ~ 08:00</option>
          <option value="08:00 ~ 10:00">08:00 ~ 10:00</option>
          <option value="10:00 ~ 12:00">10:00 ~ 12:00</option>
          <option value="12:00 ~ 14:00">12:00 ~ 14:00</option>
          <option value="14:00 ~ 16:00">14:00 ~ 16:00</option>
          <option value="16:00 ~ 18:00">16:00 ~ 18:00</option>
          <option value="18:00 ~ 20:00">18:00 ~ 20:00</option>
          <option value="20:00 ~ 22:00">20:00 ~ 22:00</option>
          <option value="22:00 ~ 00:00">22:00 ~ 00:00</option>
          <option value="00:00 ~ 02:00">00:00 ~ 02:00</option>
        </select>
        &nbsp; &nbsp; &nbsp;
          <div className="qwer">
        <select className="reservationPersonCount" value={personCount} onChange={handlePersonCountChange}>
          {[...Array(stadiumCapacity).keys()].map(i => (
            <option key={i+1} value={i+1}>{i+1}명</option>
          ))}
        </select>
        </div>
        <div>
        <tr>
          <td className="reservation-stadium-total-price">총액 : <span id="totalPrice">{calculateTotalPrice().toLocaleString()}</span></td>
        </tr>
        </div>
        <button className="reservation-button" onClick={handlePayment}>결제하기</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default ReservationStadium;
