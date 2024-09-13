package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.GoodsShop;

@Mapper
public interface GoodsShopMapper {
	
	List<GoodsShop> GoodsFindAll();
	
	int goodsNo(int goodsNo);
	String goodsName(GoodsShop goodsName);
	
}
