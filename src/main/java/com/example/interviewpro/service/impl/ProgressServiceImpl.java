package com.example.interviewpro.service.impl;

import com.example.interviewpro.dto.request.ProgressRequest;
import com.example.interviewpro.entity.Progress;
import com.example.interviewpro.entity.Question;
import com.example.interviewpro.entity.User;
import com.example.interviewpro.repository.ProgressRepository;
import com.example.interviewpro.repository.QuestionRepository;
import com.example.interviewpro.repository.UserRepository;
import com.example.interviewpro.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgressServiceImpl implements ProgressService {
    private final ProgressRepository progressRepo;
    private final UserRepository userRepo;
    private final QuestionRepository questionRepo;
    @Override
    public void saveProgress(String email, ProgressRequest req) {
        User user=userRepo.findByEmail(email)
                .orElseThrow();
        Question q=questionRepo.findById(req.getQuestionId())
                .orElseThrow();
        Progress p = new Progress();

        p.setUser(user);
        p.setQuestion(q);
        p.setStatus(req.getStatus());
        p.setAttempts(req.getAttempts());
        p.setTimeTaken(req.getTimeTaken());

        progressRepo.save(p);
    }

    @Override
    public List<Progress> getMyProgress(String email) {
        User user=userRepo.findByEmail(email)
                .orElseThrow();
        return progressRepo.findByUser(user);
    }
    @Override
    public List<Progress> getHistory(String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return progressRepo.findByUserOrderByCreatedAtDesc(user);
    }
    private void updateStreak(User user) {

        LocalDate today = LocalDate.now();

        LocalDate last = user.getLastSolvedDate();

        if (last == null) {
            user.setCurrentStreak(1);
        }
        else if (last.plusDays(1).equals(today)) {
            user.setCurrentStreak(user.getCurrentStreak() + 1);
        }
        else if (!last.equals(today)) {
            user.setCurrentStreak(1);
        }

        user.setLastSolvedDate(today);

        user.setMaxStreak(
                Math.max(user.getMaxStreak(), user.getCurrentStreak())
        );

        userRepo.save(user);
    }

}
