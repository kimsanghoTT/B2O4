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
public class ShoppingBasket {
	
	private int basketNo;
	private int memberNo;
	private int goodsNo;
	private String goodsName;
	private int goodsQuantity;
	private int goodsPrice;
	private String goodsImage;
	private int basketTotal;
	private String goodsSize;
}
