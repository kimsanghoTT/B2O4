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
public class GoodsShop {
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
