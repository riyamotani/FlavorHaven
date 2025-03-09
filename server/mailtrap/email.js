import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./htmlEmail.js";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'riyamotani601@gmail.com',
        pass: process.env.NODEMAILER
    }
});

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient =  email ;
    try {
        transporter.sendMail({
            from: 'riyamotani601@gmail.com',
            to: recipient,
            subject: 'Verify your email',
            html:htmlContent.replace("{verificationToken}", verificationToken),
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send email verification")

    }
}
export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];
    const htmlContent = generateWelcomeEmailHtml(name);
    try {
        transporter.sendMail({
            from: 'riyamotani601@gmail.com',
            to: recipient,
            subject: 'Welcome to FlavorHaven',
            html:htmlContent,
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send welcome email")
    }
}
export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];
    const htmlContent = generatePasswordResetEmailHtml(resetURL);
    try {
        transporter.sendMail({
            from: 'riyamotani601@gmail.com',
            to: recipient,
            subject: 'Reset your password',
            html:htmlContent
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to reset password")
    }
}
export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    const htmlContent = generateResetSuccessEmailHtml();
    try {
        transporter.sendMail({
            from: 'riyamotani601@gmail.com',
            to: recipient,
            subject: 'Password Reset Successfully',
            html:htmlContent
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send password reset success email");
    }
}