import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import MyPageContext from "../MyPageContext";
import "../css/DeliveryInfoCss.css";

const UserDeliveryInfo = () => {
  const { loginMember } = useContext(MyPageContext);
  const [userDeliveryInfos, setUserDeliveryInfos] = useState([]);

  useEffect(() => {
    if (loginMember && loginMember.memberNo) {
      axios
        .get(
          `/api/payments/user/delivery/${loginMember.memberNo}`
        )
        .then((response) => {
          setUserDeliveryInfos(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("배송 정보를 가져오는 중 오류가 발생했습니다:", error);
        });
    }
  }, [loginMember]);

  return (
    <div className="user-delivery-info-container">
      <h2>구매 내역</h2>
      <div>
        {userDeliveryInfos.length > 0 ? (
          <table className="user-delivery-info-table">
            <thead>
              <tr>
                <th>상품 이미지</th>
                <th>배송 주소</th>
                <th>수령자 이름</th>
                <th>수령자 전화번호</th>
                <th>배송 요청사항</th>
                <th>생성 날짜</th>
              </tr>
            </thead>
            <tbody>
              {userDeliveryInfos.map((deliveryInfos) => (
                <tr key={deliveryInfos.deliveryNo}>
                  <td>
                    <img
                      src={`/images/${deliveryInfos.goodsImage}`}
                      alt="상품 이미지"
                      className="user-product-image"
                    />
                  </td>
                  <td>{deliveryInfos.deliveryAddress}</td>
                  <td>{deliveryInfos.recipientName}</td>
                  <td>{deliveryInfos.recipientPhone}</td>
                  <td>{deliveryInfos.deliveryRequest || "없음"}</td>
                  <td>
                    {new Date(deliveryInfos.createdDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>구매 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default UserDeliveryInfo;