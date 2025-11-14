// backend/src/main/java/com/bloodlink/service/EmailService.java
package com.bloodlink.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

// --- These imports have been updated from javax.mail to jakarta.mail ---
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // This is for the donor achievement feature
    public void sendAchievementEmail(String recipientEmail, String donorName, String achievementMessage) {
        // ... your existing achievement email logic ...
        System.out.println("Placeholder for sending achievement email to " + donorName);
    }

    // This method for game completion uses the corrected imports
    public void sendGameCompletionEmail(String recipientEmail, String donorName) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            
            String htmlContent = createGameCompletionTemplate(donorName);

            helper.setTo(recipientEmail);
            helper.setSubject("Thank You for Your Contribution to the Blood Bank Challenge!");
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
            System.out.println("Game completion email sent successfully to " + recipientEmail);

        } catch (MessagingException e) {
            System.err.println("Failed to send game completion email: " + e.getMessage());
        }
    }

    private String createGameCompletionTemplate(String donorName) {
        return "<!DOCTYPE html>" +
               "<html>" +
               "<body style='font-family: Arial, sans-serif; text-align: center; color: #333;'>" +
               "<div style='max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px;'>" +
               "<h1 style='color: #D32F2F;'>We Reached Our Goal!</h1>" +
               "<p style='font-size: 18px;'>Dear " + donorName + ",</p>" +
               "<p style='font-size: 16px;'>Thanks to your generous contribution to the Blood Bank Challenge, we have successfully met our collection goal. Your donation has made a huge difference!</p>" +
               "<p style='font-size: 16px;'>We want to extend a heartfelt vote of thanks for your selfless act. You are a vital part of our life-saving community.</p>" +
               "<hr style='border: 1px solid #eee; margin: 20px 0;'>" +
               "<p style='font-size: 14px; color: #777;'>Thank you for being a part of the <strong>BloodLinkAI</strong> family.</p>" +
               "</div>" +
               "</body>" +
               "</html>";
    }
}
