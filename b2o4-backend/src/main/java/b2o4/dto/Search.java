package b2o4.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Search {
	// 구장 정보
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
    
    // 상품 정보
    private int goodsNo;
    private String goodsName;
    private int goodsPrice;
    private String goodsKind;
    private String goodsDescription;
    private String goodsImage;
    private String goodsComment;
    private String goodsSize;
    private int goodsSellNow;
    private String goodsDetail;
    private String goodsImage2;
    
    // 게시글 검색
    private int gbPostNo;
	private String gbPostTitle;
	private String gbPostContent;
	private String gbImages;
	private String gbPostCreateDate;
	private int memberNo;
	private String memberName;
}