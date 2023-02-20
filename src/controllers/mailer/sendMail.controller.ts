import { Request, Response } from 'express'
import nodemailer from 'nodemailer'
import config from 'config'
export class SendMail {
    static SendMailForgotPassword = async (data: any) => {
        console.log(data)
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: config.get<string>('MAIL_APP'),
                pass: config.get<string>('MAIL_APP_PASSWORD'), // generated ethereal password
            },
        })

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"ADMIN" <dtramuyen@gmail.com>', // sender address
            to: data.email, // list of receivers
            subject: 'New Password', // Subject line
            text: data.randomNewPasword, // plain text body
            html: `<b>New Password is:  ${data.randomNewPasword} </b>`, // html body
        })
        // console.log('check forgot pass:', data.randomNewPassword)
        return info
    }
}
