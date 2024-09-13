package b2o4.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import b2o4.dto.MyPage;

@Mapper
public interface MyPageMapper {

	// 로그인한 member 정보 보여주기
	MyPage getMemberInfo(String memberId);
	
	// 회원 정보 업데이트
	void updateMemberInfo(MyPage myPage);
	
	// 회원 탈퇴
	void deleteMember(int memberNo);
	
	MyPage getPasswordMemberId(Map<String, Object> params);
	
}
