package com.example.interviewpro.service;

import com.example.interviewpro.dto.response.UserResponse;

public interface UserService {
    UserResponse getMyProfile(String email);
    UserResponse updateProfile(String email,String name);
    void changePassword(String email,String oldPass,String newPass);
}
