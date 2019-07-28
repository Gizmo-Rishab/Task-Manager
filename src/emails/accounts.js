const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rishabarora2008@gmail.com',
        subject: 'Welcome!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rishabarora2008@gmail.com',
        subject: 'Goodbye!',
        text: `Hello, ${name}. Let me know how we could keep you around.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}