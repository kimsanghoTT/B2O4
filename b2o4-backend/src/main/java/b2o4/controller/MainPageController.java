package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.MainPage;
import b2o4.service.MainPageService;

@RestController
public class MainPageController {

	@Autowired
	private MainPageService service;
	
	@GetMapping("/main/stadium")
	public ResponseEntity<List<MainPage>> getStadiumList() {
		List<MainPage> stadiumList = service.getStadiumList();
		return ResponseEntity.ok(stadiumList);
	}
	
	@GetMapping("/main/gallery")
	public ResponseEntity<List<MainPage>> getGalleryList() {
		List<MainPage> galleryList = service.getGalleryList();
		return ResponseEntity.ok(galleryList);
	}
	
	@GetMapping("/main/goods")
	public ResponseEntity<List<MainPage>> getGoodsList() {
		List<MainPage> goodsList = service.getGoodsList();
		return ResponseEntity.ok(goodsList);
	}
	
}
