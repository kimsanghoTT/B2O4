package b2o4.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.Board;
import b2o4.mapper.BoardMapper;

@Service
public class BoardServiceImpl implements BoardService{
	@Autowired
	private BoardMapper boardMapper;
	
	@Override
	public List<Board> boardMainSelect() {
		return boardMapper.boardMainSelect();
	}
	
	@Override
	public void insertBoardPost(Board board) {
		boardMapper.insertBoardPost(board);
	}
	
	@Override
	public Board getBoardById(int boardNo) {
		return boardMapper.getBoardById(boardNo);
	}
	
	@Override
	public void deletePost(int boardNo) {
		boardMapper.deletePost(boardNo);
	}
	
	@Override
	public Board beforeUpdateBoard(int boardNo) {
		return boardMapper.beforeUpdateBoard(boardNo);
	}
	
	@Override
	public void updateBoard(Board board) {
		boardMapper.updateBoard(board);
	}
}
