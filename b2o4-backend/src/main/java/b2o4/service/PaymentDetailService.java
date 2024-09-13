package b2o4.service;

import java.util.List;

import b2o4.dto.PaymentDetail;

public interface PaymentDetailService {

	// 예약 정보 보기
	List<PaymentDetail> findPaymentDetailsByMemberNo(int memberNo);
	
	// 상품 결재 정보 보기
	List<PaymentDetail> getDeliveryInfoByMemberNo(int memberNo);
}
