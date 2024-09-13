package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.PaymentDetail;

@Mapper
public interface PaymentMapper {

	// 예약 정보 조회
	List<PaymentDetail> findPaymentDetailsByMemberNo(int memberNo);
	
	// 상품 결재 정보 보기
	List<PaymentDetail> getDeliveryInfoByMemberNo(int memberNo);
}
