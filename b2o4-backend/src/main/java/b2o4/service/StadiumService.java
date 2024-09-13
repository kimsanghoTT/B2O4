package b2o4.service;

import java.util.List;

import b2o4.dto.Stadium;

public interface StadiumService {
	List<Stadium> stadiumMainList();
	
	Stadium getStadiumById(int stadiumNo);
	
	Stadium reservationStadiumByNo(int stadiumNo);
}
