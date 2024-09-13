package b2o4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import b2o4.dto.DeliveryInfo;
import b2o4.mapper.DeliveryInfoMapper;

@Service
public class DeliveryInfoServiceImpl implements DeliveryInfoService {

    @Autowired
    private DeliveryInfoMapper deliveryInfoMapper;

    @Override
    public void insertDeliveryInfo(DeliveryInfo deliveryInfo) {
        if (deliveryInfo.getBasketNos() != null && !deliveryInfo.getBasketNos().isEmpty()) {
            deliveryInfoMapper.insertDeliveryInfo(deliveryInfo);
        } else {
            throw new IllegalArgumentException("BasketNos must not be null or empty");
        }
    }

}