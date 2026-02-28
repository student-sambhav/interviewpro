package com.example.interviewpro.service.impl;

import com.example.interviewpro.dto.request.QuestionRequest;
import com.example.interviewpro.entity.Question;
import com.example.interviewpro.exception.ResourceNotFoundException;
import com.example.interviewpro.repository.QuestionRepository;
import com.example.interviewpro.service.QuestionService;
import jakarta.persistence.NamedStoredProcedureQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository repo;
    @Override
    public void addQuestion(QuestionRequest req) {
        Question q = new Question();

        q.setTitle(req.getTitle());
        q.setTopic(req.getTopic());
        q.setDifficulty(req.getDifficulty());
        q.setLink(req.getLink());

        repo.save(q);
    }

    @Override
    public List<Question> getAll() {
        return repo.findAll();
    }

    @Override
    public List<Question> getBytopic(String topic) {
        return repo.findByTopic(topic);
    }
    @Override
    public Question getById(Long id) {

        return repo.findById(id)
                .orElseThrow();
    }
}
