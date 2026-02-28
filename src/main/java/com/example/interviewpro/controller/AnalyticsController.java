package com.example.interviewpro.controller;

import com.example.interviewpro.dto.response.AnalyticsResponse;
import com.example.interviewpro.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {
    private final AnalyticsService service;

    @GetMapping("/summary")
    public AnalyticsResponse summary(Authentication auth){
        return service.summary(auth.getName());
    }
}
