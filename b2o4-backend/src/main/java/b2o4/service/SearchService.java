package b2o4.service;

import java.util.List;

import b2o4.dto.Search;

public interface SearchService {
	
	// 구장 검색
	List<Search> searchStadiums(String keyword);

	// 상품 검색
	List<Search> searchGoods(String keyword);

	// 갤러리 게시판 검색
	List<Search> searchPosts(String keyword);
}