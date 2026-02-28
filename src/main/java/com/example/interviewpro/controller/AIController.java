package com.example.interviewpro.controller;

import com.example.interviewpro.dto.request.CodeRequest;
import com.example.interviewpro.service.GroqAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final GroqAIService groqAIService;

    @PostMapping("/analyze")
    public ResponseEntity<String> analyze(@RequestBody CodeRequest request) {

        String result = groqAIService.analyzeCode(request);

        return ResponseEntity.ok(result);
    }
}