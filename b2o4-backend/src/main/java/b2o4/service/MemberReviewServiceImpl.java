package b2o4.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.MemberReview;
import b2o4.mapper.MemberReviewMapper;

@Service
public class MemberReviewServiceImpl implements MemberReviewService {
	@Autowired
	private MemberReviewMapper memberReviewMapper;

	// 참가자 리스트 보기
	@Override
	public List<MemberReview> memberGetList() {
		return memberReviewMapper.memberGetList();
	}

	// 참가자 평가 리스트 보기
	public List<MemberReview> getMemberReviewList(int memberNo) {
		return memberReviewMapper.getMemberReviewList(memberNo);
	}

	// 참가자 평가 업로드
	@Override
	public Map<String, Object> memberReviewUpload(MemberReview memberReview) {
		Map<String, Object> result = new HashMap<>();
		try {
			memberReviewMapper.memberReviewUpload(memberReview);
			result.put("success", true);
			result.put("memberReviewNo", memberReview.getMemberReviewNo());
		} catch (Exception e) {
			result.put("success", false);
			result.put("message", "Review upload failed");
			e.printStackTrace();
		}
		return result;
	}
	
	// 좋아요 카운트
	@Override
	public boolean updateMemberLikeCount(MemberReview memberReview) {

		return memberReviewMapper.updateMemeberLikeCount(memberReview) > 0;
	}
	
	// 싫어요 카운트
	@Override
	public boolean updateMemberDislikeCount(MemberReview memberReview) {
		return memberReviewMapper.updateMemberDislikeCount(memberReview) > 0;
	}

	// 좋아요 합계
	@Override
	public int getMemberLikeCount(int memberNo) {
		return memberReviewMapper.getMemberLikeCount(memberNo);
	}

	// 싫어요 합계
	@Override
	public int getMemberDislikeCount(int memberNo) {
		return memberReviewMapper.getMemberDislikeCount(memberNo);
	}
}
