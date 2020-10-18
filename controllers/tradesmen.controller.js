const tradesMenService = require('../services/tradesmen.service');

const readAll = (req, res) => {
    return tradesMenService.readAll()
    .then((tradesmen) => {
       return res.status(200).send(tradesmen)
    })
    .catch((error) => {
        console.log(`${error}: Failed to read all tradesmen`)
        res.status(400).send(`${error}: Failed to read all tradesmen`)
    })
}

const create = (req, res) => {
    console.log('controller body req', req.body)
    return tradesMenService.create(req.body)
    .then((tradesman) => {
        return res.status(200).send(tradesman)
    })
    .catch((error) => {
        console.log(`${error}: Failed to create new tradesman`)
        res.status(400).send(`${error}: Failed to create new tradesman`)
    })
}

module.exports = {
    readAll,
    create
  }