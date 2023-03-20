import nodeMailer from "nodemailer";
import {SMPT_SERVICE,SMPT_MAIL,SMPT_PASSWORD,SMPT_HOST,SMPT_PORT} from "../config/index.js"

export const sendEmail = async(options) =>{

    const transporter = nodeMailer.createTransport({
        service:SMPT_SERVICE,
        host: SMPT_HOST,
        port:SMPT_PORT,
        secure: false,
        auth:{
            user:SMPT_MAIL,
            pass:SMPT_PASSWORD
        }
    })
    const mailOptions = {
        from:SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    await transporter.sendMail(mailOptions)
}