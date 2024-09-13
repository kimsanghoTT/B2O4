package b2o4.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.Member;
import b2o4.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    MemberMapper memberMapper;

    
	@Value("${file.upload-dir}") 
	private String uploadDir; 
	
    @Override
    public List<Member> findAllMember() {
        return memberMapper.findAllMember();
    }
/*
    @Override
    public void insertMember(Member member, MultipartFile memberProfile) {
        memberMapper.insertMember(member);
    }

*/
    
    @Override
    public void insertMember(Member member, MultipartFile memberProfile) {
    	System.out.println("member: " + member);
        // 1. 업로드 폴더가 존재하는지 확인하고 없으면 폴더 생성
        File uploadDirFile = new File(uploadDir);
        if (!uploadDirFile.exists()) {
            System.out.println("폴더가 존재하지 않아 폴더를 생성합니다.");
            if (!uploadDirFile.mkdirs()) {
                throw new RuntimeException("폴더 생성 실패하였습니다.");
            }
        }

        // UUID로 중복되지 않는 파일 이름 생성
        String fileName = null;

        if (memberProfile != null && !memberProfile.isEmpty()) {
            try {
                // UUID를 이용하여 파일 이름 생성
                String uuid = UUID.randomUUID().toString();
                String originalFileName = memberProfile.getOriginalFilename();
                fileName = uuid + "_" + originalFileName;

                // 파일을 지정된 폴더에 저장
                File destinationFile = new File(uploadDir + File.separator + fileName);
                memberProfile.transferTo(destinationFile);

                // 저장된 파일 경로를 member 객체에 설정 (예: DB에 저장할 수 있도록)
                member.setMemberProfile(fileName);

            } catch (IOException e) {
                throw new RuntimeException("파일 업로드 실패", e);
            }
        }

        // 회원 정보를 DB에 삽입
        memberMapper.insertMember(member);
    }

    @Override
    public int idCheck(String memberId) {
        return memberMapper.idCheck(memberId);
    }

    @Override
    public int signup(Member member) {
        return memberMapper.signup(member);
    }
}
