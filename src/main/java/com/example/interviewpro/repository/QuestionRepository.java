package com.example.interviewpro.repository;

import com.example.interviewpro.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question,Long> {
    List<Question> findByTopic(String topic);
}
