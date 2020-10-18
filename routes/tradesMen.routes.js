const express = require('express')
const controllers = require('../controllers')
const router = express.Router();

router.get('/tradesmen', controllers.tradesmen.readAll)
router.post('/tradesmen', controllers.tradesmen.create)

module.exports = router;