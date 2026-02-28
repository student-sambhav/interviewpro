package com.example.interviewpro.service;

import com.example.interviewpro.dto.request.LoginRequest;
import com.example.interviewpro.dto.request.RegisterRequest;
import com.example.interviewpro.dto.response.AuthResponse;

public abstract class AuthService {
    public abstract void register(RegisterRequest request);

    public abstract AuthResponse login(LoginRequest request);
}
