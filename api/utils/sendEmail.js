/* eslint-disable no-undef */
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to:options.email ,
      subject: options.subject,
      text: options.message,
    };
    transporter.sendMail(mailOptions);
};

export default sendEmail;
