package com.example.interviewpro.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
public class AnalyticsResponse {
    private Long totalSolved;

    private Double avgTime;

    private String strongTopic;

    private List<String> weakTopics;
    List<TopicStat> topicStats;
    List<TimeTrend> timeTrend;
    private int currentStreak;
    private int maxStreak;
    List<Achievement> achievements;


}


