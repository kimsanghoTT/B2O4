package b2o4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.PaymentDetail;
import b2o4.mapper.PaymentMapper;

@Service
public class PaymentDetailServiceImpl implements PaymentDetailService {

	@Autowired
	private PaymentMapper paymentMapper;

	// 예약 정보 보기
	@Override
	public List<PaymentDetail> findPaymentDetailsByMemberNo(int memberNo) {
		return paymentMapper.findPaymentDetailsByMemberNo(memberNo);
	}

	// 상품 결재 정보 보기
	@Override
	public List<PaymentDetail> getDeliveryInfoByMemberNo(int memberNo) {
		return paymentMapper.getDeliveryInfoByMemberNo(memberNo);
	}
}
