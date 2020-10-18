const express = require('express')
const path = require('path')
const _ = require('lodash')
const bodyParser = require('body-parser')
const fs = require('fs')

const routes = require('./routes')

const tradesmen = require('./tradesMen.json')

const app = express()
const port = 5000

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


const loadTradesmen = () => {
    try {
        const dataBuffer = fs.readFileSync('tradesMen.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        console.log(`${e}: ERROR:Failed to load tradesMen.json`)
        return []
    }
   
}

const saveTradesMen = (tradesmen) => {
    const dataJSON = JSON.stringify(tradesmen)
    fs.writeFileSync('tradesMen.json', dataJSON)
}

app.get('/tradesmen', routes.tradesmen);
app.post('/tradesmen', (req, res) => {
    const { id } = req.body
    const tradesmen = loadTradesmen()
    const duplicateTradesman = tradesmen.find((tradesman) => tradesman.id === id)
    if (!duplicateTradesman) {
        tradesmen.push({
         ...req.body
        })
    }
    saveTradesMen(tradesmen)
    tradesmen.push(req.body)
res.send(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})