package com.example.interviewpro.controller;

import com.example.interviewpro.dto.request.QuestionRequest;
import com.example.interviewpro.entity.Question;
import com.example.interviewpro.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/questions")
public class QuestionController {
    private final QuestionService service;

    @PostMapping
    public ResponseEntity<?>add(@RequestBody QuestionRequest req){
        service.addQuestion(req);
        return ResponseEntity.ok("Added");
    }

    @GetMapping
    public List<Question>all(){
        return service.getAll();
    }
    @GetMapping("/topic/{topic}")
    public List<Question>byTopic(@PathVariable String topic){
        return service.getBytopic(topic);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Question> getById(@PathVariable Long id) {

        Question question = service.getById(id);

        return ResponseEntity.ok(question);
    }
}
