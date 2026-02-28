package com.example.interviewpro.service;

import com.example.interviewpro.dto.request.QuestionRequest;
import com.example.interviewpro.entity.Question;

import java.util.List;

public interface QuestionService {
    void addQuestion(QuestionRequest request);
    List<Question>getAll();
    List<Question>getBytopic(String topic);
    Question getById(Long id);
}
