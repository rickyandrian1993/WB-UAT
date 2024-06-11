import { uid } from 'uid'
import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'
import { logToFile } from '../utility/logger.js'

const generateTicketNumber = async (commodity, callback) => {
  try {
    getCommodityCode(commodity, (com) => {
      const queryLatest = 'SELECT * FROM ticket_numbers'
      execQuery(queryLatest, (res) => {
        const data = res[0]
        const generateTicket =
          com[0].transaction_code === null
            ? data.running_num
            : `${com[0].transaction_code}-${data.running_num}`
        callback({ number: data.running_num, ticket_num: generateTicket })
        let number = parseInt(data.running_num) + 1
        const queryUpdate = `
        UPDATE ticket_numbers 
        SET running_num = '${number}'
        WHERE transaction_code = 'all'
      `
        execQuery(queryUpdate, () => {})
      })
    })
  } catch (err) {
    logToFile(`===ERROR GENERATE TICKET NUMBER===: ${err}`)
    throw err
  }
}

const getCommodityCode = (commodity, callback) => {
  const query = `SELECT transaction_code FROM commodity WHERE cd = '${commodity}' limit 1`
  execQuery(query, (res) => callback(res))
}

const syncTicketNumber = (data, callback) => {
  getLatestNo(data.tracking_no, (res) => {
    callback({ ...success200, data: res })
  })
}

const getLatestNo = (number, callback) => {
  const queryGetLatest = `SELECT * FROM ticket_numbers`
  execQuery(queryGetLatest, (res) => {
    if (res.length === 0) insertInitialData('all', number)
    else {
      const lastestNo = res[0].running_num
      if (number > lastestNo) {
        // UPDATE TICKET NUMBER TO LATEST
        let newNumber = parseInt(number) + 1
        const queryUpdateTicketNumber = `
          UPDATE ticket_numbers 
          SET running_num = '${newNumber}'
          WHERE transaction_code = 'all'`
        execQuery(queryUpdateTicketNumber, () => {})
      }
    }
    callback()
  })
}

const insertInitialData = (transaction_code = 'all', running_num = '') => {
  let initialNum = ''
  const yearCode = new Date().getFullYear().toString().substr(-2)

  if (running_num === null) initialNum = `${yearCode}000001`
  else {
    const yearCodeTemp = running_num.substring(0, 2)
    if (yearCodeTemp !== yearCode) initialNum = `${yearCode}000001`
    else {
      const numberTemp = parseInt(running_num.substring(2, 8)) + 1
      const result = String(numberTemp).padStart(6, '0')
      initialNum = `${yearCodeTemp}${result}`
    }
  }

  const query = `
    INSERT INTO ticket_numbers (cd, transaction_code, running_num) 
    VALUES ('${uid(32)}', '${transaction_code}', '${initialNum}')`

  execQuery(query, () => {})
}

const execQuery = (query, callback) => {
  pool
    .query(query)
    .then((res) => callback(res.rows))
    .catch((err) => {
      callback({ ...error500, data: `Error query: ${query}` })
      logToFile(`Error: ${err}`)
      logToFile(`Error: ${query}`)
    })
}

export { generateTicketNumber, syncTicketNumber }
