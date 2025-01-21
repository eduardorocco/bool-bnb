const express = require('express')
const app = express()
const PORT = 3000
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorsHandler')
const router = require('./routers/bnbRouter')


app.use(express.json())

app.use(express.static('public'))

app.use('/properties', router)
app.get('/', (req, res) => {
    res.send('Server active')
})

app.use(notFound)

app.use(errorHandler)


app.listen(PORT,(req, res)=>{
    console.log('server running');
})