const express = require('express')
const app = express()
const PORT = 3000
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorsHandler')
const propertiesRouter = require('./routers/bnbRouter')
const ownerRouter = require('./routers/ownerRouter')

app.use(express.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Server active')
})

app.use('/properties', propertiesRouter)



app.use('/owners', ownerRouter)

app.use(notFound)

app.use(errorHandler)


app.listen(PORT,(req, res)=>{
    console.log('server running');
})