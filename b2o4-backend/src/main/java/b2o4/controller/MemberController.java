package b2o4.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import b2o4.dto.Member;
import b2o4.service.MemberService;

@RestController
@RequestMapping("/api")
public class MemberController {
    @Autowired
    private MemberService memberService;

    @GetMapping
    public List<Member> findAllMember() {
        return memberService.findAllMember();
    }

    @PostMapping("/members")
    public void insertMember(@ModelAttribute Member member,
                             @RequestParam(value = "profileImage", required = false) MultipartFile memberProfile) {
        
        System.out.println("member: " + member);
        System.out.println("memberProfile: " + memberProfile);

        // 프로필 이미지 파일이 없을 경우 처리 로직 추가
        if (memberProfile == null || memberProfile.isEmpty()) {
            System.out.println("프로필 이미지가 없습니다.");
            memberProfile = null;  // 이미지가 없을 경우 null로 설정
        }

        // 프로필 이미지 파일 및 기타 처리 로직
        memberService.insertMember(member, memberProfile);
    }

    @GetMapping("/idCheck")
    public Map<String, Boolean> idCheck(@RequestParam("id") String id) {
        boolean isAvailable = memberService.idCheck(id) == 0;
        Map<String, Boolean> response = new HashMap<>();
        response.put("isAvailable", isAvailable);
        return response;
    }
}