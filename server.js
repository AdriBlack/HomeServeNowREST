const express = require('express')
const path = require('path')
const _ = require('lodash')
const bodyParser = require('body-parser')
const fs = require('fs')

const routes = require('./routes')
const app = express()
const port = 5000

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/tradesmen', routes.tradesmen);
app.post('/tradesmen', routes.tradesmen);

app.post('/jobs', routes.jobs);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})