// Importing Nodemailer
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import smtpENV from "../loader/config/smpt.js";
import fs from "fs";
import dotenv from "dotenv";

// ** Load the .env file into process.env ** //
dotenv.config();

// ** Set Up Transporter ** //
const mailTransport = nodemailer.createTransport(
  new SMTPTransport({
    host: smtpENV.SMTP_HOST,
    port: smtpENV.SMTP_PORT,
    secure: smtpENV.SMTP_SECURE,
    auth: {
      user: smtpENV.SMTP_USER,
      pass: smtpENV.SMTP_PASS,
    },
    tls: {
      cert: fs.readFileSync(smtpENV.SMTP_SSL_CERT),
      rejectUnauthorized: smtpENV.SMTP_REQUIRE_TLS,
    },
    debug: smtpENV.SMTP_DEBUG,
  })
);

export default mailTransport;
