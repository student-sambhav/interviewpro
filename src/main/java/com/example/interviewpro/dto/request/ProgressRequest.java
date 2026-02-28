package com.example.interviewpro.dto.request;

import lombok.Data;

@Data
public class ProgressRequest {
    private Long questionId;

    private String status;

    private int attempts;

    private int timeTaken;
}
