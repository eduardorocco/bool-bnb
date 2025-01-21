const connection = require('../data/db');

//index properties
function index(req, res) {
    const sql = `SELECT * FROM properties`
    connection.query(sql, (err, properties) => {
        if(err){
            res.status(500).json({message: err.message})
            return
        }
        res.json(properties)
    })

}

function show(req, res){

}

function post(req, res){

}

module.exports = { index }