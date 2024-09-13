package b2o4.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.MemberReview;
import b2o4.service.MemberReviewService;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@Slf4j
public class MemberReviewController {
	@Autowired
	private MemberReviewService memberReviewService;

	// 참가자 리스트 보기
	@GetMapping("/memberReview")
	public List<MemberReview> memberGetList() {
		return memberReviewService.memberGetList();
	}
	
	// 참가자 평가 리스트 보기
	@GetMapping("/memberReview/{memberNo}")
	public List<MemberReview> getMemberReviewList(@PathVariable("memberNo") int memberNo) {
		return memberReviewService.getMemberReviewList(memberNo);
	}

	// 참가자 평가하기
	@PostMapping("/memberinputreview")
	public Map<String, Object> stadiumReviewUpload(@RequestBody MemberReview memberReview) {
		log.info("Received review request: " + memberReview.toString());
		Map<String, Object> response = memberReviewService.memberReviewUpload(memberReview);
		log.info("Response from service: " + response.toString());
		return response;
	}

	// 좋아요 카운트
	@PostMapping("/updateMemberLikeCount")
	public Map<String, Object> updateLikeCount(@RequestBody MemberReview memberReview) {
		boolean success = memberReviewService.updateMemberLikeCount(memberReview);
		Map<String, Object> result = new HashMap<>();
		result.put("success", success);
		return result;
	}

	// 싫어요 카운트
	@PostMapping("/updateMeberDislikeCount")
	public Map<String, Object> updateDislikeCount(@RequestBody MemberReview memberReview) {
		boolean success = memberReviewService.updateMemberDislikeCount(memberReview);
		Map<String, Object> result = new HashMap<>();
		result.put("success", success);
		return result;
	}
	
	// 좋아요 합계
	@GetMapping("/memberReview/{memberNo}/likeCount")
	public int getMemberLikeCount(@PathVariable("memberNo") int memberNo) {
		return memberReviewService.getMemberLikeCount(memberNo);
	}
	
	// 싫어요 합계
	@GetMapping("/memberReview/{memberNo}/dislikeCount")
	public int getMemberDislikeCount(@PathVariable("memberNo") int memberNo) {
		return memberReviewService.getMemberDislikeCount(memberNo);
	}
}
