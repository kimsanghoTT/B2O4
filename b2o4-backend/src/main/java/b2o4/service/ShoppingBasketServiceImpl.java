package b2o4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import b2o4.dto.ShoppingBasket;
import b2o4.mapper.ShoppingBasketMapper;

@Service
public class ShoppingBasketServiceImpl implements ShoppingBasketService {
	
	//@Value("${}")
	
	@Autowired
	private ShoppingBasketMapper shoppingBasketMapper;
	
	//get
	@Override
	public List<ShoppingBasket> findBasketByMemberNo(int memberNo) {
		return shoppingBasketMapper.findBasketByMemberNo(memberNo);
	}
	
	/*
	 	@Override
	public List<ShoppingBasket> findBasketByMemberNo() {
	    // 리스트를 반환하기 전에 요소들을 출력
	    List<ShoppingBasket> baskets = shoppingBasketMapper.findBasketByMemberNo();
	    
	    // 리스트 전체를 한 번에 출력 (toString 메서드가 잘 구현되어 있어야 함)
	    System.out.println("Shopping Baskets: " + baskets);

	    // 리스트의 각 요소를 개별적으로 출력
	    for (ShoppingBasket basket : baskets) {
	        System.out.println("Basket Item: " + basket);
	    }

	    return baskets;
	} 
	 */
	
	
	
	
	
	
	@Override
	public void insertBasket(ShoppingBasket shoppingBasket) {
		shoppingBasketMapper.insertBasket(shoppingBasket);
		
	}

	
	
	@Override
	public void updateBasketQuantity(ShoppingBasket basket) {
		shoppingBasketMapper.updateBasketQuantity(basket);
	}

	
	
	@Override
	public void deleteBasketItem(int basketNo) {
		shoppingBasketMapper.deleteBasketItem(basketNo);
	}

	
	
}
