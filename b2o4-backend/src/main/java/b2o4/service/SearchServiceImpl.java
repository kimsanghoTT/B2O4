package b2o4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.Search;
import b2o4.mapper.SearchMapper;

@Service
public class SearchServiceImpl implements SearchService {

	@Autowired
	private SearchMapper searchMapper;
	
	@Override
    public List<Search> searchStadiums(String keyword) {
        return searchMapper.searchStadiums(keyword);
    }
	
	@Override
    public List<Search> searchGoods(String keyword) {
        return searchMapper.searchGoods(keyword);
    }
	
	@Override
    public List<Search> searchPosts(String keyword) {
        return searchMapper.searchPosts(keyword);
    }
	
	
}