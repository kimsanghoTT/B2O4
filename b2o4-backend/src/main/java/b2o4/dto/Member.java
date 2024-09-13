package b2o4.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Member {
	private int memberNo;
	private String memberId;
	private String memberPw;
	private String memberEmail;
	private String memberName;
	private String membereBirth;
	private String memberPhone;
	private String memberAddress;
	private String memberBirth;
	private String memberProfile;
	private char memberType;
	private String memberDetailAddress;
	private char chatable;
}