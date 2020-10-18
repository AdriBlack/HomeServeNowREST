const express = require('express')
const controllers = require('../controllers')
const router = express.Router();

router.post('/jobs', controllers.jobs.create)

module.exports = router