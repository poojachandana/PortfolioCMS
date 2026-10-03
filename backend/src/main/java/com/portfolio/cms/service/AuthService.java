package com.portfolio.cms.service;

import com.portfolio.cms.dto.AuthResponse;
import com.portfolio.cms.dto.LoginRequest;
import com.portfolio.cms.entity.User;
import com.portfolio.cms.repository.UserRepository;
import com.portfolio.cms.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final org.springframework.security.core.userdetails.UserDetailsService userDetailsService;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String accessToken = jwtUtil.generateToken(userDetails);
        String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        return new AuthResponse(accessToken, refreshToken, user.getEmail(), user.getName(), user.getRole().name());
    }

    public AuthResponse refresh(String refreshToken) {
        String email = jwtUtil.extractUsername(refreshToken);
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        if (!jwtUtil.isTokenValid(refreshToken, userDetails)) {
            throw new IllegalArgumentException("Invalid or expired refresh token");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String newAccessToken = jwtUtil.generateToken(userDetails);
        String newRefreshToken = jwtUtil.generateRefreshToken(userDetails);

        return new AuthResponse(newAccessToken, newRefreshToken, user.getEmail(), user.getName(), user.getRole().name());
    }
}
