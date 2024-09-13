package b2o4.service;

import java.util.List;

import b2o4.dto.MainPage;

public interface MainPageService {

	List<MainPage> getStadiumList();
	List<MainPage> getGalleryList();
	List<MainPage> getGoodsList();
}
