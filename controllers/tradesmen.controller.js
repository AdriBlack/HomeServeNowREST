const tradesMenService = require('../services/tradesmen.service');

const readAll = (req, res) => {
    return tradesMenService.readAll()
    .then((tradesmen) => {
       return res.status(200).send(tradesmen)
    })
    .catch(error => {
        console.log(`${error}: Failed to read all tradesmen`)
        res.status(400).send({error: 'Failed to readAll tradesmen'})
    })
}

module.exports = {
    readAll
  }