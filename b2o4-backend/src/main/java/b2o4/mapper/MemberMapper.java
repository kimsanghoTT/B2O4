package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.Member;

@Mapper
public interface MemberMapper {
	List<Member> findAllMember();
	
	void insertMember(Member member);
	
	int idCheck(String memberId);
	
	int signup(Member member);
	
}