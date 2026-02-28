package com.example.interviewpro.dto.request;

public class CodeExecutionRequest {

    private Long questionId;
    private String sourceCode;

    public CodeExecutionRequest() {
    }

    public CodeExecutionRequest(Long questionId, String sourceCode) {
        this.questionId = questionId;
        this.sourceCode = sourceCode;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public String getSourceCode() {
        return sourceCode;
    }

    public void setSourceCode(String sourceCode) {
        this.sourceCode = sourceCode;
    }
}