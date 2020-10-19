const express = require('express')
const controllers = require('../controllers')
const router = express.Router();

router.post('/jobs', controllers.jobs.create)
router.get('/jobs', controllers.jobs.readAll)
router.get('/jobsTrade', controllers.jobs.getJobClaimsWithNearByTradesmen)

module.exports = router