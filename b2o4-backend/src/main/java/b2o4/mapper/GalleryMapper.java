package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.GalleryBoard;
import b2o4.dto.GalleryComment;

@Mapper
public interface GalleryMapper {

	// 갤러리 게시판 업로드
	void GalleryUpload(GalleryBoard galleryBoard);
	
	// 갤러리 게시판 목록 및 상세보기
    List<GalleryBoard> AllGalleryBoard();
	
	// 갤러리 상세보기
	GalleryBoard GalleryDetail(int gbPostNo);
	
	// 갤러리 수정하기
	void updateGallery(GalleryBoard galleryBoard);
	
	// 갤러리 삭제하기
	int deleteGallery(int gbPostNo);
	
	// 갤러리 삭제시 댓글도 같이 삭제하기
	int allDelete(int gbPostNo);
	
	// 갤러리 댓글 작성
	void CommentUpload(GalleryComment galleryComment);
	
	// 갤러리 댓글 보기
	List<GalleryComment> AllGalleryComment();
	
	// 댓글 삭제하기
	int deleteComment(int gbCommentNo);
	
	// 갤러리 답글 작성
	void reComment(GalleryComment galleryComment);
}