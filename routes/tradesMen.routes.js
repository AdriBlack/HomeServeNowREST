const express = require('express')
const controllers = require('../controllers')
const router = express.Router();

router.get('/tradesmen', controllers.tradesmen.readAll)

module.exports = router;