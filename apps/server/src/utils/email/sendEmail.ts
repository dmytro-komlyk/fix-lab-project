import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import path from 'path';

export const sendEmail = async ({ email, subject, payload, template }: any) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transport = {
      host: process.env.SMTP_DOMAIN,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_TO_EMAIL,
        pass: process.env.SMTP_TO_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
      },
    };
    const transporter = nodemailer.createTransport(transport);
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
        throw error;
      } else {
        console.log('Ready to send mail!');
      }
    });
    const source = fs.readFileSync(
      path.join(process.cwd(), 'src/utils/email', template),
      'utf8',
    );
    const compiledTemplate = handlebars.compile(source);
    const mail = {
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    };
    // Send email
    const info = await transporter.sendMail(mail);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.log(error);
    return error;
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

// module.exports = sendEmail;
