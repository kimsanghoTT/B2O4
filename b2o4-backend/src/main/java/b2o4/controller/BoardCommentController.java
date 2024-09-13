package b2o4.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.Board;
import b2o4.dto.BoardComment;
import b2o4.service.BoardCommentService;

@RestController
@RequestMapping("/boards/comment")
public class BoardCommentController {
	
	@Autowired
	private BoardCommentService boardCommentService;
	
	@GetMapping
	public List<BoardComment> getBoardCommentByBoardNo() {
		return boardCommentService.getBoardCommentByBoardNo();
	}
	
	@PostMapping
	public void adminBoardComment(@RequestBody BoardComment boardComment) {
		boardCommentService.adminBoardComment(boardComment);
	}
	
	@GetMapping("/{boardNo}")
	public List<BoardComment> getBoardCommentByBoardNo1(@PathVariable("boardNo") int boardNo) {
		return boardCommentService.getBoardCommentByBoardNo1(boardNo);
	}
	
	@DeleteMapping
    public void deleteBoardCommentByCommentNo(@RequestParam("commentNo") int commentNo) {
    	boardCommentService.deleteBoardCommentByCommentNo(commentNo);
    }
	
}
