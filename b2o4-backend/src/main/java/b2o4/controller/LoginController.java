package b2o4.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.Member;
import b2o4.service.LoginService;

@RestController
public class LoginController {
	@Autowired
	private LoginService loginService;
	
	// 로그인하기
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody Member member) {
		return loginService.login(member);
	}
	
	// 아이디 찾기
	@PostMapping("/findId")
	public ResponseEntity<Member> findId(@RequestBody Member member) {
		return ResponseEntity.ok(loginService.findId(member));
	}
	
	// 비밀번호 찾기
	@PostMapping("/findPw")
	public ResponseEntity<Member> findPw(@RequestBody Member member) {
		return ResponseEntity.ok(loginService.findPw(member));
	}
	
	// 비밀번호 변경
	@PutMapping("/passwordChange")
	public ResponseEntity<String> updatePassword(@RequestBody Member member) {
        try {
        	loginService.updatePassword(member);
            return ResponseEntity.ok("비밀번호 수정 성공");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
	}
	
	// 네이버로 로그인하기
	@PostMapping("/naverAPI/register")
    public String NaverRegister(@RequestBody Member member) {
		loginService.NaverRegister(member);

        return "회원가입 성공!!!!";
    }
	
	// 이메일 중복체크
	@PostMapping("/emailCheck")
	public int  emailCheck(@RequestParam("email") String memberEmail) {
        return loginService.emailCheck(memberEmail);
    }	
	
}
