const connection = require('../data/db');

//index properties
function index(req, res) {
    let sql = `SELECT properties.*, AVG(reviews.vote) AS avg_vote FROM properties
                JOIN reviews ON properties.id = reviews.property_id
                GROUP BY properties.id`

    // if (req.query.search) {
    //     // sql += `WHERE title LIKE '%${req.query.search}%' 
    //     //  OR room LIKE '%${req.query.search}%' 
    //     //  OR toilet LIKE '%${req.query.search}%`
    //      sql += `WHERE title LIKE '%${req.query.search}%'`
    // }


    connection.query(sql, (err, properties) => {
        if (err) {
            res.status(500).json({ message: err.message })
            return
        }


        res.json(properties)
    })

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
        type,
        heart
    } = req.body

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

    const sql = `INSERT INTO reviews (
        owner_id,
        title,
        description,
        room,
        bed,
        toilet,
        square_meter,
        address,
        image,
        type,
        heart) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

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
        type,
        heart], (err, results) => {
            if (err) return res.status(500).json({ message: err.message })
            res.status(201).json({ message: 'Property created' })
        })
}

module.exports = { index, show, storeProperty }