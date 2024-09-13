package b2o4.service;

import java.util.List;

import b2o4.dto.Board;

public interface BoardService {
	List<Board> boardMainSelect();
	
	void insertBoardPost(Board board);
	
	Board getBoardById(int boardNo);
	
	void deletePost(int boardNo);
	
	Board beforeUpdateBoard(int boardNo);
	
	void updateBoard(Board board);
}
