package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.StadiumReview;

@Mapper
public interface StadiumReviewMapper {

	// 구장 리스트 보기
	List<StadiumReview> stadiumGetList();

	// 구장 평가 리스트 보기
	List<StadiumReview> getStadiumReviewList(int stadiumNo);
	
	// 좋아요 합계 보기
	int getlikeCount(int stadiumNo);
	
	// 싫어요 합계 보기
	int getdislikeCount(int stadiumNo);

	// 구장 평가 업로드
	int stadiumReviewUpload(StadiumReview stadiumReview);

	// 좋아요 카운트
	int updateLikeCount(StadiumReview stadiumReview);

	// 싫어요 카운트
	int updateDislikeCount(StadiumReview stadiumReview);

	// 구장 평가 삭제
	int deleteStadiumReview(int stadiumReviewNo, int memberNo);
	

}
