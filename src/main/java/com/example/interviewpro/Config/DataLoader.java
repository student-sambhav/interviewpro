package com.example.interviewpro.Config;

import com.example.interviewpro.entity.Achievement;
import com.example.interviewpro.repository.AchievementRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataLoader {

    private final AchievementRepository repo;

    @PostConstruct
    public void load() {

        save("FIRST_SOLVE", "First Blood", "Solve first problem", "🥇");
        save("HUSTLER", "Hustler", "Solve 10 problems", "⚡");
        save("STREAK_5", "Streak Master", "5 day streak", "🔥");
        save("SPEEDSTER", "Speedster", "Avg < 10s", "🚀");
        save("CENTURY", "Century", "100 Solves", "💯");
    }

    private void save(String code, String name,
                      String desc, String icon) {

        if (repo.findByCode(code).isEmpty()) {

            repo.save(Achievement.builder()
                    .code(code)
                    .name(name)
                    .description(desc)
                    .icon(icon)
                    .build());
        }
    }
}
