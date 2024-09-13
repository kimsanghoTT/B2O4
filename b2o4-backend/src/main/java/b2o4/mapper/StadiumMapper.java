package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.Stadium;

@Mapper
public interface StadiumMapper {
	List<Stadium> stadiumMainList();
	
	Stadium getStadiumById(int stadiumNo);
	
	Stadium reservationStadiumByNo(int stadiumNo);
}
