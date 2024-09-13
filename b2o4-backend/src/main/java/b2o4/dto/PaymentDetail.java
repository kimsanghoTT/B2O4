package b2o4.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDetail {

	// 예약 정보 확인 dto
	private int reservationNo;
	private int memberNo;
	private int stadiumNo;
	private int reservationTotal;
	private String reservationDate;
	private String matchDate;
	private String matchTime;
	private int reserveCount;
	
	// 스타디움 정보
    private String stadiumName;
    private String stadiumLocation;
    private String stadiumAddress;
    private int stadiumCapacity;
    private int stadiumPrice;
    private String stadiumImage;
    
    // 상품 결재 정보 확인
    private int deliveryNo;
    private int basketNo;
    private String deliveryAddress;
    private String recipientName;
    private String recipientPhone;
    private String deliveryRequest;
    private String createdDate;
    
    // 장바구니 정보
    private int goodsNo;
    private int goodsQuantity;
    private int basketTotal;
    private String goodsSize;
    
    // 상품 이미지
    private String goodsImage;
}
