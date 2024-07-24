const express = require('express')
const path = require('path');
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
const port = 8080

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/data/return', (req, res) => {
    read = JSON.parse(fs.readFileSync('words.json'))
    res.json(read)
})

app.post('/data/update', bodyParser.json(), (req,res) => {
    fs.writeFileSync("words.json", JSON.stringify(req.body), (error) => {
    if (error) {
        console.error(error);
        throw error;
    }});
    res.status(200)
})

app.listen(port, '159.89.120.211', () => {
    console.log(`Example app listening on port ${port}`)
})