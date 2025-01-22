const connection = require('../data/db');

//index properties
function index(req, res) {
    let sql = 'SELECT properties.*, AVG(reviews.vote) AS avg_vote FROM properties JOIN reviews ON properties.id = reviews.property_id'


    if (req.query.search) {
        sql += ` WHERE address LIKE '%${req.query.search}%' `
        //   OR room LIKE '%${req.query.search}%' 
        //   OR toilet LIKE '%${req.query.search}%`
        // sql += `WHERE title LIKE '%${req.query.search}%'`
    }

    sql += ' GROUP BY properties.id ORDER BY properties.heart DESC'

    connection.query(sql, (err, properties) => {
        if (err) {
            res.status(500).json({ message: err.message })
            return
        }


        res.json(properties)
    })

    console.log(sql);
}


//show property
function show(req, res) {

    const id = req.params.id


    const sql = `SELECT properties.*, AVG(vote) AS avg_vote 
		FROM properties
		JOIN reviews
		ON properties.id = reviews.property_id 
		WHERE properties.id = ?
		GROUP BY properties.id
    `

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message })
        if (results.length === 0)
            return res.status(404).json({
                error: 'Not Found',
                message: 'Property not found',
            })

        const property = results[0]
        // movie.image = `http://localhost:3000/movies_cover/${movie.image}`

        const sql = `SELECT * FROM reviews WHERE property_id = ?`

        connection.query(sql, [id], (err, results) => {
            if (err) return res.status(500).json({ message: err.message })

            property.reviews = results
            res.json(property)
        })

    })
}

function storeProperty(req, res) {

    const owner_id = req.params.id

    const {
        title,
        description,
        room,
        bed,
        toilet,
        square_meter,
        address,
        image,
        type
    } = req.body

    //FARE IL CONTROLLO
    // if (
    //     !name ||
    //     !vote ||
    //     isNaN(intVote) ||
    //     intVote < 0 ||
    //     intVote > 5 ||
    //     name?.length > 255 ||
    //     typeof text !== 'string'
    // ) {
    //     return res.status(400).json({ message: 'Invalid data' })
    // }

    const sql = `INSERT INTO properties (
        owner_id,
        title,
        description,
        room,
        bed,
        toilet,
        square_meter,
        address,
        image,
        type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    connection.query(sql, [
        owner_id,
        title,
        description,
        room,
        bed,
        toilet,
        square_meter,
        address,
        image,
        type
    ], (err, results) => {
        if (err) return res.status(500).json({ message: err.message })
        res.status(201).json({ message: 'Property created' })
    })
}

function storeReview(req, res) {
    const property_id = req.params.id
    const {
        user,
        title,
        text,
        days_of_stays,
        vote
    } = req.body

    if (
        !user ||
        !title ||
        !days_of_stays ||
        !vote
    ) {
        return res.status(400).json({ message: 'Invalid data' })
    }

    const sql = `INSERT INTO reviews (property_id, user, title, text, days_of_stays, vote) VALUES (?, ?, ?, ?, ?, ?)`

    connection.query(sql, [
        property_id,
        user,
        title,
        text,
        days_of_stays,
        vote], (err, results) => {
            if (err) return res.status(500).json({ message: err.message })
            res.status(201).json({ message: 'Review created' })
        })

}


function modifyHeart(req, res) {

    const id = req.params.id

    let heart = 0

    let sql = `SELECT properties.heart FROM properties WHERE id = ?`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message })
        heart = parseInt(results[0].heart) + 1
        // console.log(results[0].heart, heart);
        sql = `UPDATE bnb_db.properties SET heart = ${heart} WHERE (id = ${id})`
        connection.query(sql, (err, results) => {
            if (err) return res.status(500).json({ message: err.message })
            res.status(203).json({ message: 'Added heart' })
        })


    })
}
module.exports = { index, show, storeProperty, storeReview, modifyHeart }