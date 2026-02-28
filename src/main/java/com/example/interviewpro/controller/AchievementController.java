package com.example.interviewpro.controller;

import com.example.interviewpro.entity.User;
import com.example.interviewpro.entity.UserAchievement;
import com.example.interviewpro.repository.UserAchievementRepository;
import com.example.interviewpro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@RequiredArgsConstructor
public class AchievementController {

    private final UserAchievementRepository repo;
    private final UserRepository userRepo;

    @GetMapping
    public List<UserAchievement> myAchievements(Authentication auth){

        User user = userRepo
                .findByEmail(auth.getName())
                .orElseThrow();

        return repo.findByUser(user);
    }
}
