import './App.css';
import GalleryUpload from './components/Gallery/GalleryUpload.js';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import GalleryBoard from './components/Gallery/GalleryBoard.js';
import Login from './components/Login/Login.js';
import MyPageContext from './components/MyPageContext.js';
import { useEffect, useState } from 'react';
import GalleryDetail from './components/Gallery/GalleryDetail.js';

import Header from './components/Layout/Header.js'
import FindId from './components/Login/FindId.js';
import FindPw from './components/Login/FindPw.js';

import GoodsShop from "./components/GoodsShop/GoodsShop.js";
import GoodsDetail from "./components/GoodsShop/GoodsDetail.js";
import ShoppingBasket from "./components/GoodsShop/ShoppingBasket.js";

import Sidebar from './components/Layout/Sidebar.js';
import Footer from './components/Layout/Footer.js';
import GalleryUpdate from './components/Gallery/GalleryUpdate.js'
import DeliveryInfo from './components/GoodsShop/DeliveryInfo.js';

import PasswordChange from './components/Login/PasswordChange.js';
import NaverSignup from './components/Login/NaverSignup.js';
import KakaoRedirection from './components/Login/KakaoRedirection.js';
import UserDeliveryInfo from './components/MyPage/UserDeliveryInfo.js';

import MyPage from './components/MyPage/MyPage.js';
import PaymentDetails from './components/MyPage/PaymentDetails.js';
import StadiumReviewMain from './components/Review/StadiumReviewMain.js';
import StadiumReviewDetail from './components/Review/StadiumReviewDetail.js';
import StadiumReviewUpload from './components/Review/StadiumReviewUpload.js';

import MemberReviewMain from './components/Review/MemberReviewMain.js';
import MemberReviewDetail from './components/Review/MemberReviewDetail.js';
import MemberReviewUpload from './components/Review/MemberReviewUpload.js';
import StadiumList from './components/Stadium/StadiumList.js';

import { PaymentCheckoutPage } from './components/payment/PaymentCheckoutPage.js';
import { PaymentSuccessPage } from './components/payment/PaymentSuccessPage.js';
import { PaymentFailPage } from './components/payment/PaymentFailPage.js';

import BoardContent from './components/CustomerBoard/BoardContent.js';
import BoardUpdate from './components/CustomerBoard/BoardUpdate.js';
import ReservationStadium from './components/Stadium/ReservationStadium.js';
import BoardMain from './components/CustomerBoard/BoardMain.js';
import BoardPosting from './components/CustomerBoard/BoardPosting.js';
import StadiumListDetail from './components/Stadium/StadiumDetail.js';

import LiveStreamingPage from './components/Live/LiveStreamingPage.js';
import MainPage from './components/MainPage/MainPage.js';

import Signup from './components/Signup.js';
import KakaoMap from './components/Stadium/KakaoMap.js';

import SearchResultPage from './components/Layout/SearchResultPage.js';
import StadiumDetail from './components/Stadium/StadiumDetail.js';

import GoogleSignup from './components/Login/GoogleSignup.js';
import KakaoSignup from './components/Login/KakaoSignup.js';

import UsedItemBoard from './components/UsedItem/UsedItemBoard.js';
import UsedItemUpload from './components/UsedItem/UsedItemUpload.js';
import UsedItemDetail from './components/UsedItem/UsedItemDetail.js';
import UsedItemUpdate from './components/UsedItem/UsedItemUpdate.js';

