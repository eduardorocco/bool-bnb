const express = require('express');
const nodemailer = require('nodemailer');
const validator = require('validator');
const connection = require('../data/db');
const sql = require('mysql2')

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

router.get('/:id', async (req, res) => {

    const mittente_id = req.params.id;

    const destinatario_id = req.query.destinatario_id;

    const sql = `SELECT * FROM bnb_db.messages WHERE mittente_id = ? AND destinatario_id = ?`;

    connection.query(sql, [mittente_id, destinatario_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: 'fail', message: "Errore nel recupero dei messaggi" });
        }
        return res.status(200).json(result);
    })
})

// API per inviare email
router.post('/', async (req, res) => {
    try {

        let { name, email, message, recipient, mittente, destinatario } = req.body;
        if (name) {

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

            const sql = `INSERT INTO messages (mittente_id, destinatario_id, message) VALUES (?, ?, ?)`;

            connection.query(sql, [mittente, destinatario, message], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ status: 'fail', message: "Errore nell'invio del messaggio" });
                }
            })

            return res.status(200).json({ status: 'success', message: 'Email inviata con successo!' });
        } else {

            const sql = `INSERT INTO messages (mittente_id, destinatario_id, message) VALUES (?, ?, ?)`;

            connection.query(sql, [mittente, destinatario, message], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ status: 'fail', message: "Errore nell'invio del messaggio" });
                }
            })

            return res.status(200).json({ status: 'success', message: 'Messaggio inviato con successo!' });

        }
    } catch (error) {
        console.error("Errore nell'invio dell'email:", error);
        return res.status(500).json({ status: 'fail', message: "Errore nell'invio dell'email" });
    }
});

module.exports = router