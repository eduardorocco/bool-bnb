function uploadImage(req, res) {

    if (req.files === null || Object.keys(req.files).length === 0) return res.status(400).json({ message: 'Nessun file caricato' })

    const imageFile = req.files.image
    const uploadPath = './public/img'
    const imageFileFinalPath = uploadPath + "/" + imageFile.name
    console.log(imageFile)

    imageFile.mv(imageFileFinalPath, (err) => {
        if (err) {
            res.status(500)
            res.send('Errore spostamento immagine' + imageFile.name)
            return
        }

        res.send('File Uploaded')
    })
    console.log('Percorso di destinazione:', imageFileFinalPath);

    console.log(imageFileFinalPath)

    console.log(imageFile)
}

module.exports = { uploadImage }