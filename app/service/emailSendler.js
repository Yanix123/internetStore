// emailSender.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const uuid = require('uuid');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_HOST,
    pass: process.env.SMTP_PASS,
  },
});

function generateConfirmationUrl(token) {
  const baseUrl = 'http://localhost:3000'; // Замените на адрес и порт вашего локального сервера
  return `${baseUrl}/reg/verify-email?token=${token}`;
}

function sendConfirmationEmail(userEmail, confirmationToken) {
  const confirmationLink = generateConfirmationUrl(confirmationToken);

  const mailOptions = {
    from: process.env.SMTP_HOST,
    to: userEmail,
    subject: 'Registration Successful',
    html: `<p>Welcome to the application! Your registration was successful.</p>
           <p>Please click <a href="${confirmationLink}">here</a> to confirm your email.</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  sendConfirmationEmail,
};
