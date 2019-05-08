require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer')
const app = express()
app.use(express.static(`${__dirname}/../public/`))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const { SERVER_PORT, MAIL_USER, MAIL_PASSWORD, FROM, TO} = process.env
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD
    }
})


app.post('/api/email', (req, res) => {
    console.log (req.body)
    const { name, message, email } = req.body
    console.log(name, message, email)
    const mailOptions = {
        from: FROM,
        to: TO,
        subject: `ALERT: email from ${name}`,
        text: `from: ${email}, message: ${message}`

    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.status(500).send(error.message)
        }
        else {
            console.log(info)
            res.sendStatus(200)
        }
    })
})

app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`))

