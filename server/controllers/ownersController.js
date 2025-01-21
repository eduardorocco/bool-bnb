const connection = require('../data/db');
const sql = require('mysql2')

function show(req, res) {

    const id = req.params.id

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message })
        if (results.length === 0)
            return res.status(404).json({
                error: 'Not Found',
                message: 'Owner not found',
            })

        
        // movie.image = `http://localhost:3000/movies_cover/${movie.image}`

        const sql = `SELECT * FROM owners WHERE id = ?`

        connection.query(sql, [id], (err, results) => {
            if (err) return res.status(500).json({ message: err.message })
            res.json(results)
        })

    })
}


function storeOwner(req, res) {

    const {
        name,
        surname,
        email,
        number,
        username,
        password
    } = req.body

    if (
        !name ||
        !surname ||
        !number ||
        number.length !== 10 ||
        !email ||
        !username ||
        !password
    ) {
        return res.status(400).json({ message: 'Invalid data' })
    }

    const sql = `INSERT INTO owners (name, surname, email, number, username, password) VALUES (?, ?, ?, ?, ?, ?)`

    connection.query(sql, [name, surname, email, number, username, password], (err, results) => {
        if (err) return res.status(500).json({ message: err.message })
        res.status(201).json({ message: 'Owner created' })
    })
}
module.exports = {show, storeOwner}