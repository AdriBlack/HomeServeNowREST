const express = require('express')
const path = require('path')
const _ = require('lodash')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
const port = 5000

app.use(bodyParser.json());

const rawdata = fs.readFileSync(path.resolve(__dirname, 'tradesMen.json'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/tradesmen', (req, res) => {
    res.send(JSON.parse(rawdata))
    
})

app.post('/tradesmen', (req, res) => {

res.send(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})