# WebApp - Affitti a Breve Termine

Questo progetto, realizzato in gruppo durante il corso di specializzazione Boolean, è una web application ispirata a piattaforme come Airbnb. L’obiettivo era consolidare le competenze full-stack, costruendo sia il client che il server da zero.

## 🧰 Tecnologie utilizzate

### Frontend
- React
- Axios
- Formik (validazione e sanificazione form)
- CSS/Styled Components

### Backend
- Node.js
- Express
- Nodemailer (per email e notifiche automatiche)
- Express Router & Controller Pattern
- Middleware personalizzati per la gestione degli errori

## 🔐 Funzionalità principali

- **Autenticazione e registrazione utenti**
- **Sistema di email automatiche** (conferme, notifiche, ecc.)
- **Pagina profilo personale** con elenco delle proprie proprietà
- **Possibilità di lasciare like** alle proprietà (migliora il ranking nei risultati)
- **Filtri avanzati di ricerca** (località, numero di bagni, letti, metri quadri, ecc.)
- **Caricamento immagini** delle proprietà
- **Gestione delle proprietà**: aggiunta, modifica, eliminazione

## 📬 Email e notifiche

Il sistema invia automaticamente email all’utente in seguito a eventi chiave (es. conferma registrazione, nuova prenotazione) utilizzando **Nodemailer**.