package b2o4.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
// html 파일이 index.html 파일 하나이기 때문에 이 파일만 본다는 설정

@Controller
public class WebController {

    @GetMapping(value =  {"", "Login","/login","/galleryBoard", "/galleryBoard/**", "/galleryUpload", "/findId", "/findPw", "/galleryUpdate", "/passwordChange",
    		"/signup/naver", "/GoodsShop", "/goodsDetail/**", "/ShoppingBasket/", "/DeliveryInfo/", "/mypage", "/stadiumInfo", "/memberInfo", "/StadiumList", "/stadiumReviewDetail/**", "/boardPosting"
    		, "/boardUpdate/**", "/boardMain", "/boardContent/**", "/reservationStadium/**", "/payment/checkout", "/payment/success", "/payment/fail", "/stadiumDetail/**", "/memberReviewDetail/**", "/stadiumReviewUpload"
    		, "/memberReviewUpload", "/paymentDetails/**", "/userDeliveryInfo/**", "/stadiumListDetail/**", "/LiveStreamingPage", "/Signup", "/members/kakaoMap", "/search", "/result", "/signup/kakao"
    		, "/usedItemBoard", "/usedItem/upload", "/usedItem/**", "/usedItem/edit/**", "/oauth2/callback/kakao"})
    public String forward() {
        return "forward:/index.html";
    }
}