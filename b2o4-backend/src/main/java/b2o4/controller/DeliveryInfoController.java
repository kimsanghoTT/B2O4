package b2o4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import b2o4.dto.DeliveryInfo;
import b2o4.service.DeliveryInfoService;

@RestController
@RequestMapping("/delivery")
public class DeliveryInfoController {

    @Autowired
    private DeliveryInfoService deliveryInfoService;
    
    @PostMapping("/add")
    public ResponseEntity<String> addDeliveryInfo(@RequestBody DeliveryInfo deliveryInfo) {
        try {
            deliveryInfoService.insertDeliveryInfo(deliveryInfo);
            return ResponseEntity.ok("Delivery info added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add delivery info: " + e.getMessage());
        }
    }
}