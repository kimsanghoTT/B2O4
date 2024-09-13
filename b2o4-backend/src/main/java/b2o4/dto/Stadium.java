package b2o4.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Stadium {
	private int stadiumNo;
	private String stadiumName;
	private String stadiumLocation;
	private String stadiumAddress;
	private int stadiumCapacity;
	private char stadiumParking;
	private char stadiumInOutdoor;
	private char shoesRent;
	private int stadiumPrice;
	private String stadiumImage;
}
