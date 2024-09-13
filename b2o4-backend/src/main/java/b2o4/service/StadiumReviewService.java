package b2o4.service;

import java.util.List;
import java.util.Map;

import b2o4.dto.StadiumReview;

public interface StadiumReviewService {

	// 구장 리스트 보기
	List<StadiumReview> stadiumGetList();

	// 구장 평가 리스트 보기
	List<StadiumReview> getStadiumReviewList(int stadiumNo);

	// 구장 평가 업로드
	Map<String, Object> stadiumReviewUpload(StadiumReview stadiumReview);

	boolean updateLikeCount(StadiumReview stadiumReview);

	boolean updateDislikeCount(StadiumReview stadiumReview);

	// 좋아요 합계 보기
	int getlikeCount(int stadiumNo);

	// 싫어요 합계 보기
	int getdislikeCount(int stadiumNo);

}
