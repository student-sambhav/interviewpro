package com.example.interviewpro.repository;

import com.example.interviewpro.entity.User;
import com.example.interviewpro.entity.UserAchievement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAchievementRepository extends JpaRepository<UserAchievement,Long> {
    List<UserAchievement> findByUser(User user);
    boolean existsByUserAndAchievement(User user,Object achievement);
}
