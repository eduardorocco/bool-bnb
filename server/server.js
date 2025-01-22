const express = require('express')
const app = express()
const PORT = process.env.PORT
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorsHandler')
const propertiesRouter = require('./routers/bnbRouter')
const ownerRouter = require('./routers/ownerRouter')
const cors = require('cors')

app.use(express.json())

app.use(cors())

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Server active')
})

app.use('/properties', propertiesRouter)

app.use('/owners', ownerRouter)

app.use(notFound)

app.use(errorHandler)


app.listen(PORT, (req, res) => {
    console.log('server running');
})