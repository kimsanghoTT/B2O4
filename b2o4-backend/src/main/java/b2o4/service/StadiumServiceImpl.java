package b2o4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.Stadium;
import b2o4.mapper.StadiumMapper;

@Service
public class StadiumServiceImpl implements StadiumService{
	@Autowired
	private StadiumMapper stadiumMapper;
	
	@Override
	public List<Stadium> stadiumMainList() {
		return stadiumMapper.stadiumMainList();
	}
	
	@Override
	public Stadium getStadiumById(int stadiumNo) {
		return stadiumMapper.getStadiumById(stadiumNo);
	}
	
	@Override
	public Stadium reservationStadiumByNo(int stadiumNo) {
		return stadiumMapper.getStadiumById(stadiumNo);
	}
}
