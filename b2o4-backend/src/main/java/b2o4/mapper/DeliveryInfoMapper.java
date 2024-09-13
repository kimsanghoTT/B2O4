package b2o4.mapper;

import org.apache.ibatis.annotations.Mapper;
import b2o4.dto.DeliveryInfo;

@Mapper
public interface DeliveryInfoMapper {
    void insertDeliveryInfo(DeliveryInfo deliveryInfo);
}
