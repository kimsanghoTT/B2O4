package b2o4.service;

import java.util.Map;

import b2o4.dto.Member;

public interface LoginService {
	// 로그인하기
	Map<String, Object> login(Member member);
	
	// 아이디 찾기
	Member findId(Member member);
	
	// 비밀번호 찾기
	Member findPw(Member member);
	
	// 비밀번호 변경
	void updatePassword(Member member);
	
	// 네이버 SNS 연동해서 회원가입하는 insert
	public void NaverRegister(Member member);
	
	// 이메일 중복 체크
	int emailCheck(String memberEmail);
}
