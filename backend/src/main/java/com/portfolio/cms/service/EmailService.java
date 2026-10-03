package com.portfolio.cms.service;

import com.portfolio.cms.entity.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.contact.notify-email}")
    private String notifyEmail;

    /**
     * Best-effort notification email. Failures are swallowed (logged) so that
     * a misconfigured SMTP server never breaks the public /contact endpoint -
     * the message is always saved to the DB regardless of email delivery.
     */
    public void sendContactNotification(Message message) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(notifyEmail);
            mail.setSubject("New portfolio contact message: " + safe(message.getSubject()));
            mail.setText(
                    "New message from your portfolio contact form:\n\n" +
                    "Name: " + message.getName() + "\n" +
                    "Email: " + message.getEmail() + "\n" +
                    "Subject: " + safe(message.getSubject()) + "\n\n" +
                    message.getBody()
            );
            mailSender.send(mail);
        } catch (Exception e) {
            System.err.println("Failed to send contact notification email: " + e.getMessage());
        }
    }

    private String safe(String s) {
        return s == null ? "(no subject)" : s;
    }
}
