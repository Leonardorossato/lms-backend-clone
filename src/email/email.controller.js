const nodemailer = require("nodemailer");
require("dotenv").config();
const emailHost = process.env.NODEMAILER_HOST;
const emailPort = process.env.NODEMAILER_PORT;
const emailUser = process.env.NODEMAILER_USERNAME;
const emailPassword = process.env.NODEMAILER_PASSWORD;

class EmailController {
  static sendEmail = async (data, req, res) => {
    try {
      let transporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        secure: false,
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      });
      let info = await transporter.sendMail({
        from: "Leonardo Adami",
        to: data.to,
        subject: data.text,
        html: data.html,
      });
      console.log("Email send", info.messageId);
      console.log("Preview sent", nodemailer.getTestMessageUrl(info));
    } catch (error) {
      return res.status(500).json({ menssage: "Error sending email" });
    }
  };
}

module.exports = EmailController;
