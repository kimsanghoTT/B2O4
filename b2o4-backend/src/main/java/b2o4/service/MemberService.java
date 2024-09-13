
package b2o4.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.Member;



public interface MemberService {
	List<Member> findAllMember();
	
	void insertMember(Member member, MultipartFile memberProfile);
	
	int idCheck(String memberId);
	
	int signup(Member member);
	
	
}
