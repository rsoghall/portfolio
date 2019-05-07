require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer')
const app = express()
app.use(express.static(`${__dirname}/../public/`))
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
    const { name, message, from, subject } = req.body
    const mailOptions = {
        from: FROM,
        to: TO,
        subject: `ALERT: email from ${name}`,
        text: `from: ${from}, subject: ${subject}, message: ${message}`

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

