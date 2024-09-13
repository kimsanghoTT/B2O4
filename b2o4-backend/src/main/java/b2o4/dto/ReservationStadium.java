package b2o4.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReservationStadium {
	private int reservationNo;
	private int memberNo;
	private int stadiumNo;
	private int reservationTotal;
	private String reservationDate;
	private String matchDate;
	private String matchTime;
	private int reserveCount;
}
