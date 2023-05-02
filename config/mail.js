const sgMail = require('@sendgrid/mail')

const SENDGRID_API_KEY = "";

const sendMail = (to, from, subject, text, html) => {
    sgMail.setApiKey(SENDGRID_API_KEY)
    const data = {
        // to:  // Change to your recipient
        // from: // Change to your verified sender
        // subject: 'Sending with SendGrid is Fun',
        // text: 'and easy to do anywhere, even with Node.js',
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        to: to,
        from: {
            name: 'One Stop Shop',
            email:'suganthibwt@gmail.com'
        },
        subject: subject,
        text: text,
        html: html

    }
    console.log(data);
    sgMail
        .send(data)
        .then(() => {
            console.log('Email sent')
            count = 1;
        })
        .catch((error) => {
            console.error(error)
            count = 0;
        })

    if (count = 1) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    sendMail
} 