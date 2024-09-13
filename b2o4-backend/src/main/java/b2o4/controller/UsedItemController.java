package b2o4.controller;

import b2o4.dto.UsedItem;
import b2o4.service.UsedItemServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/usedItem")
public class UsedItemController {

    @Autowired
    private UsedItemServiceImpl usedItemService;

    // 중고 상품 전체 목록 조회
    @GetMapping("/all")
    public ResponseEntity<List<UsedItem>> getAllUsedItems() {
        List<UsedItem> usedItems = usedItemService.AllUsedItem();
        return ResponseEntity.ok(usedItems);
    }

    // 중고 상품 상세 조회
    @GetMapping("/{usedItemNo}")
    public ResponseEntity<UsedItem> getUsedItemDetail(@PathVariable int usedItemNo) {
        UsedItem usedItem = usedItemService.usedItem(usedItemNo);
        return ResponseEntity.ok(usedItem);
    }

    //
    
    
    // 중고 상품 업로드
    @PostMapping("/upload")
    public ResponseEntity<String> uploadUsedItem(@RequestParam("title") String title,
                                                 @RequestParam("content") String content,
                                                 @RequestParam("memberNo") int memberNo,
                                                 @RequestParam("files") MultipartFile[] files,
                                                 @RequestParam("memberName") String memberName,
                                                 @RequestParam("memberPhone") String memberPhone) {
      
        usedItemService.uploadImages(files, title, content, memberNo, memberName, memberPhone);
        return ResponseEntity.ok("상품 업로드 완료");
    }

    // 중고 상품 수정
    @PutMapping("/edit/{usedItemNo}")
    public ResponseEntity<String> editUsedItem(@PathVariable("usedItemNo") int usedItemNo,
                                               @RequestParam("title") String title,
                                               @RequestParam("content") String content,
                                               @RequestParam("memberNo") int memberNo,
                                               @RequestParam("files") MultipartFile[] files,
                                               @RequestParam("memberName") String memberName,
                                               @RequestParam("memberPhone") String memberPhone) {
        usedItemService.updateImages(usedItemNo, files, title, content, memberNo, memberName, memberPhone);
        return ResponseEntity.ok("상품 수정 완료");
    }

    // 중고 상품 삭제
    @DeleteMapping("/delete/{usedItemNo}")
    public ResponseEntity<String> DeleteUsedItem(@PathVariable("usedItemNo") int usedItemNo) {
        usedItemService.DeleteUsedItem(usedItemNo);
        return ResponseEntity.ok("상품 삭제 완료");
    }
}
