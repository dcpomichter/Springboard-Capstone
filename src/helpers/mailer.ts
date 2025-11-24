import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            }, { new: true, runValidators: true })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            }, { new: true, runValidators: true })
        }


        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: `${process.env.NEXT_PUBLIC_MAILER_USER}`,
                pass: `${process.env.NEXT_PUBLIC_MAILER_PASS}`
            }
        });

        const mailOptions = {
            from: "admin@boardbums.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your Email" : "Reset your Password",
            html: emailType === "VERIFY" ?
                `<p>Click <a href="${process.env.NEXT_PUBLIC_DOMAIN}/verifyemail?token=${hashedToken}">here</a> to Verify your Email or copy and paste the link below into your browser. <br> ${process.env.NEXT_PUBLIC_DOMAIN}/verifyemail?token=${hashedToken}</p>`
                :
                `<p>Click <a href="${process.env.NEXT_PUBLIC_DOMAIN}/reset?token=${hashedToken}">here</a> to Reset your Password or copy and paste the link below into your browser. <br> ${process.env.NEXT_PUBLIC_DOMAIN}/reset?token=${hashedToken}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse

    }
    catch (error: any) {
        throw new Error(error.message)
    }
}
