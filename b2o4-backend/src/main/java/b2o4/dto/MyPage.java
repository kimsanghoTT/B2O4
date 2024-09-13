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
public class MyPage {

	// 마이페이지 회원 정보
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
	
	
}
