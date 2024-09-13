package b2o4.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.Member;
import b2o4.mapper.LoginMapper;

@Service
public class LoginServiceImpl implements LoginService{
	@Autowired
	private LoginMapper loginMapper;
	
	
	// 로그인하기
	@Override
	public Map<String, Object> login(Member member) {
		Member loginMember = loginMapper.login(member);
		
		Map<String, Object> map = new HashMap<>();
		map.put("loginMember", loginMember);
		
		return map;
	}
	
	// 아이디 찾기
	@Override
	public Member findId(Member member) {
		return loginMapper.findId(member);
	}
	
	// 비밀번호 찾기
	@Override
	public Member findPw(Member member) {
		return loginMapper.findPw(member);
	}
	
	// 비밀번호 변경
	@Override
	public void updatePassword(Member member) {
		loginMapper.updatePassword(member);
	}
	
	// 네이버로 로그인하기
	@Override
	public void NaverRegister(Member member) {
		loginMapper.NaverRegister(member);
	}
	
	// 이메일 중복 체크
	@Override
	public int emailCheck(String memberEmail) {
		return loginMapper.emailCheck(memberEmail);
	}
}
