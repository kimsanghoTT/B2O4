package b2o4.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;

import java.util.HashMap;
import java.util.Map;

@RestController
public class GoogleController {

	@Value("${google.client-id}")
	private String clientId;

	@Value("${google.client-secret}")
	private String clientSecret;

	@Value("${google.redirect-uri}")
	private String redirectUri;
	


    @PostMapping("/auth/google/callback")
    public Map<String, Object> googleAuthCallback(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            String code = request.get("code");

            // 인증 코드를 사용하여 액세스 토큰 및 ID 토큰을 가져옵니다.
            GoogleTokenResponse tokenResponse = new GoogleAuthorizationCodeTokenRequest(
                    new com.google.api.client.http.javanet.NetHttpTransport(),
                    new com.google.api.client.json.jackson2.JacksonFactory(),
                    "https://oauth2.googleapis.com/token",
                    clientId,
                    clientSecret,
                    code,
                    redirectUri
            ).execute();

            String accessToken = tokenResponse.getAccessToken();
            GoogleIdToken idToken = tokenResponse.parseIdToken();
            GoogleIdToken.Payload payload = idToken.getPayload();

            // 사용자 정보 가져오기
            String userId = payload.getSubject();
            String email = payload.getEmail();
            String name = (String) payload.get("name");

            response.put("userId", userId);
            response.put("email", email);
            response.put("name", name);
            response.put("accessToken", accessToken);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", "Google authentication failed");
        }
        return response;
    }
}