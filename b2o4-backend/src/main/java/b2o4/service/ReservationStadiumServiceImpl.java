package b2o4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.ReservationStadium;
import b2o4.mapper.ReservationStadiumMapper;

@Service
public class ReservationStadiumServiceImpl implements ReservationStadiumService {
	
	@Autowired
	private ReservationStadiumMapper reservationStadiumMapper;
	
	public void reservationStadiumDetail(ReservationStadium reservationStadium) {
		reservationStadiumMapper.reservationStadiumDetail(reservationStadium);
	};
}
