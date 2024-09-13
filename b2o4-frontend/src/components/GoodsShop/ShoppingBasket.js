import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../css/ShoppingBasket.css";
import { useNavigate, Link } from "react-router-dom";
import MyPageContext from "../MyPageContext";


// 장바구니 컴포넌트
const ShoppingBasket = () => {
  const { loginMember, basketList, setBasketList } = useContext(MyPageContext); // join을 goodsNo로 해야할지, 지금 이상태에서 useContext로 상품 리스트를 불러와서 상품정보를 가져올지?
  const [basketGoods, setBasketGoods] = useState([]);
  const navigate = useNavigate();

  console.log("loginMember", loginMember);

  

  // 장바구니 항목 가져오기
  useEffect(() => {
    if (loginMember) {
      axios.get(`/basket/all/${loginMember.memberNo}`)
      .then((response) => {
        console.log("RRRRRRRRRRRRRRRREspose ");
        console.log(response);
        setBasketGoods( response.data.filter(
          (good) => good.memberNo === loginMember.memberNo
        )
      );
    })
    .catch((err) => {
      console.error("Error: ", err);
    });
  }
}, [loginMember, basketList]);
console.log("basketGoods", basketGoods);

/* 쓰레기들
useEffect(() => {
    if (loginMember) {
        axios.get(`/basket/all/${loginMember.memberNo}`)
            .then((response) => {
                setBasketGoods(response.data);
            })
            .catch((err) => {
                console.error("Error: ", err);
            });
    }
}, [loginMember]); */
  
  /*
    useEffect(() => {
        axios.get('/basket/all/',  {
            params: {memberNo: memberNo}
        })
        .then(response => {
            setBasketGoods(response.data);
        })
        .catch(err => {
            console.log("Error", err);
        });
    }, [memberNo]);
*/





  //샵으로 돌아가기
  const returnToGoodsShop = () => {
    navigate("/goodsShop")
  };



  // 수량변경 핸들러
  const handleQuantityChange = (basketNo, newQuantity) => {
    const updatedGoods = basketGoods.map((good) =>
      good.basketNo === basketNo ? { ...good, goodsQuantity: newQuantity } : good
    );
    setBasketGoods(updatedGoods);
  };



  // 장바구니 수량변경
  const updateQuantity = (basketNo, newQuantity) => {
    const updatedGoods = basketGoods.find((good) => good.basketNo === basketNo);
    const newTotal = updatedGoods.goodsPrice * newQuantity;

    axios.put(`/basket/update`, {
      basketNo,
      goodsQuantity: newQuantity,
      basketTotal: newTotal,
    })
    .then(() => {
      setBasketGoods((response) => 
        response.map((good) =>
          good.basketNo === basketNo ? { ...good, goodsQuantity: newQuantity, basketTotal: newTotal } : good
        )
      );
    })
    .catch((error) => {
      alert("관리자에게 문의하세요", error);
    });
  };



  // 장바구니 항목 삭제
  const handleDelete = (basketNo) => {
    axios.delete(`/basket/delete/${basketNo}`)
    .then(() => {
      setBasketGoods(
        basketGoods.filter((good) => good.basketNo !== basketNo)
      );
    })
    .catch((err) => {
      alert("관리자에게 문의하세요")
    });
  };
  
  
  
  
  //상품 합계
  const goodsPriceXgoodsQuantity = (good) => {
    return (good.goodsPrice * good.goodsQuantity);
  }
  
  
  
  // 체크박스 클릭 핸들러
  const checkboxOff = (basketNo, isChecked) => {
    // 장바구니 항목의 수량을 0으로 설정하거나 원래 수량으로 되돌리기
    const updatedGoods = basketGoods.map((good) =>
      good.basketNo === basketNo
    ? { ...good, goodsQuantity: isChecked ? good.goodsQuantity : 0 }
    : good
  );
    setBasketGoods(updatedGoods); // 상태 업데이트
    alert("수량을 변경하시면 자동선택됩니다.");

    // 서버에 수량 업데이트 요청
    updateQuantity(basketNo, isChecked ? updatedGoods.find(good => good.basketNo === basketNo).goodsQuantity : 0);
  };




    // 총액 계산
    const basketTotalTotal = () => {
      return basketGoods
        .filter(good => good.goodsQuantity > 0) // 수량이 0보다 큰 항목만 포함
        .reduce((total, good) => total + goodsPriceXgoodsQuantity(good) ,0) .toLocaleString();
    };





  return (
    <div className="basket-container">
      <h2>장바구니</h2>
      <hr />
      <button className="back-button" onClick={returnToGoodsShop}>샵으로 돌아가기</button>
      <table className="basket-table">
        <caption>
          <p className="totalPrise"><strong>총액 : ₩ </strong>{basketTotalTotal()} </p>   
          <Link to={`/DeliveryInfo`} >     
          <button className="payment-button" >주문하기</button>
          </Link>
        </caption>
        <thead>
          <tr>
            <th>선택</th>
            <th>상품 이미지</th>
            <th>상품 정보</th>
            <th>결제 / 수량변경</th>
          </tr>
        </thead>

        <tbody>
          {basketGoods.length > 0 ? (
            basketGoods.map((good) => (
              <tr key={good.basketNo}>

                <td>
                <input
                    type="checkbox"
                    checked={good.goodsQuantity > 0} // 수량이 0보다 크면 체크
                    onChange={(e) => checkboxOff(good.basketNo, e.target.checked)}
                  />
                </td>

                <td>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/${good.goodsImage}`}
                    alt={good.goodsImage}
                  />
                </td>

                <td>
                  <div className="good-detail">
                    <h5>{good.goodsName}</h5>
                    <p>가격 : ₩{good.goodsPrice.toLocaleString()}</p>
                    <p>사이즈 : {good.goodsSize}</p>
                    {/*<p>수량: {good.goodsQuantity}</p>  수량변경을 해야 한다... input type=number?? */}
                    <p>수량 : &nbsp;
                      <input type="number" min={1} max={9}
                      value={good.goodsQuantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);
                        handleQuantityChange(good.basketNo, newQuantity); 
                        updateQuantity(good.basketNo, newQuantity);
                      }} />
                      </p>
                  </div>
                </td>

                <td>
                  <p><strong>합계: ₩ </strong>{goodsPriceXgoodsQuantity(good).toLocaleString()}</p>     
                  <button className="delete-button" onClick={() => handleDelete(good.basketNo)}>삭제</button>                  
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">장바구니가 비어 있습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingBasket;


