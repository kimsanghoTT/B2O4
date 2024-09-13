package b2o4.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.UsedItem;

public interface UsedItemService {
    
	//전체목록보기
	List<UsedItem> AllUsedItem();
	
	//상세보기
	UsedItem usedItem(int usedItemNo);
	
	//추가하기
	void UsedItemUpload(UsedItem usedItem);
	void uploadImages(MultipartFile[] files, String title, String content, int MemberNo, String memberName, String memberPhone);
	
	//수정하기
	void UpdateUsedItem(UsedItem usedItem);
	void updateImages(int usedItemNo, MultipartFile[] files, String title, String content, int MemberNo, String memberName, String memberPhone);
	
	//삭제하기
	int DeleteUsedItem(int usedItemNo);
}
