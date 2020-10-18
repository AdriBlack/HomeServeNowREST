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

 module.exports = {
     create
 }