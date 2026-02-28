package com.example.interviewpro.controller;

import com.example.interviewpro.dto.request.ProgressRequest;
import com.example.interviewpro.entity.Progress;
import com.example.interviewpro.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {
    private final ProgressService service;
    @PostMapping
    public ResponseEntity<?>save(@RequestBody ProgressRequest req, Authentication auth){
        service.saveProgress(auth.getName(),req);
        return ResponseEntity.ok("Saved");
    }
    @GetMapping("/me")
    public List<Progress> myProgress(Authentication auth){
        return service.getMyProgress(auth.getName());
    }
    @GetMapping("/history")
    public List<Progress> history(Authentication auth) {
        return service.getHistory(auth.getName());
    }

}
