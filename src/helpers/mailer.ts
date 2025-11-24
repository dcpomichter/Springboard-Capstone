import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { Client, SendEmailV3_1, LibraryResponse } from 'node-mailjet';

const mailjet = new Client({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE
});


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

        const data: SendEmailV3_1.Body = {
            Messages: [
                {
                    From: {
                        Email: "admin@boardbums.vercel.app",
                    },
                    To: [
                        {
                            Email: email,
                        },
                    ],
                    TemplateErrorReporting: {
                        Email: 'reporter@boardbums.vercel.app',
                        Name: 'Reporter',
                    },
                    Subject: emailType === "VERIFY" ? "Verify your Email" : "Reset your Password",
                    HTMLPart: emailType === "VERIFY" ?
                        `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to Verify your Email or copy and paste the link below into your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
                        :
                        `<p>Click <a href="${process.env.DOMAIN}/reset?token=${hashedToken}">here</a> to Reset your Password or copy and paste the link below into your browser. <br> ${process.env.DOMAIN}/reset?token=${hashedToken}</p>`,
                    TextPart: emailType === "VERIFY" ?
                        `Click here to Verify your Email or copy and paste the link below into your browser. ${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
                        :
                        `Click here to Reset your Password or copy and paste the link below into your browser. ${process.env.DOMAIN}/reset?token=${hashedToken}`,
                },
            ],
        };

        const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet
            .post('send', { version: 'v3.1' })
            .request(data);

        const { Status } = result.body.Messages[0];

        return result

    }
    catch (error: any) {
        throw new Error(error.message)
    }
}
