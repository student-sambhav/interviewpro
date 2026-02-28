package com.example.interviewpro.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Achievement {
    private String name;
    private String icon;
    private boolean unlocked;
}
