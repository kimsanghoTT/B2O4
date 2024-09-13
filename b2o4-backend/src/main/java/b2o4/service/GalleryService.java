package b2o4.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.GalleryBoard;
import b2o4.dto.GalleryComment;

public interface GalleryService {
	
	// 갤러리 업로드
	void createGalleryBoard(GalleryBoard galleryBoard);
    void uploadImages(MultipartFile[] files, String title, String content, int memberNo, String memberName);
	
    // 갤러리 목록보기
    List<GalleryBoard> AllGalleryBoards();
    
    // 갤러리 상세보기
	GalleryBoard GalleryDetail(int gbPostNo);
	
	// 갤러리 수정하기
	void updateGallery(GalleryBoard galleryBoard);
	void updateImages(int gbPostNo, MultipartFile[] files, String title, String content, int memberNo, String memberName);
	
	// 갤러리 삭제하기
	int deleteGallery(int gbPostNo);
	
	// 갤러리 삭제시 댓글도 같이 삭제하기
	int allDelete(int gbPostNo);
	
	// 갤러리 댓글 작성
	void createGalleryComment(GalleryComment galleryComment);
    void uploadCommentImages(MultipartFile[] files, String gbCommentContent, int gbPostNo, int memberNo, String memberName);
    
    // 갤러리 댓글 보기
 	List<GalleryComment> AllGalleryComment();
 	
 	// 댓글 삭제하기
 	int deleteComment(int gbCommentNo);
 	
 	// 갤러리 답글 작성
 	void reComment(GalleryComment galleryComment);
}