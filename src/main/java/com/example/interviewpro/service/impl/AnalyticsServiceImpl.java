package com.example.interviewpro.service.impl;

import com.example.interviewpro.dto.response.AnalyticsResponse;
import com.example.interviewpro.dto.response.TimeTrend;
import com.example.interviewpro.dto.response.TopicStat;
import com.example.interviewpro.dto.response.Achievement;

import com.example.interviewpro.entity.Progress;
import com.example.interviewpro.entity.User;
import com.example.interviewpro.entity.UserAchievement;

import com.example.interviewpro.repository.AchievementRepository;
import com.example.interviewpro.repository.ProgressRepository;
import com.example.interviewpro.repository.UserAchievementRepository;
import com.example.interviewpro.repository.UserRepository;

import com.example.interviewpro.service.AnalyticsService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final ProgressRepository progressRepo;
    private final UserRepository userRepo;
    private final AchievementRepository achievementRepo;
    private final UserAchievementRepository userAchievementRepo;


    @Override
    public AnalyticsResponse summary(String ignored) {

        /* ================= Get Logged User ================= */

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepo.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));


        /* ================= Fetch Progress ================= */

        List<Progress> progressList =
                progressRepo.findByUser(user);


        /* ================= No Data ================= */

        if (progressList.isEmpty()) {

            return new AnalyticsResponse(
                    0L,
                    0.0,
                    "",
                    List.of(),
                    List.of(),
                    List.of(),
                    user.getCurrentStreak(),
                    user.getMaxStreak(),
                    List.of()
            );
        }


        /* ================= Total Solved ================= */

        Long solved = (long) progressList.size();


        /* ================= Avg Time ================= */

        Double avgTime =
                progressList.stream()
                        .mapToInt(Progress::getTimeTaken)
                        .average()
                        .orElse(0.0);


        /* ================= Topic Count ================= */

        Map<String, Long> topicCount =
                progressList.stream()
                        .collect(Collectors.groupingBy(
                                p -> p.getQuestion().getTopic(),
                                Collectors.counting()
                        ));


        /* ================= Strong Topic ================= */

        String strongTopic =
                Collections.max(
                        topicCount.entrySet(),
                        Map.Entry.comparingByValue()
                ).getKey();


        /* ================= Weak Topics ================= */

        List<String> weakTopics =
                topicCount.entrySet()
                        .stream()
                        .filter(e -> e.getValue() == 1)
                        .map(Map.Entry::getKey)
                        .toList();


        /* ================= Topic Stats ================= */

        List<TopicStat> topicStats =
                topicCount.entrySet()
                        .stream()
                        .map(e -> new TopicStat(
                                e.getKey(),
                                e.getValue()
                        ))
                        .toList();


        /* ================= Time Trend ================= */

        List<TimeTrend> timeTrend =
                progressList.stream()
                        .sorted(Comparator.comparing(Progress::getCreatedAt))
                        .limit(7)
                        .map(p -> new TimeTrend(
                                p.getCreatedAt()
                                        .toLocalDate()
                                        .toString(),

                                (double) p.getTimeTaken()
                        ))
                        .toList();


        /* ================= Unlock Achievements ================= */

        checkAndUnlock(user, solved, avgTime);


        /* ================= Fetch User Achievements ================= */

        List<Achievement> achievements =
                userAchievementRepo
                        .findByUser(user)
                        .stream()
                        .map(ua -> new Achievement(
                                ua.getAchievement().getName(),
                                ua.getAchievement().getIcon(),
                                true
                        ))
                        .toList();


        /* ================= Final Response ================= */

        return new AnalyticsResponse(
                solved,
                avgTime,
                strongTopic,
                weakTopics,
                topicStats,
                timeTrend,
                user.getCurrentStreak(),
                user.getMaxStreak(),
                achievements
        );
    }


    /* ======================================================
                        ACHIEVEMENT LOGIC
       ====================================================== */

    private void checkAndUnlock(User user,
                                Long solved,
                                Double avgTime) {

        // 🥇 First Solve
        if (solved >= 1) {
            unlockIfNotExists(user, "FIRST_SOLVE");
        }

        // ⚡ Hustler
        if (solved >= 10) {
            unlockIfNotExists(user, "HUSTLER");
        }

        // 💯 Century
        if (solved >= 100) {
            unlockIfNotExists(user, "CENTURY");
        }

        // 🔥 Streak
        if (user.getCurrentStreak() >= 5) {
            unlockIfNotExists(user, "STREAK_5");
        }

        // 🚀 Speedster
        if (avgTime < 10) {
            unlockIfNotExists(user, "SPEEDSTER");
        }
    }


    private void unlockIfNotExists(User user, String code) {

        com.example.interviewpro.entity.Achievement achievement =
                achievementRepo.findByCode(code)
                        .orElseThrow();

        boolean exists =
                userAchievementRepo
                        .existsByUserAndAchievement(
                                user, achievement);


        if (!exists) {

            UserAchievement ua =
                    UserAchievement.builder()
                            .user(user)
                            .achievement(achievement)
                            .unlockedAt(LocalDateTime.now())
                            .build();

            userAchievementRepo.save(ua);
        }
    }
}
