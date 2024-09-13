package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.Search;

@Mapper
public interface SearchMapper {

	// 구장 검색
	List<Search> searchStadiums(String keyword);

	// 상품 검색
	List<Search> searchGoods(String keyword);

	// 갤러리 게시판 검색
	List<Search> searchPosts(String keyword);
}