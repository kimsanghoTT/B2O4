package b2o4.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class StadiumReview {
	// 구장 리스트 보기 dto
	private int stadiumNo;
	private String stadiumName;
	private String stadiumLocation;
	private String stadiumAddress;
	private int stadiumCapacity;
	private char stadiumParking;
	private char stadiumInOutdoor;
	private char shoesRent;
	private int stadiumPrice;
	private String stadiumImage;
	
	
	// 구장 평가 리스트 dto
	private int stadiumReviewNo;
	private int likeCount;
	private int dislikeCount;
	private String stadiumComment;
	private String stadiumCommentDate;
	private int memberNo;
	
}
