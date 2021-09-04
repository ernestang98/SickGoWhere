const shell = require('shelljs');
const fs = require("fs");
const nodemailer = require("nodemailer");
const zipdir = require('zip-dir');
require('dotenv').config()
const sendinBlue = require('nodemailer-sendinblue-transport');

var transporter = nodemailer.createTransport(sendinBlue({
	apiKey: ""
}))

const reportDirectory = "mochawesome-report"
const reportPath = process.cwd() + "/" + reportDirectory


async function zipFile() {
  try {
  	console.log("creating zip file...")
    // zipdir(reportPath, { saveTo: process.cwd() + '/report.zip' }, function (err, buffer) {});
  }
  catch (e) {
    console.log(e)
  }
}

zipFile().then(r=>{

  console.log("creating transporter...")

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: "ernestoangsto@gmail.com",
          pass: process.env.PASS
      }
  });

  if (true) {

  // if (fs.existsSync(reportPath)) {

      const data = {
          from: `App Administrator <ernestang98@gmail.com>`,
          to: "shufflingmouse@yahoo.com.sg",
          subject: "Test Report",
          html: `<p>Test Report</p>`
          // attachments: [
          //   {
          //     filename: 'report.zip',
          //     // filePath: __dirname + "/report.zip",
          //     type: "zip",
          //     content: fs.readFileSync(__dirname + "/report.zip").toString("base64"),
          //     disposition: 'attachment'
          //   }
          // ]
      };

      // send mail with defined transport object
      // transporter.sendMail(data);
      transporter.sendMail(data);

      // shell.rm('-r', reportDirectory)
      console.log("Success!")
  }
  else {
    console.log("Error with fs.existsSync()")
  }
})