package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.MemberReview;


@Mapper
public interface MemberReviewMapper {
	// 참가자 리스트 보기
	List<MemberReview> memberGetList();
	
	// 참가자 평가 리스트 보기
	List<MemberReview> getMemberReviewList(int stadiumNo);

	// 참가자 평가 업로드
	int memberReviewUpload(MemberReview memeberReview);

	// 좋아요 카운트
	int updateMemeberLikeCount(MemberReview memeberReview);

	// 싫어요 카운트
	int updateMemberDislikeCount(MemberReview memeberReview);
	
	// 좋아요 합계
	int getMemberLikeCount(int memberNo);
	
	// 싫어요 합계
	int getMemberDislikeCount(int memberNo);
}
