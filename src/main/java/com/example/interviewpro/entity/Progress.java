package com.example.interviewpro.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tools.jackson.core.ObjectReadContext;

@Entity
@Table(name = "user_progress")
@Getter
@Setter
public class Progress extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="question_id")
    private Question question;
    private String status;
    private int attempts;
    private int timeTaken;
}
