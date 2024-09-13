package b2o4.service;

import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.MyPage;

public interface MyPageService {

	// 회원 정보보기
	MyPage getMemberInfo(String memberId);
	
	// 회원 탈퇴
	void deleteMember(int memberNo);

	// 회원 정보 수정
	void updateMemberInfo(MyPage myPage, MultipartFile memberProfile) throws Exception;
	
	// 비밀번호 모달 확인
	boolean checkPassword(String memberId, String memberPw);
	
}
