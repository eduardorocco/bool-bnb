const express = require('express')
const app = express()
const PORT = process.env.PORT
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorsHandler')
const propertiesRouter = require('./routers/bnbRouter')
const usersRouter = require('./routers/usersRouter')
const sendEmailRouter = require('./routers/sendEmailRouter')
const rateLimit = require('express-rate-limit');
const uploadRouter = require('./routers/uploadRouter')
const cors = require('cors')
const fileUpload = require('express-fileupload')

app.use(cors({
    origin: "http://localhost:5173"
}))


app.use(express.json())
app.use(fileUpload())

// Limita il numero di richieste per prevenire spam (max 5 richieste ogni 10 minuti)
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minuti
    max: 5, // Max 5 richieste per IP
    message: 'Troppi tentativi, riprova più tardi.',
});
app.use('/send', limiter);

app.use(express.static('public'))
app.use(express.static('uploads'))

app.get('/', (req, res) => {
    res.send('Server active')
})

app.use('/properties', propertiesRouter)

app.use('/users', usersRouter)

app.use('/send', sendEmailRouter);

app.use('/api', uploadRouter)

app.use(notFound)

app.use(errorHandler)


app.listen(PORT, (req, res) => {
    console.log('server running');
})