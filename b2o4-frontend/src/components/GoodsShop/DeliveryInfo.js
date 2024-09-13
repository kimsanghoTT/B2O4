import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyPageContext from "../MyPageContext";
import axios from "axios";
import "../css/DeliveryInfo.css";

const GoodsPurchase = () => {
  //memberName, memberAddress, memberPhone

  const { loginMember, basketList, setBasketList } = useContext(MyPageContext);
  const navigate = useNavigate();

  const [deliveryAddress, setdeliveryAddress] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");



  //멤버주소 불러오기 -> 배송지주소
  useEffect(() => {
    if (loginMember && loginMember.memberAddress) {
      setdeliveryAddress(loginMember.memberAddress);
    }
  }, [loginMember]);



  //멤버이름 불러오기 -> 수령인명
  useEffect(() => {
    if (loginMember && loginMember.memberName) {
      setRecipientName(loginMember.memberName);
    }
  }, [loginMember]);



  //멤버핸드폰번호 불러오기 -> 수령인번호
  useEffect(() => {
    if (loginMember && loginMember.memberPhone) {
      setRecipientPhone(loginMember.memberPhone);
    }
  }, [loginMember]);



  //배송요청사항
  const [deliveryRequest, setDeliveryRequset] = useState("");



  //로그인멤버의 장바구니 불러오기
  useEffect(() => {
    if (loginMember && loginMember.memberNo) {
      axios
        .get(`/basket/all/${loginMember.memberNo}`)
        .then((response) => {
          setBasketList(response.data);
          console.log("response.data : ", response.data);
          const filterBasketList = response.data.filter(
            (item) => item.goodsQuantity > 0
          );
          setBasketList(filterBasketList);
        })
        .catch((error) => {
          alert("일시적인 오류입니다. 관리자에게 문의하세요" + error);
        });
    }
  }, [loginMember, setBasketList]);
  console.log("BRRRRRRRRRRRRRRRRRRRRRRRR");



  // 결제 총액 계산
  const totalAmount = basketList.reduce((total, item) => {
    return total + item.goodsQuantity * item.goodsPrice;
  }, 0);



  // 배송 요청사항 옵션
  const deliveryRequestOptions = [
    "문앞에 놔주세요.",
    "택배함에 넣어주세요.",
    "경비실에 맡겨주세요.",
    "도착 전 연락바랍니다.",
  ];



  //새로고침해도 페이지 유지
  if (!loginMember) {
    return "";
  }




  //최종주문 정보들
  const submitData = {
    memberNo: loginMember.memberNo,
    //basketNo: basketList[0]?.basketNo,
    basketNos: basketList.map((item) => item.basketNo), // 장바구니 번호 리스트로 변경
    deliveryAddress: deliveryAddress,
    recipientName: recipientName,
    recipientPhone: recipientPhone,
    deliveryRequest: deliveryRequest,
  };



  //최종주문
  const finalOrder = () => {
    console.log(submitData);
    axios
      .post("/delivery/add", submitData)
      .then((response) => {
        alert("주문이 완료되었습니다.");
        //navigate("/마이페이지 확인")
      })
      .catch((error) => {
        alert("주문내역을 다시 확인해주세요.");
      });
  };

    /*
    //결제부분 코드
        const handlePayment = () => {
            navigate("/토스결제페이지");
        }
    */



  return (
    <div className="purchase-container">
      <h2>주문 정보 입력</h2>
      <div className="purchase-info">
        <table className="info-table">
          <tbody>
            <tr>
              <th>회원 ID : </th>
              <td>{loginMember ? loginMember.memberId : "정보 없음."}</td>
            </tr>
            <tr>
              <th>수령인 이름 : &nbsp;&nbsp;</th>
              <td>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="수령인 이름을 입력하세요."
                />
              </td>
            </tr>
            <tr>
              <th>배송지 주소 : &nbsp;&nbsp;</th>
              <td>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setdeliveryAddress(e.target.value)}
                  placeholder="배송지 주소를 입력하세요."
                />
              </td>
            </tr>
            <tr>
              <th>연락처 : &nbsp;&nbsp;</th>
              <td>
                <input
                  type="text"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  placeholder="연락처를 입력하세요."
                />
              </td>
            </tr>
            <tr>
              <th>배송 요청 사항 : &nbsp;&nbsp;</th>
              <td>
                <select
                  value={deliveryRequest}
                  onChange={(e) => setDeliveryRequset(e.target.value)}
                >
                  <option value="">선택하세요.</option>
                  {deliveryRequestOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-container">
        <table className="basket-table">
          <thead>
            <tr>
              <th>상품 이미지</th>
              <th>상품 정보</th>
              <th>결제 총액</th>
            </tr>
          </thead>
          <tbody>
            {basketList.length > 0 ? (
              basketList.map((item) => (
                <tr key={item.basketNo}>
                  <td>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/${item.goodsImage}`}
                      alt={item.goodsName}
                    />
                  </td>
                  <td>
                    <p>
                      <strong>상품명 : </strong>
                      {item.goodsName}
                    </p>
                    <p>
                      <strong>사이즈 : </strong>
                      {item.goodsSize}
                    </p>
                    <p>
                      <strong>상품 개수 : </strong>
                      {item.goodsQuantity}
                    </p>
                  </td>
                  <td>
                    <p><strong>
                        총액 : ₩ {
                        (item.goodsPrice * item.goodsQuantity).toLocaleString()}
                      </strong></p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">장바구니가 비어 있습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="payment-final">
        <table className="final-amount-table">
          <tbody>
            <tr>
              <th>결제 총액</th>
              <td>₩{totalAmount.toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan="2">
                <button className="payment-button" onClick={finalOrder}>
                  결제하기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GoodsPurchase;
