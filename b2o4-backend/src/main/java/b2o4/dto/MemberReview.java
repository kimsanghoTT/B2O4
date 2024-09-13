package b2o4.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MemberReview {
	// 참가자 리스트 보기 dto
	private int memberNo;
	private String memberId;
	private String memberPw;
	private String memberEmail;
	private String memberName;
	private String memberBirth;
	private String memberPhone;
	private String memberAddress;
	private String signUpDate;
	private String memberRank;
	private String matchCount;
	private char memberType;
	private String memberPay;
	private String memberProfile;
	
	// 참가자 평가 리스트 dto
	private int memberReviewNo;
	private int likeCount;
	private int dislikeCount;
	private String memberComment;
	private String memberCommentDate;
	private int userNo;
	

}
