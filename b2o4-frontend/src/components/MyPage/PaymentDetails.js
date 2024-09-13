import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import MyPageContext from "../MyPageContext";
import "../css/PaymentHistoryCss.css";

const PaymentHistory = () => {
  const { loginMember } = useContext(MyPageContext);
  const [paymentDetails, setPaymentDetails] = useState([]);

  useEffect(() => {
    if (loginMember && loginMember.memberNo) {
      axios
        .get(`/api/payments/user/${loginMember.memberNo}`)
        .then((response) => {
          console.log(response.data);
          setPaymentDetails(response.data);
        })
        .catch((error) => {
          console.error("결제 내역을 불러오는 중 오류가 발생했습니다:", error);
        });
    }
  }, [loginMember]);

  console.log(paymentDetails)

  return (
    <div className="payment-history-container">
      <h2>예약 정보</h2>
      {paymentDetails.length > 0 ? (
        <table className="payment-history-table">
          <thead>
            <tr>
              <th>구장 이미지</th>
              <th>구장 이름</th>
              <th>위치</th>
              <th>주소</th>
              <th>수용 인원</th>
              <th>가격</th>
              <th>예약 일시</th>
              <th>경기 예정 일자</th>
              <th>경기 예약 시간</th>
              <th>인원수</th>
            </tr>
          </thead>
          <tbody>
            {paymentDetails.map((detail) => (
              <tr key={detail.reservationNo}>
                <td>
                  <img src={`/images/${detail.stadiumImage}`} alt={detail.stadiumName} />
                </td>
                <td>{detail.stadiumName}</td>
                <td>{detail.stadiumLocation}</td>
                <td>{detail.stadiumAddress}</td>
                <td>{detail.stadiumCapacity}</td>
                <td>{detail.stadiumPrice.toLocaleString()} 원</td>
                <td>{new Date(detail.reservationDate).toLocaleDateString()}</td>
                <td>{new Date(detail.matchDate).toLocaleDateString()}</td>
                <td>{detail.matchTime}</td>
                <td>{detail.reserveCount} 명</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="payment-history-empty">결제 내역이 없습니다.</p>
      )}
    </div>
  );
};

export default PaymentHistory;