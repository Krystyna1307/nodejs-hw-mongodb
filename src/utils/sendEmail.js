import nodemailer from 'nodemailer';
import 'dotenv/config';

const { SMTP_USER, SMTP_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  from: SMTP_USER,
  to: 'yiromir277@minduls.com',
  subject: 'Hello Krystyna!',
  html: '<h1>Welcome to Poland</h1>',
};

transport
  .sendMail(email)
  .then((msg) => console.log(msg))
  .catch((error) => console.log(error.message));
