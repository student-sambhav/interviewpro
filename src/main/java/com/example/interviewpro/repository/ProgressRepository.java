package com.example.interviewpro.repository;

import com.example.interviewpro.entity.Progress;
import com.example.interviewpro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProgressRepository
        extends JpaRepository<Progress, Long> {

    // Get all progress of a user
    List<Progress> findByUser(User user);

    // 1️⃣ Solved count by topic
    @Query("""
        SELECT p.question.topic, COUNT(p)
        FROM Progress p
        WHERE p.user.id = :userId
        AND p.status = 'SOLVED'
        GROUP BY p.question.topic
    """)
    List<Object[]> countSolvedByTopic(
            @Param("userId") Long userId
    );

    // 2️⃣ Average time
    @Query("""
        SELECT AVG(p.timeTaken)
        FROM Progress p
        WHERE p.user.id = :userId
    """)
    Double avgTime(
            @Param("userId") Long userId
    );

    // 3️⃣ Total solved
    @Query("""
        SELECT COUNT(p)
        FROM Progress p
        WHERE p.user.id = :userId
        AND p.status = 'SOLVED'
    """)
    Long totalSolved(
            @Param("userId") Long userId
    );
    List<Progress> findByUserOrderByCreatedAtDesc(User user);

}
