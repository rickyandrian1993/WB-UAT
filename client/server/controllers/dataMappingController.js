import { success200 } from '../constants/responseCallback.js'
import { FindEstate, FindEstateLevel } from './estateController.js'
import { FindDriver, FindLoader } from './workerController.js'

const MappingData = async (data, callback) => {
  const driverData = new Promise((resolve) => {
    FindDriver(data, (res) => {
      resolve(res)
    })
  })

  const estateData = new Promise((resolve) => {
    FindEstate(data, (res) => {
      resolve(res)
    })
  })

  const estateLevelData = new Promise((resolve) => {
    FindEstateLevel(data, (res) => {
      resolve(res)
    })
  })

  const loaderData = new Promise((resolve) => {
    FindLoader(data, (res) => {
      resolve(res)
    })
  })

  Promise.all([driverData, estateData, estateLevelData, loaderData]).then((result) => {
    callback({
      ...success200,
      data: {
        driver: result[0],
        estate: result[1],
        estate_level: result[2],
        loader: result[3]
      }
    })
  })
}

export { MappingData }
