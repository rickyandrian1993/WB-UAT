import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'
import { logToFile } from '../utility/logger.js'

const GetConnectionOptions = (callback) => {
  const connOptionsQuery = 'SELECT baudrate, databits, stopbits, parity, path FROM serialport'

  pool
    .query(connOptionsQuery)
    .then((res) => callback({ ...success200, data: res.rows[0] }))
    .catch((error) => {
      logToFile(`Error get connection option: ${error}`)
      callback({ ...error500, data: error })
    })
}

const UpdateConnectionOptions = (data, callback) => {
  const valueConnOptions = `(
    ${data.baudrate},
    ${data.bits},
    ${data.stopbit},
    '${data.parity}',
    '${data.com}'
  )`
  const deleteConOpt = 'DELETE FROM serialport'
  const insertConnectionOptionsQuery = `INSERT INTO serialPort (baudrate, databits, stopbits, parity, path) VALUES ${valueConnOptions}`

  pool
    .query(deleteConOpt)
    .then(() => {
      pool
        .query(insertConnectionOptionsQuery)
        .then(() =>
          callback({
            ...success200,
            message: 'Data connection option telah diperbaharui.',
            data: 'Data connection option telah diperbaharui.'
          })
        )
        .catch((error) => {
          logToFile(`Error insert connection option: ${error}`)
          callback({ ...error500, data: `Error Get Connection Options: ${error}` })
        })
    })
    .catch((error) => {
      logToFile(`Error get connection options: ${error}`)
      callback({ ...error500, data: `Error Get Connection Options: ${error}` })
    })
}

export { GetConnectionOptions, UpdateConnectionOptions }
