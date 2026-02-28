package com.example.interviewpro.service;

import com.example.interviewpro.dto.response.AnalyticsResponse;

public interface AnalyticsService {
    AnalyticsResponse summary(String email);

}
