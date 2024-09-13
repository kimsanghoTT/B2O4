package b2o4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.MainPage;
import b2o4.mapper.MainPageMapper;

@Service
public class MainPageServiceImpl implements MainPageService{

	@Autowired
	private MainPageMapper mapper;
	
	@Override
	public List<MainPage> getStadiumList() {
		return mapper.getStadiumList();
	}
	
	@Override
	public List<MainPage> getGalleryList() {
		return mapper.getGalleryList();
	}
	
	@Override
	public List<MainPage> getGoodsList() {
		return mapper.getGoodsList();
	}
}
