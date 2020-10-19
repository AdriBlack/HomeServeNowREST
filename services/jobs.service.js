const axios = require('axios')
const fs = require('fs')

const create = async(params) => {
    const { id } = params
    const jobs = _loadJobs()
    const duplicateJob = jobs.find((job) => job.id === id)
    if(!duplicateJob) {
        jobs.push({
            ...params
        })
    } else {
        console.log('job already exists')
        throw new Error(`Job with id: ${id} already exists`)
    }
    _saveJobs(jobs)
    return params
}

const createJobsWithTradesmenCloseby = async (job, tradesmenArry) => {
    const jobLocationObj = job.location
    const tradesmenDistanceArr = []
    tradesmenArry.map(tradesman => {
        const tradesmanLocationObj = tradesman.location
        const latDiff = jobLocationObj.lat - tradesmanLocationObj.lat
        const longDiff = jobLocationObj.long - tradesmanLocationObj.long
        const distanceSquared = Math.pow(latDiff, 2) + Math.pow(longDiff, 2)
        const distance = Math.sqrt(distanceSquared)
        const key = {
            id: tradesman.id,
            name: tradesman.name,
            distance: distance
        }
        tradesmenDistanceArr.push(key)

    })
    const sortTradesmenByDistance = tradesmenDistanceArr.sort((a, b) => {
        return a.distance - b.distance
    })
    const jobWithTradesmen = {
        ...job,
        closestTradesmen: sortTradesmenByDistance.slice(0, 3)
    }
    //Currently when saved here responses get overwritten
    // _saveJobs(jobWithTradesmen)
    return jobWithTradesmen
    
}

const _loadJobs = () => {
    try {
        const dataBuffer = fs.readFileSync('jobs.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        console.log(`${e}: ERROR:Failed to load jobs.json`)
        return []
    }
   
 }

 const _saveJobs = (jobs) => {
    const dataJSON = JSON.stringify(jobs)
    fs.writeFileSync('jobs.json', dataJSON)
 }

 const readJobs = async() => {
    const jobs = await _loadJobs()
    return jobs
 }

const getClaimsByJobAndLocation = async () => {
    try {
        const response = await axios.get('https://run.mocky.io/v3/d27b910a-4fcc-4ff6-ba34-717f9834105d')
        const claims = await response.data
        const jobsWithLocation = claims.map(job => {
            return {
                id: job['$id'],
                jobName: job['$claims'][0].claimType,
                location: job['$propertyLocation'].coords
            }

        })
        return jobsWithLocation
    } catch (error) {
        console.log(`${error} failed to get claims from api service`)
        throw new Error(error)
    }
}



 const getJobClaimsWithNearByTradesmen = (jobsAndLocationArr, tradesmenArr) => {
        jobsAndLocationArr.map((jobAndLocation) => {
        
            tradesmenArr.map((trademan) => {
                const jobLocationObj = jobAndLocation.location
                const trademanLocationObj = trademan.location
                const latDiff = jobLocationObj.latitude - trademanLocationObj.lat
                const longDiff = jobLocationObj.longitude - trademanLocationObj.long
                const distanceSquared = Math.pow(latDiff, 2) + Math.pow(longDiff, 2)
                const distance = Math.sqrt(distanceSquared)
                const tradesmenWithDistanceCalc = {
                    ...trademan,

                    distance: [jobAndLocation]
                }
                return tradesmenWithDistanceCalc
            })
        })

 }

 module.exports = {
     create,
     readJobs,
     getClaimsByJobAndLocation,
     getJobClaimsWithNearByTradesmen,
     createJobsWithTradesmenCloseby
 }