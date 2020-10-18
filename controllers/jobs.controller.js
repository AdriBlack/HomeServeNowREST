const jobsService = require('../services/jobs.service')

const create = (req, res) => {
    return jobsService.create(req.body)
    .then((job) => {
        return res.status(200).send(job)
    })
    .catch((error) => {
        console.log(`${error}: Failed to create new job`)
        res.status(400).send(`${error}: Failed to create new job`)
    })
}

module.exports = {
    create
}