const express = require('express');
const nodemailer = require('nodemailer');
const validator = require('validator');

const router = express.Router();

// Configura il trasporto SMTP con Mailtrap
const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    },
});

// Verifica la connessione con Mailtrap
transporter.verify((error, success) => {
    if (error) {
        console.error('Errore nel collegamento SMTP:', error);
    } else {
        console.log('Server pronto per inviare email');
    }
});

// API per inviare email
router.post('/', async (req, res) => {
    try {
        let { name, email, message, recipient } = req.body;

        // Sanificazione e validazione dei dati
        if (!name || !email || !message || !recipient) {
            return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Email non valida' });
        }

        // Prevenzione Email Header Injection
        name = validator.escape(name);
        email = validator.escape(email);
        message = validator.escape(message);

        // Configurazione dell'email
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: recipient,
            subject: 'Nuovo Messaggio dal Form di Contatto DI BOOL-BNB',
            text: `${message}`,
        };

        // Invio email
        await transporter.sendMail(mailOptions);
        transporter.sendMail({
            from: process.env.BOOL_BNB_MAIL,
            to: email,
            subject: "Mail inviata correttamente",
            text: `Grazie di aver usato BOOL-BNB`
        }, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });

        return res.status(200).json({ status: 'success', message: 'Email inviata con successo!' });
    } catch (error) {
        console.error("Errore nell'invio dell'email:", error);
        return res.status(500).json({ status: 'fail', message: "Errore nell'invio dell'email" });
    }
});

module.exports = router