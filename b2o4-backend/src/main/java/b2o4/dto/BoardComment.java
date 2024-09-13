package b2o4.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BoardComment {
	private int commentNo;
	private int memberNo;
	private int boardNo;
	private String commentContent;
	private String commentCreateDate;
	private String memberName;
}
