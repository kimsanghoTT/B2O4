package b2o4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.BoardComment;
import b2o4.mapper.BoardCommentMapper;

@Service
public class BoardCommentServiceImpl implements BoardCommentService {
	@Autowired
	private BoardCommentMapper boardCommentMapper;

	@Override
	public List<BoardComment> getBoardCommentByBoardNo() {
		return boardCommentMapper.getBoardCommentByBoardNo();
	}
	
	@Override
	public void adminBoardComment(BoardComment boardComment) {
		boardCommentMapper.adminBoardComment(boardComment);
	}
	
	@Override
	public List<BoardComment> getBoardCommentByBoardNo1(int boardNo) {
		return boardCommentMapper.getBoardCommentByBoardNo1(boardNo);
	}
	
	@Override
	public void deleteBoardCommentByCommentNo(int commentNo) {
		boardCommentMapper.deleteBoardCommentByCommentNo(commentNo);
	}
}
