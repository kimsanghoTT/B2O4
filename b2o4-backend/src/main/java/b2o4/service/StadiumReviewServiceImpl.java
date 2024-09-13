package b2o4.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.StadiumReview;
import b2o4.mapper.StadiumReviewMapper;

@Service
public class StadiumReviewServiceImpl implements StadiumReviewService {
	@Autowired
	private StadiumReviewMapper stadiumReviewMapper;

	// 구장 리스트 보기
	@Override
	public List<StadiumReview> stadiumGetList() {
		return stadiumReviewMapper.stadiumGetList();
	}

	// 구장 평가 리스트 보기
	@Override
	public List<StadiumReview> getStadiumReviewList(int stadiumNo) {
		return stadiumReviewMapper.getStadiumReviewList(stadiumNo);
	}

	// 구장 평가 업로드
	@Override
	public Map<String, Object> stadiumReviewUpload(StadiumReview stadiumReview) {
		Map<String, Object> result = new HashMap<>();
		try {
			stadiumReviewMapper.stadiumReviewUpload(stadiumReview);
			result.put("success", true);
			result.put("stadiumReviewNo", stadiumReview.getStadiumReviewNo());
		} catch (Exception e) {
			result.put("success", false);
			result.put("message", "Review upload failed");
			e.printStackTrace();
		}
		return result;
	}

	// 좋아요 누르기 기능
	@Override
	public boolean updateLikeCount(StadiumReview stadiumReview) {

		return stadiumReviewMapper.updateLikeCount(stadiumReview) > 0;
	}
	
	// 싫어요 누르기 기능
	@Override
	public boolean updateDislikeCount(StadiumReview stadiumReview) {
		return stadiumReviewMapper.updateDislikeCount(stadiumReview) > 0;
	}

	// 좋아요 카운트 합계 보기
	@Override
	public int getlikeCount(int stadiumNo) {
		return stadiumReviewMapper.getlikeCount(stadiumNo);
	}

	// 싫어요 카운트 합계 보기
	@Override
	public int getdislikeCount(int stadiumNo) {
		return stadiumReviewMapper.getdislikeCount(stadiumNo);
	}
}
