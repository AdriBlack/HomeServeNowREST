const tradesMenController = require('./tradesmen.controller');
const jobsController = require('./jobs.controller')
module.exports = {
    tradesmen: tradesMenController,
    jobs: jobsController
}