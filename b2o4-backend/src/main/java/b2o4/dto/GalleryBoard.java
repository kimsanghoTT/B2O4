package b2o4.dto;

import lombok.*;

@Getter
@Setter
@ToString
public class GalleryBoard {
	private int gbPostNo;
	private String gbPostTitle;
	private String gbPostContent;
	private String gbImages;
	private String gbPostCreateDate;
	private int memberNo;
	private String memberName;
}