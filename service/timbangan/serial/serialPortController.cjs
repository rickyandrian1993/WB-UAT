const { SerialPort, ReadlineParser } = require('serialport')
const { error500, success200 } = require('../constants/responseCallback.cjs')
const pool = require('../dbconfig.cjs')
const logToFile = require('../utility/logger.js')

const GetWeight = (callback) => {
  let isOpen = true
  GetConnectionOptions((res) => {
    if (res.status === 200) {
      try {
        const port = new SerialPort({
          baudRate: res.data.baudrate,
          dataBits: res.data.databits,
          stopBits: res.data.stopbits,
          parity: res.data.parity,
          path: res.data.path
        })

        const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
        port.on('open', () => console.log('Port Open'))
        parser.on('data', (data) => {
          console.log(data)
          logToFile(`data raw timbangan: ${data}`)
          try {
            if (data && isOpen && data.match('kg')) {
              let response = data.substring(0, data.indexOf('kg'))
              response = response.trim()
              response = response.substring(response.lastIndexOf(' '))
              logToFile(`data proses timbangan: ${response}`)

              isOpen = false
              callback({ ...success200, message: 'Response Timbangan.', data: +response })
            }
          } catch (error) {
            isOpen = false
            callback({ ...error500, data: 0 })
          }
          port.close(() => console.log('Port close'))
        })
      } catch (error) {
        console.log('Error read serial port: ', error)
        logToFile(`Error read serial port: ${error}`)
        callback({ ...error500, data: 0 })
      }
    } else callback({ ...error500, data: 'Failed get connection options.' })
  })
}

const GetConnectionOptions = (callback) => {
  const connOptionsQuery = 'SELECT baudrate, databits, stopbits, parity, path FROM serialport'

  pool
    .query(connOptionsQuery)
    .then((res) => callback({ ...success200, data: res.rows[0] }))
    .catch((error) => callback({ ...error500, data: error }))
}

module.exports = { GetWeight, GetConnectionOptions }
