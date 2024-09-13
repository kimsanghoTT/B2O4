package b2o4.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.StadiumReview;
import b2o4.service.StadiumReviewService;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@Slf4j
public class StadiumReviewController {
	@Autowired
	private StadiumReviewService stadiumReviewService;

	// 풋살장 리스트 보기
	@GetMapping("/stadiumReview")
	public List<StadiumReview> stadiumGetList() {
		return stadiumReviewService.stadiumGetList();
	}

	// 풋살장 평가 보기 리스트
	@GetMapping("/stadiumReview/{stadiumNo}")
	public List<StadiumReview> getStadiumReviewList(@PathVariable("stadiumNo") int stadiumNo) {
		return stadiumReviewService.getStadiumReviewList(stadiumNo);
	}

	// 풋살장 평가하기
	@PostMapping("/stadiuminputreview")
	public Map<String, Object> stadiumReviewUpload(@RequestBody StadiumReview stadiumReview) {
		log.info("Received review request: " + stadiumReview.toString());
		Map<String, Object> response = stadiumReviewService.stadiumReviewUpload(stadiumReview);
		log.info("Response from service: " + response.toString());
		return response;
	}

	@PostMapping("/updateLikeCount")
	public Map<String, Object> updateLikeCount(@RequestBody StadiumReview stadiumReview) {
		boolean success = stadiumReviewService.updateLikeCount(stadiumReview);
		Map<String, Object> result = new HashMap<>();
		result.put("success", success);
		return result;
	}

	@PostMapping("/updateDislikeCount")
	public Map<String, Object> updateDislikeCount(@RequestBody StadiumReview stadiumReview) {
		boolean success = stadiumReviewService.updateDislikeCount(stadiumReview);
		Map<String, Object> result = new HashMap<>();
		result.put("success", success);
		return result;
	}
	
	// 좋아요 카운트 합계 보기
	@GetMapping("/stadiumReview/{stadiumNo}/likeCount")
	public int getlikeCount(@PathVariable("stadiumNo") int stadiumNo) {
		return stadiumReviewService.getlikeCount(stadiumNo);
	}
	

	// 싫어요 카운트 합계 보기
	@GetMapping("/stadiumReview/{stadiumNo}/dislikeCount")
	public int getdislikeCount(@PathVariable("stadiumNo") int stadiumNo) {
		return stadiumReviewService.getdislikeCount(stadiumNo);
	}
}
