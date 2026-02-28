package com.example.interviewpro.service.impl;

import com.example.interviewpro.dto.request.LoginRequest;
import com.example.interviewpro.dto.request.RegisterRequest;
import com.example.interviewpro.dto.response.AuthResponse;
import com.example.interviewpro.entity.User;
import com.example.interviewpro.repository.UserRepository;
import com.example.interviewpro.security.JwtUtil;
import com.example.interviewpro.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl extends AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public void register(RegisterRequest request){
        if(userRepository.findByEmail((request.getEmail())).isPresent()){
            throw new RuntimeException("Email Already Exists");
        }
        User user=new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(
        passwordEncoder.encode(request.getPassword())
        );
        userRepository.save(user);
    }

    @Override
    public AuthResponse login(LoginRequest request){
        User user=userRepository.findByEmail(request.getEmail())
                .orElseThrow(()->new RuntimeException("User Not found"));

        if(!passwordEncoder.matches(
                request.getPassword(), user.getPassword()
        )){
            throw new RuntimeException("Invalid Exception");
        }
        String token=jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token);
    }
}
