package b2o4.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import b2o4.dto.ChatLog;
import b2o4.dto.Member;
import b2o4.mapper.ChatMapper;

@Service
public class ChatServiceImpl implements ChatService{

	@Autowired
	private ChatMapper mapper;
	
	@Override
	public void recordChatMessage(ChatLog log) {
		System.out.println(log.toString());
		mapper.recordChatMessage(log);
	}
	
    @Override
    public void deleteChatMessage(@Param("msgContent") String msgContent, @Param("msgAt") String msgAt) {
    	
        System.out.println("삭제할 채팅시간: " + msgAt + " // 채팅내용 :" +msgContent);
        mapper.deleteChatMessage(msgContent, msgAt);
    }
    
    @Override
    public List<ChatLog> showWhosChat(String memberId) {
    	return mapper.showWhosChat(memberId); 	
    }
    
    @Override
    public String switchAuthToChat(String memberId, char chatable) {
    	int result = mapper.switchAuthToChat(memberId, chatable);
    	System.out.println(result);
    	return "변경성공";
    }
    
    @Override
    public boolean isAdmin(String memberId) {
        return mapper.isAdmin(memberId);
    }

}