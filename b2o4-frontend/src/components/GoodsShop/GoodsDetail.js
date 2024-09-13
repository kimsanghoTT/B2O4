import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/GoodsDetail.css';
import axios from "axios";

// 디테일
const GoodsDetail = ({ loginMember, userBasketItem, checkLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const good = location.state.good;


  //샵으로 돌아가기
  const returnToGoodsShop = () => {
    navigate("/goodsShop");
  };

  
  // 선택한 사이즈
  const [selectSize, setSelectSize] = useState(good.goodsSize ? good.goodsSize.split(",")[0] : "");

  // 사이즈 선택
  const handleSizeChange = (e) => {
    setSelectSize(e.target.value);
  };
  const sizes = good.goodsSize ? good.goodsSize.split(",") : [];

  //각 이미지 출력
  const imgSrc1 = `${process.env.PUBLIC_URL}/images/${good.goodsImage}`;    //이미지1
  console.log(imgSrc1);
  const imgSrc2 = `${process.env.PUBLIC_URL}/images/${good.goodsImage2}`;   //이미지2
  console.log(imgSrc2);
  


  // 장바구니에 추가
  const addToShoppingBasket = () => {

    //로그인하지 않았으면 로그인해주세요
    if(!loginMember) { 
      if(window.confirm("로그인이 필요합니다!")){ //window.confirm alert창 확인/취소
        navigate("/login") //확인누르면 로그인화면으로
      }
      return;
    }




    const basketItem = {
      memberNo: loginMember.memberNo,
      goodsNo: good.goodsNo,
      goodsQuantity: 1,
      basketTotal: good.goodsPrice,
      goodsSize: selectSize
    };

    axios.post('/basket/add', basketItem)
      .then(() => {
        if(window.confirm('장바구니에 추가되었습니다. 이동하시겠습니까?')) {
          navigate("/shoppingBasket");
        }
      })
      .catch(err => {
        console.error("Error: ", err);
      });
  };


  if (!good) {
    return <p>상품 정보를 불러오는 데 실패했습니다.</p>; // 데이터가 없을 경우 처리
  }
  return (
    <div className="detail-container">
      <h2>{good.goodsName}</h2>
      <hr />
      <img src={imgSrc1} alt={good.goodsImage} />
      <img src={imgSrc2} alt={good.goodsImage2} />

      <div className="detail-text">
        <p>₩ {good.goodsPrice.toLocaleString()}</p>
        <p>{good.goodsDetail}</p>
      </div>


      {/* 사이즈 선택 */}
      <div className="detail-sizeSelect">
        <label htmlFor="size-select">사이즈 선택 : </label>
        <select id="size-select" value={selectSize} onChange={handleSizeChange}>
          {good.goodsSize.split(",").map((size, index) => (
            <option key={index} value={size}> {size} </option>
          ))}
      </select>
      </div>


      <div className="buttons">
        <button className="basketAdd-button" onClick={addToShoppingBasket}>장바구니에 추가</button>
        {/* 쓰레기 <button className="basketAdd-button" onClick={() => ShoppingBasket(good, loginMember, userBasketItem, checkLogin)}>장바구니에 추가</button>*/}
        <button className="back-button" onClick={returnToGoodsShop} >샵으로 돌아가기</button>
      </div>
    </div>
  );
};

export default GoodsDetail;