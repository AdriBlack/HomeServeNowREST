const fs = require('fs')



const create = async (params) => {
   const { id } = params
   const tradesmen = _loadTradesmen()
   const duplicateTradesman = tradesmen.find((tradesmen) => tradesmen.id === id)
   if(!duplicateTradesman) {
      tradesmen.push({
         ...params
      })
   } else {
      console.log(' tradesman with id already exsists')
      throw new Error(`Tradesman with id:${id} already exists`)
   }
_saveTradesMen(tradesmen)
return params
}


const _loadTradesmen = () => {
   try {
       const dataBuffer = fs.readFileSync('tradesMen.json')
       const dataJson = dataBuffer.toString()
       return JSON.parse(dataJson)
   } catch (e) {
       console.log(`${e}: ERROR:Failed to load tradesMen.json`)
       return []
   }
  
}

const _saveTradesMen = (tradesmen) => {
   const dataJSON = JSON.stringify(tradesmen)
   fs.writeFileSync('tradesMen.json', dataJSON)
}

const readAll = async () => {
   const tradesmen = _loadTradesmen()
   return tradesmen
}

module.exports = {
    readAll,
    create
  }