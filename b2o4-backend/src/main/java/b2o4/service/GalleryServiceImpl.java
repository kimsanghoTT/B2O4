package b2o4.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import b2o4.dto.GalleryBoard;
import b2o4.dto.GalleryComment;
import b2o4.mapper.GalleryMapper;

@Service
public class GalleryServiceImpl implements GalleryService{
	@Autowired
	private GalleryMapper galleryMapper;

    @Value("${file.upload-dir}") //properties 에 설정한 이미지 저장 경로
    private String uploadDir;

    public GalleryServiceImpl(GalleryMapper galleryMapper) {
        this.galleryMapper = galleryMapper;
    }

    @Override
    public void createGalleryBoard(GalleryBoard galleryBoard) {
    	galleryMapper.GalleryUpload(galleryBoard);
    }

    @Override
    public void uploadImages(MultipartFile[] files, String title, String content, int memberNo, String memberName) {
        
        List<String> fileNames = new ArrayList<>();

	    if (files != null && files.length > 0) {
	        // 디렉토리 존재 확인 및 생성
	        File uploadDirFile = new File(uploadDir);
	        if (!uploadDirFile.exists()) {
	            if (!uploadDirFile.mkdirs()) {
	                throw new RuntimeException("디렉토리 생성에 실패하였습니다.");
	            }
	        }

	    }
        try {
            fileNames = List.of(files).stream().map(file -> {
                String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                File destinationFile = new File(uploadDir + File.separator + fileName);
                try {
                    file.transferTo(destinationFile);
                } catch (IOException e) {
                    throw new RuntimeException("파일 업로드 실패", e);
                }
                return fileName;
            }).collect(Collectors.toList());
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("파일 업로드 실패", e);
        }

        try {
            GalleryBoard galleryBoard = new GalleryBoard();
            galleryBoard.setGbPostTitle(title);
            galleryBoard.setGbPostContent(content);
            galleryBoard.setGbImages(String.join(",", fileNames));
            galleryBoard.setMemberNo(memberNo);
            galleryBoard.setMemberName(memberName);
            createGalleryBoard(galleryBoard);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("파일 저장 실패 ", e);
        }
    }
    
    // 갤러기 목록보기
    @Override
    public List<GalleryBoard> AllGalleryBoards() {
        return galleryMapper.AllGalleryBoard();
    }

	// 갤러리 상세보기
	public GalleryBoard GalleryDetail(int GBPostNo) {
		return galleryMapper.GalleryDetail(GBPostNo);
	}
	
	// 갤러리 수정하기
	@Override
	public void updateGallery(GalleryBoard galleryBoard) {
	    galleryMapper.updateGallery(galleryBoard);
	}
	
	@Override
	public void updateImages(int gbPostNo, MultipartFile[] files, String title, String content, int memberNo, String memberName) {
        
        List<String> fileNames = new ArrayList<>();

	    if (files != null && files.length > 0) {
	        // 디렉토리 존재 확인 및 생성
	        File uploadDirFile = new File(uploadDir);
	        if (!uploadDirFile.exists()) {
	            if (!uploadDirFile.mkdirs()) {
	                throw new RuntimeException("디렉토리 생성에 실패하였습니다.");
	            }
	        }

	    }
        try {
            fileNames = List.of(files).stream().map(file -> {
                String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                File destinationFile = new File(uploadDir + File.separator + fileName);
                try {
                    file.transferTo(destinationFile);
                } catch (IOException e) {
                    throw new RuntimeException("파일 업로드 실패", e);
                }
                return fileName;
            }).collect(Collectors.toList());
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("파일 업로드 실패", e);
        }

        try {
            GalleryBoard galleryBoard = new GalleryBoard();
            galleryBoard.setGbPostNo(gbPostNo);
            galleryBoard.setGbPostTitle(title);
            galleryBoard.setGbPostContent(content);
            galleryBoard.setGbImages(String.join(",", fileNames));
            galleryBoard.setMemberNo(memberNo);
            galleryBoard.setMemberName(memberName);
            System.out.println(galleryBoard);
            updateGallery(galleryBoard);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("파일 저장 실패 ", e);
        }
    }
	
	// 갤러리 삭제하기
	@Override
	public int deleteGallery(int gbPostNo) {
		return galleryMapper.deleteGallery(gbPostNo);
	}
	
	// 갤러리 삭제시 댓글도 같이 삭제하기
	@Override
	public int allDelete(int gbPostNo) {
		return galleryMapper.allDelete(gbPostNo);
	}
	
	
	// 갤러리 댓글 작성
	@Override
	public void createGalleryComment(GalleryComment galleryComment) {
		galleryMapper.CommentUpload(galleryComment);
	}
	
	@Override
	public void uploadCommentImages(MultipartFile[] files, String gbCommentContent, int gbPostNo, int memberNo, String memberName) {
	    List<String> fileNames = new ArrayList<>();

	    if (files != null && files.length > 0) {
	        // 디렉토리 존재 확인 및 생성
	        File uploadDirFile = new File(uploadDir);
	        if (!uploadDirFile.exists()) {
	            if (!uploadDirFile.mkdirs()) {
	                throw new RuntimeException("디렉토리 생성에 실패하였습니다.");
	            }
	        }

	        try {
	            fileNames = List.of(files).stream().map(file -> {
	                String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
	                File destinationFile = new File(uploadDir + File.separator + fileName);
	                try {
	                    file.transferTo(destinationFile);
	                } catch (IOException e) {
	                    throw new RuntimeException("파일 업로드 실패", e);
	                }
	                return fileName;
	            }).collect(Collectors.toList());
	        } catch (RuntimeException e) {
	            e.printStackTrace();
	            throw new RuntimeException("파일 업로드 실패", e);
	        }
	    }

	    try {
	        GalleryComment galleryComment = new GalleryComment();
	        galleryComment.setGbCommentContent(gbCommentContent);
	        galleryComment.setGbCommentImages(String.join(",", fileNames));
	        galleryComment.setGbPostNo(gbPostNo);
	        galleryComment.setMemberNo(memberNo);
	        galleryComment.setMemberName(memberName);
	        createGalleryComment(galleryComment);
	        System.out.println("gC : " + galleryComment);
	    } catch (Exception e) {
	        e.printStackTrace();
	        throw new RuntimeException("댓글 저장 실패", e);
	    }
	}
	
	
	// 갤러리 댓글 보기
	@Override
	public List<GalleryComment> AllGalleryComment() {
		return galleryMapper.AllGalleryComment();
	}
	
	// 댓글 삭제하기
	@Override
	public int deleteComment(int gbCommentNo) {
		return galleryMapper.deleteComment(gbCommentNo);
	}
	
	// 답글 작성하기
	@Override
	public void reComment(GalleryComment galleryComment) {
		System.out.println("rC : " + galleryComment);
		galleryMapper.reComment(galleryComment);
	}
	
}