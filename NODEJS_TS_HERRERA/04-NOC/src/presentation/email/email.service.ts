import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'

interface SendEmailOptions{
    to: string
    subject: string
    htmlBody: string
    //TODO:attachments
}

export class EmailService{
    private transporter= nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    async sendEmail(options: SendEmailOptions): Promise<boolean>{

        const {to, subject,htmlBody} = options

            try {

                const sentInformation = await this.transporter.sendMail({
                    to,
                    subject,
                    html: htmlBody
                })

                console.log(sentInformation)

                return true
            } catch (error) {

                console.log(error)
             
                return false
            }
    }
}