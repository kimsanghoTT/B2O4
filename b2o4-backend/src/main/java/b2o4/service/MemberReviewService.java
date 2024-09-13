package b2o4.service;

import java.util.List;
import java.util.Map;

import b2o4.dto.MemberReview;

public interface MemberReviewService {
	// 참가자 리스트 보기
	List<MemberReview> memberGetList();

	// 참가자 평가 리스트 보기
	List<MemberReview> getMemberReviewList(int memberNo);

	// 참가자 평가 업로드
	Map<String, Object> memberReviewUpload(MemberReview memeberReview);

	// 좋아요 카운트
	boolean updateMemberLikeCount(MemberReview memeberReview);

	// 싫어요 카운트
	boolean updateMemberDislikeCount(MemberReview memeberReview);

	// 좋아요 합계
	int getMemberLikeCount(int memberNo);

	// 싫어요 합계
	int getMemberDislikeCount(int memberNo);

}
