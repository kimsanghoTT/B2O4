package b2o4.dto;

import java.security.Timestamp;
import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UsedItem {
    private int usedItemNo;
    private int memberNo;
    private String usedItemTitle;
    private String usedItemDescription;
    private String usedItemImages;
    private LocalDateTime usedItemCreateDate;
    
    // 판매자 정보 추가
    private String memberName;
    private String memberPhone;
}
