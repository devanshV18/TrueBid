import nodeMailer from "nodemailer"

export const sendEmail = async( {emailTo, subject, message} ) => {
    
    //SETTING UP OUR TRANSPORTER
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        secure: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    })


    //configuring the sender,reciever, message and subject
    const options = {
        from: process.env.SMTP_MAIL,
        to: emailTo,
        subject: subject,
        text: message
    }

    await transporter.sendMail(options)


    
}