package com.example.interviewpro.service;

import com.example.interviewpro.dto.request.ProgressRequest;
import com.example.interviewpro.entity.Progress;

import java.util.List;

public interface ProgressService {
    void saveProgress(
            String email,
            ProgressRequest request
    );
    List<Progress> getMyProgress(String email);
    List<Progress> getHistory(String email);

}
