const connection = require('../data/db');
const sql = require('mysql2')

function show(req, res) {

    const key = req.params.key

    const sql = `SELECT * FROM users WHERE id = ?
        OR username = '${key}' 
        OR email = '${key}'`

    connection.query(sql, key, (err, results) => {
        if (err) return res.status(500).json({ message: err.message })

        const user = results[0]

        const sql = `SELECT * FROM properties WHERE user_id = ?`

        if (!user) return res.status(404).json({ message: 'User not found' })
        connection.query(sql, [user.id], (err, results) => {
            if (err) return res.status(500).json({ message: err.message })

            user.property = results
            res.json(user)
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

    const sql = `INSERT INTO users (name, surname, email, number, username, password) VALUES (?, ?, ?, ?, ?, ?)`

    connection.query(sql, [name, surname, email, number, username, password], (err, results) => {
        if (err) return res.status(500).json({ message: err.message })
        res.status(201).json({ message: 'User created' })
    })
}




module.exports = { show, storeOwner }