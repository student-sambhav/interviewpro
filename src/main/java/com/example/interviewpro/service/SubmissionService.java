package com.example.interviewpro.service;

import com.example.interviewpro.dto.request.CodeExecutionRequest;
import com.example.interviewpro.dto.response.CodeExecutionResponse;
import com.example.interviewpro.entity.TestCase;
import com.example.interviewpro.repository.TestCaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmissionService {

    private final TestCaseRepository testCaseRepository;
    private final ExecutionService executionService;

    public SubmissionService(TestCaseRepository testCaseRepository,
                             ExecutionService executionService) {
        this.testCaseRepository = testCaseRepository;
        this.executionService = executionService;
    }

    public CodeExecutionResponse executeCode(CodeExecutionRequest request) {

        List<TestCase> testCases =
                testCaseRepository.findByQuestionId(request.getQuestionId());

        if (testCases.isEmpty()) {
            return new CodeExecutionResponse(
                    "ERROR",
                    0,
                    0,
                    "No test cases found for this question"
            );
        }

        int passedCount = 0;

        for (TestCase testCase : testCases) {

            try {
                String output = executionService.execute(
                        request.getSourceCode(),
                        testCase.getInput()
                );

                if (output.trim()
                        .equals(testCase.getExpectedOutput().trim())) {
                    passedCount++;
                }

            } catch (Exception e) {
                System.out.println("===== CODE EXECUTION ERROR =====");
                e.printStackTrace();   // 🔥 VERY IMPORTANT
                System.out.println("================================");
                return new CodeExecutionResponse(
                        "ERROR",
                        passedCount,
                        testCases.size(),
                        e.getMessage()
                );
            }
        }

        String finalStatus =
                (passedCount == testCases.size()) ? "PASSED" : "FAILED";

        return new CodeExecutionResponse(
                finalStatus,
                passedCount,
                testCases.size(),
                "Execution Completed"
        );
    }
}