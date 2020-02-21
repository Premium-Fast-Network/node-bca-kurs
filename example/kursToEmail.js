const BCA = require('../src/bca')
const nodemailer = require('nodemailer')
const emailCredential = require('./email.json')

const sendEmail = async (res) => {
    const smtp = nodemailer.createTransport({
        host: emailCredential.host,
        port: emailCredential.port,
        secure: false, // true for 465, false for other ports
        auth: {
            user: emailCredential.username,
            pass: emailCredential.password
        }
    })

    const testSendEmail = await smtp.sendMail({
        from: emailCredential.emailfrom,
        to: emailCredential.emailto,
        subject: 'Kurs Terbaru: ' + res.check,
        text: 'Kurs #USD\n#Beli: ' + res.data.USD.buy + '\n#Jual: ' + res.data.USD.sell
    })

    console.log("Message sent: %s", testSendEmail.messageId);
}

const currency = new BCA()
currency.getCurrency()
.then(async (res) => {
    await sendEmail(res)
})
.catch((err) => {
    console.error(err)
})