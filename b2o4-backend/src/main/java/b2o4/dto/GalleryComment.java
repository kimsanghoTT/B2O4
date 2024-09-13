package b2o4.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class GalleryComment {
	private int gbCommentNo;
	private int memberNo;
	private String memberName;
	private int gbPostNo;
	private String gbCommentContent;
	private String gbCommentCreateDate;
	private int gbCommentClass;
	private int parentCommentNo;
	private String gbCommentImages;
}
