package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.UsedItem;

@Mapper
public interface UsedItemMapper {

    
    // 중고 상품 게시판 목록
    List<UsedItem> AllUsedItem();
    
    // 중고 상품 상세보기
    UsedItem UsedItemDetail(int usedItemNo);
    
    // 중고 상품 게시판 업로드
    void UsedItemUpload(UsedItem usedItem);
    
    // 수정하기
    void UpdateUsedItem(UsedItem usedItem);
    
    // 중고 상품 삭제하기
    int DeleteUsedItem(int usedItemNo);

}
