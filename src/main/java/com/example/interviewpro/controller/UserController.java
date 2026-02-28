package com.example.interviewpro.controller;

import com.example.interviewpro.dto.response.UserResponse;
import com.example.interviewpro.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    @GetMapping("/me")
    public UserResponse me(Authentication auth){
        return service.getMyProfile(auth.getName());
    }

    @PutMapping("/me")
    public UserResponse update(@RequestBody String name,Authentication auth){
        return service.updateProfile(auth.getName(),name);
    }
    @PutMapping("/password")
    public String changePassword(@RequestParam String oldPass,@RequestParam String newPass,Authentication auth) {
        service.changePassword(auth.getName(), oldPass, newPass);
        return "Password Updated";
    }
}
