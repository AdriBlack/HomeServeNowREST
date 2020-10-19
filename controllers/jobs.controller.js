const axios = require('axios')
const jobsService = require('../services/jobs.service')
const tradesmenService = require('../services/tradesmen.service')

const create = (req, res) => {
    return jobsService.create(req.body)
        .then((job) => {
            return tradesmenService.readAll()
            .then(tradesmenArr => {
                return jobsService.createJobsWithTradesmenCloseby(job, tradesmenArr)
                .then(jobWithTradesmen => {
                    return res.status(200).send(jobWithTradesmen)
                })
            })
            .catch(error => {
                console.log(`${error}: Failed to get all tradesmen`)
                res.status(400).send(`${error}: Failed to get all tradesmen`)
            })
        })
        .catch((error) => {
            console.log(`${error}: Failed to create new job`)
            res.status(400).send(`${error}: Failed to create new job`)
        })
}

const readAll = (req, res) => {
    return jobsService.readJobs()
    .then((jobs) => {
        return res.status(200).send(jobs)
    })
    .catch((error) => {
        console.log(`${error}: Failed to read all jobs`)
        res.status(400).send(`${error}: Failed to read all jobs`)
    })
}

const getJobClaimsWithNearByTradesmen = (req, res) => {
   return jobsService.getClaimsByJobAndLocation()
   .then((jobAndLocationArr) => {
       return tradesmenService.readAll()
       .then((tradesmenArr) => {
           return jobsService.getJobClaimsWithNearByTradesmen(jobAndLocationArr, tradesmenArr)
               .then((jobs) => {
                   console.log('TAH DAH', jobs)
                   return res.status(200).send(jobs)
               })
               .catch((error) => {
                console.log(`${error}: Failed to get jobs array with tradesmen`)
                res.status(400).send(`${error}: Failed to get jobs array with tradesmen`)
               })
       })
       .catch((error) => {
        console.log(`${error}: Failed to get tradesmen`)
        res.status(400).send(`${error}: Failed to get tradesmen`)
       })
   })
   .catch((error) => {
    console.log(`${error}: Failed  to get claims from API`)
    res.status(400).send(`${error}: Failed  to get claims from API`)
   })
}

module.exports = {
    create,
    readAll,
    getJobClaimsWithNearByTradesmen
}