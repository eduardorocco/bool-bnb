const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorsHandler')
const connection = require('.data/db')

app.use(cors())

app.use(express.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Server active')
})

app.use(notFound)

app.use(errorHandler)



app.listen(PORT,(req, res)=>{
    console.log('server running');
})