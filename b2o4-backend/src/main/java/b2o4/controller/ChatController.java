package b2o4.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.ChatLog;
import b2o4.dto.Member;
import b2o4.service.ChatService;
import b2o4.vo.ChatMessage;

@RestController
public class ChatController {

    @Autowired
    private ChatService chatService;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
 
    private boolean freezeChat = false;
    private boolean streamingBegin = false;
    ChatLog forDeleteMessage = new ChatLog();
    ChatLog chatLog = new ChatLog();
    
    //채팅 주고받게 하기
    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public ChatMessage send(ChatMessage message) {
        chatLog.setMemberId(message.getSender());
        chatLog.setMsgContent(message.getContent());
        
        // 관리자 여부 확인
        boolean isAdmin = chatService.isAdmin(message.getSender()); // 실제 사용자 확인
        message.setAdmin(isAdmin); // 관리자 여부 설정
        
        //신식 날짜 포맷터
        DateTimeFormatter timeFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String msgAt = LocalDateTime.now().format(timeFormat);
        chatLog.setMsgAt(msgAt);
        
        chatService.recordChatMessage(chatLog);
        return message;
    }
    
    //채팅 DB에 넣기
    @PostMapping("/chat")
    public void recordChatMessage(@RequestBody ChatLog log) {
    	chatService.recordChatMessage(log);
    }

    //삭제할 채팅
    @DeleteMapping("/chat/delete")
    public ResponseEntity<String> deleteChatMessage(
        @RequestParam("msgContent") String msgContent,
        @RequestParam("msgAt") String msgAt
    ) {
        chatService.deleteChatMessage(msgContent, msgAt);   
        return ResponseEntity.ok("삭제 되냐?");
    }
    
    //채팅창 동결/재개 전환
    @MessageMapping("/chat.freezeChat")
    @SendTo("/topic/freezeChat")
    public boolean chatFreezing() {
        freezeChat = !freezeChat;
        return freezeChat;
    }

    //채팅창 동결/재개 상태 전파
    @GetMapping("/chat/freezeChat")
    public boolean getChatFreezing() {
        return freezeChat;
    }
    
    //스트리밍 시작/종료 전환
    @MessageMapping("/chat.streaming")
    @SendTo("/topic/streaming")
    public boolean streamingBegin() {
    	streamingBegin = !streamingBegin;
        return streamingBegin;
    }
    
    //스트리밍 시작/종료 상태 전파
    @GetMapping("/chat/streaming")
    public boolean getStreamingBegin() {
    	return streamingBegin;
    }
    
    //메시지 삭제 전환
    @MessageMapping("/chat.deleteMessage")
    @SendTo("/topic/deleteMessage")
    public ChatLog removeMessageSpread(@RequestBody ChatLog chatLog) {
    	forDeleteMessage = chatLog;
    	return chatLog;
    }
    
    //삭제할 메시지 정보를 반환
    @GetMapping("/chat/deleteMessage")
    public ChatLog getRemoveMessageSpread() {
        return forDeleteMessage;
    }
    
    //검색한 사용자의 채팅목록 가져오기
    @GetMapping("/search/chat")
    public ResponseEntity<List<ChatLog>> showWhosChat(@RequestParam("memberId") String memberId){
    	List<ChatLog> chatLog = chatService.showWhosChat(memberId);
    	return ResponseEntity.ok(chatLog);
    }
    
    // 채팅 금지 / 허용 전환
    @PutMapping("/switch/chat")
    public ResponseEntity<String> switchAuthToChat(
            @RequestParam("memberId") String memberId,
            @RequestParam("chatable") char chatable) {

        String res = chatService.switchAuthToChat(memberId, chatable);

        // Member 객체 생성하여 업데이트 내용 전송
        Member member = new Member();
        member.setMemberId(memberId);
        member.setChatable(chatable);

        // 변경된 채팅 권한을 모든 클라이언트에게 전송
        messagingTemplate.convertAndSend("/topic/chatPermissionUpdate", member);

        return ResponseEntity.ok(res);
    }
}