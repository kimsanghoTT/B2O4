package b2o4.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/oauth2")
public class KakaoController {

    @Value("${kakao.client-id}")
    private String clientId;

    @Value("${kakao.client-secret}")
    private String clientSecret;

    @Value("${kakao.redirect-uri}")
    private String redirectUri;

    private final RestTemplate restTemplate;

    public KakaoController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @PostMapping("/callback/kakao")
    public ResponseEntity<?> kakaoCallback(@RequestParam("code") String code) {
        System.out.println("Authorization Code Received: " + code);

        String tokenUrl = "https://kauth.kakao.com/oauth/token";
        String requestBody = "grant_type=authorization_code&client_id=" + clientId + "&redirect_uri=" + redirectUri
                + "&code=" + code;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/x-www-form-urlencoded");
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
        System.out.println(entity);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(tokenUrl, entity, String.class);
            System.out.println("Token Response: " + response.getBody());

            String accessToken = extractAccessToken(response.getBody());

            String userInfoUrl = "https://kapi.kakao.com/v2/user/me";
            headers.set("Authorization", "Bearer " + accessToken);
            HttpEntity<String> userInfoEntity = new HttpEntity<>(headers);

            ResponseEntity<String> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, userInfoEntity,
                    String.class);
            System.out.println("User Info Response: " + userInfoResponse.getBody());
            return ResponseEntity.ok(userInfoResponse.getBody());

        } catch (HttpClientErrorException e) {
            System.out.println("Error Response Body: " + e.getResponseBodyAsString());
            System.out.println("Error Status Code: " + e.getStatusCode());
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    private String extractAccessToken(String responseBody) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            JsonNode accessTokenNode = jsonNode.get("access_token");
            if (accessTokenNode == null || accessTokenNode.isMissingNode()) {
                throw new RuntimeException("Access token not found in response");
            }
            return accessTokenNode.asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse access token", e);
        }
    }
}