package b2o4.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    private String sender;
    private String content;
    private String profile;
    private String viewedTime;
    private String formattedTime;
    private String color;
    private String senderType; // 관리자 여부를 판단할 타입 정보
    private boolean isAdmin;
    
}