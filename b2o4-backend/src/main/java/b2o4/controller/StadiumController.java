package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.Stadium;
import b2o4.service.StadiumService;

@RestController
@RequestMapping("/stadiums")
public class StadiumController {
	@Autowired
	private StadiumService stadiumService;
	
	@GetMapping
	public List<Stadium> stadiumMainList() {
		return stadiumService.stadiumMainList();
	}
	
	@GetMapping("/stadiumDetail/{stadiumNo}")
	public Stadium getStadiumById(@PathVariable("stadiumNo") int stadiumNo) {
		return stadiumService.getStadiumById(stadiumNo);
	}
	
	@GetMapping("/reservationStadium/{stadiumNo}")
	public Stadium reservationStadiumByNo(@PathVariable("stadiumNo") int stadiumNo) {
		return stadiumService.getStadiumById(stadiumNo);
	}
	
	
	
}
