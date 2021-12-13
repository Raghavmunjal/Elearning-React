import AWS from "aws-sdk";
import userSchema from "../models/userModel";
import { nanoid } from "nanoid";
import { hashPassword } from "../utils/bcrypt";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};
const SES = new AWS.SES(awsConfig);

//@desc   Reset Password
//@routes POST /api/auth/forget-password
//@access PUBLIC
export const resetEmail = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await userSchema.findOne({ email }).exec();

    if (!otp) return res.status(400).send("Otp is required");

    if (!newPassword || newPassword.length < 8)
      return res
        .status(400)
        .send("Password is required and should be min 8 characters long");

    if (!user) {
      return res.status(400).send("Email Not Found");
    }
    if (otp !== user.passwordResetCode)
      return res.status(400).send("Invalid Otp");

    const hashedPassword = await hashPassword(newPassword);
    const updateUser = await userSchema
      .findOneAndUpdate(
        { email, passwordResetCode: otp },
        { passwordResetCode: "", password: hashedPassword }
      )
      .exec();

    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [process.env.EMAIL_FROM],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
              <html>
              <h1>Password Reset Successfully</h1>
              <i>kakshaa.herokuapp.com</i>
              </html>
              `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Password Reset",
        },
      },
    };
    const emailSent = SES.sendEmail(params).promise();
    emailSent
      .then((data) => {
        res.json({ success: true });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error try again");
  }
};

//@desc   Verify Email
//@routes POST /api/auth/verify-email
//@access PUBLIC
export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userSchema.findOne({ email }).exec();
    if (!user) {
      return res.status(400).send("Email Not Found");
    }
    const otp = nanoid(6).toUpperCase();
    const updateUser = await userSchema.findOneAndUpdate(
      { email },
      { passwordResetCode: otp }
    );

    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [process.env.EMAIL_FROM],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
            <html>
            <h1>Reset Your Password</h1>
            <p>Use this code</p>
            <h2 style="color:red;">${otp}</h2>
            <i>kakshaa.herokuapp.com</i>
            </html>
            `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Otp for Reset Password",
        },
      },
    };
    const emailSent = SES.sendEmail(params).promise();
    emailSent
      .then((data) => {
        res.json({ success: true });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error try again");
  }
};
