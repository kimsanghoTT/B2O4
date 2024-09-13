package b2o4.mapper;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.ReservationStadium;

@Mapper
public interface ReservationStadiumMapper {

	void reservationStadiumDetail(ReservationStadium reservationStadium);
}
