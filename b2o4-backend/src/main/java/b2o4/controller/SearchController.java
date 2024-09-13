package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.Search;
import b2o4.service.SearchService;

@RestController
@RequestMapping("/api")
public class SearchController {

	@Autowired
	private SearchService searchService;

	@GetMapping("/search/stadiums")
	public List<Search> searchStadiums(@RequestParam("keyword") String keyword) {
		return searchService.searchStadiums(keyword);
	}
	
	@GetMapping("/search/goodsshops")
    public List<Search> searchGoods(@RequestParam("keyword") String keyword) {
        return searchService.searchGoods(keyword);
    }

    @GetMapping("/search/galleryboards")
    public List<Search> searchPosts(@RequestParam("keyword") String keyword) {
        return searchService.searchPosts(keyword);
    }
}