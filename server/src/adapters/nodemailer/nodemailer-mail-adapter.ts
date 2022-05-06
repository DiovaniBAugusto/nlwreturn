import { MailAdapter, sendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "acf9bae19c5d7f",
      pass: "7f9aa8c13c3582"
    }
});

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: sendMailData){
        await transport.sendMail({
            from: 'Equipe teste <teste@gmail.com>',
            to: 'Diovani Bersot <diovanib.augusto@gmail.com>',
            subject,
            html: body
        });
    }
}