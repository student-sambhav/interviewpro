package com.example.interviewpro.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class SubmissionRequest {
    private String code;
    private List<String> inputs;
    private List<String> expectedOutputs;
}
