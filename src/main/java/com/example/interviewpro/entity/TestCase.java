package com.example.interviewpro.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class TestCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long questionId;

    @Column(length = 2000)
    private String input;

    @Column(length = 2000)
    private String expectedOutput;

    private boolean hidden;

    // getters and setters
}