package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import b2o4.dto.GoodsShop;
import b2o4.dto.ShoppingBasket;

@Mapper
public interface ShoppingBasketMapper {
	
	//List<ShoppingBasket> findBasketByMemberNo();
	List<ShoppingBasket> findBasketByMemberNo(int memberNo);
	  
	void insertBasket(ShoppingBasket shoppingBasket);
	
	void deleteBasketItem(int basketNo);
	
	void updateBasketQuantity(ShoppingBasket shoppingBasket);
}
