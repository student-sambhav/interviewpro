package com.example.interviewpro.service.impl;

import com.example.interviewpro.dto.response.UserResponse;
import com.example.interviewpro.entity.User;
import com.example.interviewpro.repository.UserRepository;
import com.example.interviewpro.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    @Override
    public UserResponse getMyProfile(String email) {
        User user=userRepo.findByEmail(email)
                .orElseThrow(()->new RuntimeException("User Not found"));
        return map(user);
    }

    @Override
    public UserResponse updateProfile(String email, String name) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setName(name);

        userRepo.save(user);

        return map(user);
    }

    @Override
    public void changePassword(String email, String oldPass, String newPass) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!encoder.matches(oldPass, user.getPassword())) {
            throw new RuntimeException("Wrong password");
        }

        user.setPassword(
                encoder.encode(newPass)
        );

        userRepo.save(user);
    }
    private UserResponse map(User user){
        UserResponse res=new UserResponse();

        res.setId(user.getId());
        res.setName(user.getName());
        res.setEmail(user.getEmail());
        res.setRole(user.getRole());

        return res;
    }

}
