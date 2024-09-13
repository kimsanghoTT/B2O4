package b2o4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.GoodsShop;
import b2o4.mapper.GoodsShopMapper;

@Service
public class GoodsShopServiceImpl implements GoodsShopService{
	
	@Autowired
	GoodsShopMapper goodsShopMapper;
	
	@Override
	public List<GoodsShop> GoodsFindAll() {
		return goodsShopMapper.GoodsFindAll();
		
	
		
	
	
	}
}
