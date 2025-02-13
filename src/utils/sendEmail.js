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

// const data = {
//   to: 'yiromir277@minduls.com',
//   subject: 'Hello Ukraine!',
//   html: '<h1>Welcome to Ukraine</h1>',
// };
export const sendEmail = (data) => {
  const email = { ...data, from: SMTP_USER };
  return transport.sendMail(email);
};
