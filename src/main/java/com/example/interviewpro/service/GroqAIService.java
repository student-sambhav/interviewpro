package com.example.interviewpro.service;

import com.example.interviewpro.dto.request.CodeRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GroqAIService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    @Value("${groq.api.key}")
    private String apiKey;

    private static final String GROQ_URL =
            "https://api.groq.com/openai/v1/chat/completions";

    public String analyzeCode(CodeRequest request) {

        try {

            String prompt = buildPrompt(request);

            // -------- Build JSON safely ----------
            Map<String, Object> body = new HashMap<>();

            body.put("model", "llama-3.1-8b-instant");

            List<Map<String, String>> messages = new ArrayList<>();

            Map<String, String> userMsg = new HashMap<>();
            userMsg.put("role", "user");
            userMsg.put("content", prompt);

            messages.add(userMsg);

            body.put("messages", messages);

            String jsonBody = objectMapper.writeValueAsString(body);

            // -------- Call API ----------
            String response = webClient.post()
                    .uri(GROQ_URL)
                    .header("Authorization", "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(jsonBody)
                    .retrieve()
                    .onStatus(
                            status -> status.isError(),
                            res -> res.bodyToMono(String.class)
                                    .map(err -> new RuntimeException("Groq API Error: " + err))
                    )
                    .bodyToMono(String.class)
                    .block();

            return extractText(response);

        } catch (Exception e) {
            e.printStackTrace();
            return "AI Error: " + e.getMessage();
        }
    }

    // ---------------- Prompt ----------------

    private String buildPrompt(CodeRequest req) {

        return """
        You are a technical interviewer.

        Analyze this %s solution for "%s".

        Give:
        1. Time Complexity
        2. Space Complexity
        3. Mistakes
        4. Optimization
        5. Better Approach

        Code:
        %s
        """.formatted(
                req.getLanguage(),
                req.getProblem(),
                req.getCode()
        );
    }

    // ---------------- Parse Response ----------------

    private String extractText(String json) {

        try {

            JsonNode root = objectMapper.readTree(json);

            return root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

        } catch (Exception e) {
            return "Error reading AI response";
        }
    }
}