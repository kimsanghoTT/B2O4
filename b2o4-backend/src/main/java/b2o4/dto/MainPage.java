package b2o4.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MainPage {

	//스타디움
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
	private int totalLike;
	
	//갤러리 
	private int gbPostNo;
	private String gbPostTitle;
	private String gbPostContent;
	private String gbImages;
	private String gbPostCreateDate;
	private int memberNo;
	private String memberName;
	
	//굿즈샵
	private int goodsNo;
	private String goodsName;
	private String goodsKind;
	private int goodsPrice;
	private String goodsImage;
	private String goodsComment;
	private String goodsSize;
	private int goodsSellNow;
	private String goodsDetail;
	private String goodsImage2;	//상세페이지가면 사진 하나 더 출력
}