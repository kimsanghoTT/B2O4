package b2o4.dto;

import java.sql.Timestamp;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DeliveryInfo {
	private int memberNo;
	private List<Integer> basketNos;
	private String deliveryAddress;
	private String recipientName;
	private String recipientPhone;
	private String deliveryRequest;
	private Timestamp  createdDate;
}