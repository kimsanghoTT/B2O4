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

import b2o4.dto.UsedItem;
import b2o4.mapper.GalleryMapper;
import b2o4.mapper.UsedItemMapper;

@Service
public class UsedItemServiceImpl implements UsedItemService {
	
    @Autowired
    private UsedItemMapper usedItemMapper;
    
    @Value("${file.upload-dir}")
    private String uploadDir;
    
    // 생성자에서 UsedItem 주입 제거
    public UsedItemServiceImpl() {
    }

    
    
    
    
    // 전체보기
    @Override
    public List<UsedItem> AllUsedItem() {
    	return usedItemMapper.AllUsedItem();
    }
    
    // 상세보기
    @Override
    public UsedItem usedItem(int usedItemNo) {
    	return usedItemMapper.UsedItemDetail(usedItemNo);
    }
    
    //글 업로드
    @Override
    public void UsedItemUpload(UsedItem usedItem) {
    	usedItemMapper.UsedItemUpload(usedItem);
    	
    }
    
    //사진 업로드
    @Override
    public void uploadImages(MultipartFile[] files, String title, String content, int MemberNo, String memberName, String memberPhone) {

    	List<String> fileNames = new ArrayList<String>();
    	
    	if (files != null && files.length > 0) {
    		File uploadDirFile = new File(uploadDir);
    		if (!uploadDirFile.exists()) {
    			if (!uploadDirFile.mkdirs()) {
    				throw new RuntimeException("생성에 실패했습니다.");
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
    				throw new RuntimeException("파일 업로드에 실패하였습니다.", e);
    			}
    			return fileName;
    		}).collect(Collectors.toList());
    	} catch (RuntimeException e) {
    		e.printStackTrace();
    		throw new RuntimeException("파일 업로드에 실패하였습니다.", e);
    	}
    	
    	try {
            UsedItem usedItem = new UsedItem();
            usedItem.setUsedItemTitle(title);
            usedItem.setUsedItemDescription(content);
            usedItem.setUsedItemImages(String.join(",", fileNames));
            usedItem.setMemberNo(MemberNo);
            usedItem.setMemberName(memberName);  // 사용자의 실제 이름으로 설정
            usedItem.setMemberPhone(memberPhone); // 사용자의 실제 전화번호로 설정
            UsedItemUpload(usedItem);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("파일 저장 실패", e);
        }
    	
    }
    
    //수정하기
    @Override
    public void UpdateUsedItem(UsedItem usedItem) {
    	usedItemMapper.UpdateUsedItem(usedItem);
    }
    
    //사진수정
    @Override
    public void updateImages(int usedItemNo, MultipartFile[] files, String title, String content, int MemberNo, String memberName, String memberPhone) {
        List<String> fileNames = new ArrayList<>();

        // 파일이 업로드된 경우 처리
        if (files != null && files.length > 0) {
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
                        throw new RuntimeException("파일 업로드에 실패하였습니다.", e);
                    }
                    return fileName;
                }).collect(Collectors.toList());
            } catch (RuntimeException e) {
                e.printStackTrace();
                throw new RuntimeException("파일 업로드에 실패하였습니다.", e);
            }
        }

        try {
            UsedItem usedItem = new UsedItem();
            usedItem.setUsedItemNo(usedItemNo); // 기존 아이템 번호를 설정
            usedItem.setUsedItemTitle(title);
            usedItem.setUsedItemDescription(content);
            usedItem.setMemberNo(MemberNo);
            usedItem.setMemberName(memberName);
            usedItem.setMemberPhone(memberPhone);
            usedItem.setUsedItemImages(String.join(",", fileNames));

            UpdateUsedItem(usedItem);  // 업데이트 메서드 호출
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("파일 저장 실패", e);
        }
    }


    
    @Override
    public int DeleteUsedItem(int usedItemNo) {
    	return usedItemMapper.DeleteUsedItem(usedItemNo);
    }
    
}
