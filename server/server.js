const express = require('express')
const app = express()
const PORT = process.env.PORT
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorsHandler')
const propertiesRouter = require('./routers/bnbRouter')
const usersRouter = require('./routers/usersRouter')
const uploadRouter = require('./routers/uploadRouter')
const cors = require('cors')
const fileUpload = require('express-fileupload')


app.use(express.json())
app.use(fileUpload())

app.use(cors())

app.use(express.static('public'))
app.use(express.static('uploads'))

app.get('/', (req, res) => {
    res.send('Server active')
})

app.use('/properties', propertiesRouter)

app.use('/users', usersRouter)

app.use('/api', uploadRouter)

app.use(notFound)

app.use(errorHandler)


app.listen(PORT, (req, res) => {
    console.log('server running');
})