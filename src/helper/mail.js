import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
let transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

let sendemail = async (email, id) => {
  let char = "abcdefghijklmnopqrstuvwxyz";
  let number1 = Math.floor(Math.random() * 10 + 1);
  let number2 = Math.floor(Math.random() * 16 + 11);
  let substring = char.substring(number1, number2);
  let link = `http://localhost:5173/changepassword/${id}/${substring}`;
  let mailoptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "password recovery email",
    html: ` <h5>Dear user,</h5>
        &nbsp;&nbsp;You have requested for password recory email.click the following link and complete the form to reset your password. <br><br>
        link:<a href=${link} target="_blank">change_password</a><br><br>
    
        Thanks,<br>
        Management`,
  };

  await transporter.sendMail(mailoptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return substring;
};
let bookingmail = async (email, packageDetails) => {
  let char = "abcdefghijklmnopqrstuvwxyz123456789";
  let number1 = Math.floor(Math.random() * 10 + 1);
  let number2 = Math.floor(Math.random() * 25 + 11);
  let substring = char.substring(number1, number2);

  let mailoptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Booking Conformation mail",
    html: ` <h5>Dear user,</h5>
      &nbsp;&nbsp;Thanks for booking a package with us.Looking forward to see you.<br><br>
      please find the booking details:<br>
      Package name:${packageDetails.name}<br>
      no of persons:${packageDetails.persons}<br>
      trip start date:${packageDetails.startdate}<br>
      total cost:${packageDetails.total}<br>
      bookingid:${substring}
      <br><br>
  
      Thanks,<br>
      Wanderlust`,
  };

  await transporter.sendMail(mailoptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return substring;
};

export default {
  sendemail,
  bookingmail,
};
