package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.GalleryBoard;
import b2o4.dto.GalleryComment;
import b2o4.service.GalleryService;

@RestController
@RequestMapping("/gallery")
public class GalleryController {
	@Autowired
	private GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImages(@RequestParam(value = "files", required = false) MultipartFile[] files,
                                               @RequestParam("title") String title,
                                               @RequestParam("content") String content,
                                               @RequestParam("memberNo") int memberNo,
                                               @RequestParam("memberName") String memberName) {
        try {
        	galleryService.uploadImages(files != null ? files : new MultipartFile[]{}, title, content, memberNo, memberName);
            return ResponseEntity.ok("이미지 업로드 성공");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
      
    }

    // 갤러리 게시판 목록보기
    @GetMapping("/posts")
    public ResponseEntity<List<GalleryBoard>> getAllPosts() {
    	System.out.println(galleryService.AllGalleryBoards());
        return ResponseEntity.ok(galleryService.AllGalleryBoards());
    }
	
    // 갤러리게시판 상세보기
	@GetMapping("/{gbpostNo}")
	public GalleryBoard GalleryDetail(@PathVariable("gbPostNo") int gbPostNo) {
		return galleryService.GalleryDetail(gbPostNo);
	}
	
	// 게시판 수정하기
	@PutMapping("/{gbPostNo}")
    public ResponseEntity<String> updateImages(@PathVariable("gbPostNo") int gbPostNo,
    										   @RequestParam(value = "files", required = false) MultipartFile[] files,
                                               @RequestParam("title") String title,
                                               @RequestParam("content") String content,
                                               @RequestParam("memberNo") int memberNo,
                                               @RequestParam("memberName") String memberName) {
        try {
        	galleryService.updateImages(gbPostNo, files != null ? files : new MultipartFile[]{}, title, content, memberNo, memberName);
            return ResponseEntity.ok("이미지 수정 성공");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
      
    }
	
	// 갤러리 삭제하기
	@DeleteMapping("/{gbPostNo}")
	public ResponseEntity<String> deleteGallery(@PathVariable("gbPostNo") int gbPostNo){
		try {
			galleryService.allDelete(gbPostNo);
			
			galleryService.deleteGallery(gbPostNo);
			
			return ResponseEntity.ok("게시글이 삭제되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("삭제에 실패했습니다.");
		}
	}
	
	
	// 갤러리 댓글 작성
	@PostMapping("/comment")
	public ResponseEntity<String> uploadCommentImages(
	        @RequestParam(value = "files", required = false) MultipartFile[] files,
	        @RequestParam("gbCommentContent") String gbCommentContent,
	        @RequestParam("gbPostNo") int gbPostNo,
	        @RequestParam("memberNo") int memberNo,
	        @RequestParam("memberName") String memberName) {
	    try {
	        galleryService.uploadCommentImages(files != null ? files : new MultipartFile[]{}, gbCommentContent, gbPostNo, memberNo, memberName);
	        return ResponseEntity.ok("댓글 작성 성공");
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
	    }
	}
	

	// 갤러리 댓글보기
    @GetMapping("/comment")
    public ResponseEntity<List<GalleryComment>> getAllComments() {
    	System.out.println(galleryService.AllGalleryComment());
        return ResponseEntity.ok(galleryService.AllGalleryComment());
    }
	
 	// 댓글 삭제하기
 	@DeleteMapping("/comment/{gbCommentNo}")
 	public int deleteComment(@PathVariable("gbCommentNo") int gbCommentNo) {
 		return galleryService.deleteComment(gbCommentNo);
 	}
 	
 	// 갤러리 답글 작성
 	@PostMapping("/comment/reply")
 	public ResponseEntity<String> reComment(GalleryComment galleryComment){
 		galleryService.reComment(galleryComment);
 		return ResponseEntity.ok("댓글 작성이 완료되었습니다.");
 	}
}
