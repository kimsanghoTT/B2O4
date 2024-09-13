package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.MainPage;

@Mapper
public interface MainPageMapper {

	List<MainPage> getStadiumList();
	List<MainPage> getGalleryList();
	List<MainPage> getGoodsList();
}
