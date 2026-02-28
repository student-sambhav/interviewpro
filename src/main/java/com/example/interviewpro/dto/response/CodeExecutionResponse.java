package com.example.interviewpro.dto.response;

public class CodeExecutionResponse {

    private String status; // PASSED / FAILED / ERROR
    private int passed;
    private int total;
    private String message;

    public CodeExecutionResponse() {
    }

    public CodeExecutionResponse(String status, int passed, int total, String message) {
        this.status = status;
        this.passed = passed;
        this.total = total;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public int getPassed() {
        return passed;
    }

    public int getTotal() {
        return total;
    }

    public String getMessage() {
        return message;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setPassed(int passed) {
        this.passed = passed;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}