import fp from "fastify-plugin";
import nodemailer from "nodemailer"

//This plugin is used for sending e-mails to users who requested to reset their password
const Mailer = {
    sendMail:async (emailData : any) => {
        if(!emailData.receiver) {
            return "User not found"
        }
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            },
        });
        let info = await transporter.sendMail({
            from: emailData.sender,
            to: emailData.receiver,
            subject: "Password reset",
            text: emailData.text,
            html: `<b>${emailData.text}</b>`
        })

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return "Message sent successfuly"
    }
}

export default fp((fastify, opts, done) => {
    fastify.decorate("mailer", Mailer)
    fastify.decorate("sendMail", Mailer.sendMail)
    done();
})