function App() {

  const [loginMember, setLoginMember] = useState(null);
  const [basketList, setBasketList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    const savedMember = localStorage.getItem("loginMember");
    if(savedMember) {
      setLoginMember(JSON.parse(savedMember));
    }
  },[]);

  useEffect(() => {
    if (loginMember) {
      localStorage.setItem("loginMember", JSON.stringify(loginMember));
    }
  }, [loginMember]);
  
  return (
    <MyPageContext.Provider value={{loginMember, setLoginMember,basketList, setBasketList,reviewList, setReviewList}}> 
      <Router>
        <Header /> 
        <div className="main-container"> {/* 모든 컨텐츠를 감싸는 div */}
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/login' element={<Login />} />
            <Route path='/galleryBoard' element={<GalleryBoard />} />
            <Route path='/galleryBoard/:gbpostNo' element={<GalleryDetail />} />
            <Route path='/galleryUpload' element={<GalleryUpload />} />
            <Route path='/findId' element={<FindId />} />
            <Route path='/findPw' element={<FindPw />} />
            <Route path='/galleryUpdate/:gbpostNo' element={<GalleryUpdate />} />
            <Route path='/passwordChange' element={<PasswordChange />} />       
            <Route path='/signup/naver' element={<NaverSignup />} />
            <Route path="/goodsShop" element={<GoodsShop />} /> 
            <Route path="/goodsDetail/:goodsNo" element={<GoodsDetail  loginMember={loginMember}/>} />
            <Route path="/shoppingBasket/" element={<ShoppingBasket  loginMember={loginMember}/>} />
            <Route path="/DeliveryInfo/" element={<DeliveryInfo  loginMember={loginMember} /> } />
            <Route path="/mypage" element={<MyPage/>}/>
            <Route path="/stadiumInfo" element={<StadiumReviewMain/>}/>
            <Route path="/memberInfo" element={<MemberReviewMain/>}/>
            <Route path='/stadiumList' element={<StadiumList/>}/>
            <Route path="/stadiumReviewDetail/:stadiumNo" element={<StadiumReviewDetail />} />
            <Route path='/boardPosting' element={<BoardPosting/>}/>
            <Route path='/boardUpdate/:boardNo' element={<BoardUpdate/>}/>
            <Route path='/boardMain' element={<BoardMain/>}/>
            <Route path='/boardContent/:boardNo' element={<BoardContent/>}/>
            <Route path='/reservationStadium/:stadiumNo' element={<ReservationStadium/>}/>
            <Route path="/payment/checkout" element={<PaymentCheckoutPage />} />
            <Route path="/payment/success" element={<PaymentSuccessPage />} />
            <Route path="/payment/fail" element={<PaymentFailPage />} />
            <Route path="/stadiumdetail/:stadiumNo" element={<StadiumDetail/>}/>
            <Route path="/memberReviewDetail/:memberNo" element={<MemberReviewDetail/>}/>
            <Route path="/stadiumReviewUpload" element={<StadiumReviewUpload/>}/>
            <Route path="/memberReviewUpload" element={<MemberReviewUpload/>}/>
            <Route path="/paymentDetails/:memberNo" element={<PaymentDetails/>}/>
            <Route path="/userDeliveryInfo/:memberNo" element={<UserDeliveryInfo/>}/>
            <Route path='/stadiumListDetail/:stadiumNo' element={<StadiumListDetail/>}/>
            <Route path='/liveStreamingPage' element={<LiveStreamingPage/>}/>
            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/members/kakaoMap" element={<KakaoMap/>}/>
            <Route path="/search" element={<SearchResultPage />} />
            <Route path="/result" element={<GoogleSignup />} />
            <Route path="/signup/kakao" element={<KakaoSignup />} />
            <Route path='/usedItemBoard' element={<UsedItemBoard loginMember={loginMember} />} />
            <Route path='/usedItem/upload' element={<UsedItemUpload loginMember={loginMember} />} />
            <Route path='/usedItem/:usedItemNo' element={<UsedItemDetail loginMember={loginMember} />} />
            <Route path='/usedItem/edit/:usedItemNo' element={<UsedItemUpdate loginMember={loginMember} />} />
            <Route path="/oauth2/callback/kakao" element={<KakaoRedirection />} />
          </Routes>
        </div>
        <Sidebar/>
        <Footer />
      </Router>
    </MyPageContext.Provider>
  );
}

export default App;