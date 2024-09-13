package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.GoodsShop;
import b2o4.service.GoodsShopService;

@RestController
public class GoodsShopController {
	
	@Autowired
	private GoodsShopService goodsShopService;
	
	@GetMapping("/goods/all")
	public List<GoodsShop> GoodsFindAll() {
		return goodsShopService.GoodsFindAll();
	
	}
}
