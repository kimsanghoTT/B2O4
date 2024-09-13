package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import b2o4.dto.GalleryBoard;
import b2o4.dto.Member;

@Mapper
public interface LoginMapper {
	
	// 로그인하기
	Member login(Member member);
	
	// 아이디 찾기
	Member findId(Member member);

	// 비밀번호 찾기
	Member findPw(Member member);
	
	// 비밀번호 변경
	void updatePassword(Member member);
	
	// 네이버 로그인 회원가입
	void NaverRegister(Member member);
	
	// 이메일 중복 체크
	int emailCheck(String memberEmail);
}
