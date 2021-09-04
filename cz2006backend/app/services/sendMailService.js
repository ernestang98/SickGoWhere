require('dotenv').config()

const nodemailer = require("nodemailer");
const sendinBlue = require('nodemailer-sendinblue-transport');

const sendMail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: "ernestoangsto@gmail.com",
      pass: process.env.PASS
  }
});

module.exports = sendMail;