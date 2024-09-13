package b2o4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.ReservationStadium;
import b2o4.service.ReservationStadiumService;

@RestController
@RequestMapping("/reservationStadium")
public class ReservationStadiumController {

	@Autowired
	private ReservationStadiumService RSService; 
	
	@PostMapping
	public void reservationStadiumDetail(@RequestBody ReservationStadium rStadium) {
		RSService.reservationStadiumDetail(rStadium);
	}
	
}
