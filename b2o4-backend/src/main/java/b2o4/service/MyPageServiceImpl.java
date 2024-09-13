package b2o4.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.MyPage;
import b2o4.mapper.MyPageMapper;

@Service
public class MyPageServiceImpl implements MyPageService {

	@Autowired
	private MyPageMapper myPageMapper;
	
	@Value("${file.upload-dir}")
	private String uploadDir;

	// 회원 정보 보기
	@Override
	public MyPage getMemberInfo(String memberId) {
		return myPageMapper.getMemberInfo(memberId);
	}

	// 회원 탈퇴
	@Override
	public void deleteMember(int memberNo) {
		myPageMapper.deleteMember(memberNo);
	}

	// 회원 정보 수정
	@Override
    public void updateMemberInfo(MyPage myPage, MultipartFile memberProfile) throws Exception {
        if (memberProfile != null && !memberProfile.isEmpty()) {
            String originalFilename = memberProfile.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String savedFilename = UUID.randomUUID().toString() + fileExtension;

            Path uploadPath = Paths.get(uploadDir, savedFilename);

            Files.createDirectories(uploadPath.getParent());  // 디렉토리 생성
            memberProfile.transferTo(uploadPath.toFile());  // 파일 저장

            myPage.setMemberProfile(savedFilename);
        }

        myPageMapper.updateMemberInfo(myPage);
    }

	// 비밀번호 모달 확인
	@Override
	public boolean checkPassword(String memberId, String memberPw) {
	    Map<String, Object> params = new HashMap();
	    params.put("memberId", memberId);
	    params.put("memberPw", memberPw);

	    MyPage myPage = myPageMapper.getPasswordMemberId(params);
	    return myPage != null;
	}
}
