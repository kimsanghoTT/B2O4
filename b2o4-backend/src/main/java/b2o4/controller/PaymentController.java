package b2o4.controller;
import org.hibernate.internal.build.AllowSysOut;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/confirm")
public class PaymentController {

    private final String apiSecretKey = "test_sk_GePWvyJnrKK5new9NblLrgLzN97E";
    private final RestTemplate restTemplate = new RestTemplate();
    private final Map<String, Boolean> processingMap = new ConcurrentHashMap<>();

    private String encodeSecretKey(String secretKey) {
        String cleanedKey = secretKey.trim(); 
        return "Basic " + Base64.getEncoder().encodeToString((cleanedKey + ":").getBytes());
    }

    @PostMapping("/payment")
    public ResponseEntity<?> confirmPayment(@RequestBody Map<String, String> requestBody) {
        String url = "https://api.tosspayments.com/v1/payments/confirm";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", encodeSecretKey(apiSecretKey));
        headers.set("Content-Type", "application/json");

        String idempotencyKey = requestBody.get("orderId") + "_" + requestBody.get("paymentKey");
        headers.set("Idempotency-Key", idempotencyKey);

        if (processingMap.putIfAbsent(idempotencyKey, true) != null) {
            // 이미 동일한 키로 처리 중인 요청이 존재함
            System.out.println("이미 동일한 키로 처리 중인 요청이 존재함");
            return new ResponseEntity<>("Request is already being processed.", HttpStatus.OK);
        }

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);
        System.out.println("1entity : " + entity);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
            System.out.println("2. response : " + response);
            if (response.getStatusCode() == HttpStatus.OK) {
                return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
            }

            throw new HttpClientErrorException(response.getStatusCode(), "Non-successful response");

        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.CONFLICT && e.getResponseBodyAsString().contains("IDEMPOTENT_REQUEST_PROCESSING")) {
                System.out.println("Idempotent request is already being processed. Aborting further attempts.");
                return new ResponseEntity<>("Request is already being processed.", HttpStatus.OK);
            }

            try {
                Map<String, Object> errorResponse = new ObjectMapper().readValue(e.getResponseBodyAsString(), Map.class);
                if ("PROVIDER_ERROR".equals(errorResponse.get("code"))) {
                    System.out.println("Provider error detected, not suppressing.");
                    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
                }
            } catch (Exception parsingException) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }

        } finally {
            processingMap.remove(idempotencyKey);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
