package b2o4.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import b2o4.dto.BoardComment;

@Mapper
public interface BoardCommentMapper {
	List<BoardComment> getBoardCommentByBoardNo();
	
	void adminBoardComment(BoardComment boardComment);
	
	List<BoardComment> getBoardCommentByBoardNo1(int boardNo);
	
	void deleteBoardCommentByCommentNo(int commentNo);
}
