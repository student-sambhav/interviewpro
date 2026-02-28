package com.example.interviewpro.dto.request;

import lombok.Data;

@Data
public class QuestionRequest {
    private String title;
    private String topic;
    private String difficulty;
    private String link;
}
