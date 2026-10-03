package com.portfolio.cms.config;

import com.portfolio.cms.entity.Role;
import com.portfolio.cms.entity.User;
import com.portfolio.cms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Seeds a default admin user on first run so the CMS is usable immediately
 * after cloning, with no manual DB setup required.
 */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.default-email}")
    private String defaultEmail;

    @Value("${app.admin.default-password}")
    private String defaultPassword;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail(defaultEmail);
            admin.setPassword(passwordEncoder.encode(defaultPassword));
            admin.setRole(Role.ADMIN);
            admin.setEnabled(true);
            userRepository.save(admin);
            System.out.println("==============================================");
            System.out.println(" Default admin created:");
            System.out.println(" Email:    " + defaultEmail);
            System.out.println(" Password: " + defaultPassword);
            System.out.println(" CHANGE THIS IN PRODUCTION.");
            System.out.println("==============================================");
        }
    }
}
