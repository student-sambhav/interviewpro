package com.example.interviewpro.controller;

import com.example.interviewpro.dto.request.CodeExecutionRequest;
import com.example.interviewpro.dto.response.CodeExecutionResponse;
import com.example.interviewpro.service.SubmissionService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/submission")
@CrossOrigin
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping("/run")
    public CodeExecutionResponse run(
            @RequestBody CodeExecutionRequest request) {
        return submissionService.executeCode(request);
    }
}