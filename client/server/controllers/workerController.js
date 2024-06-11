import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'
import { logToFile } from '../utility/logger.js'

const FindDriver = async (data, callback) => {
  const { driver_cd, estate_cd } = data
  const findDriverQuery = `SELECT cd, nm FROM "pcc_worker" WHERE cd = '${driver_cd}' AND pcc_estate_cd = '${estate_cd}'`

  await pool
    .query(findDriverQuery)
    .then((res) => {
      if (res.rowCount === 0) callback({})
      else callback(res.rows[0])
    })
    .catch((error) => {
      logToFile(`Error find driver: ${error}`)
      callback({})
    })
}

const FindLoader = async (data, callback) => {
  const { estate_cd, loader } = data
  if (loader) {
    const findLoaderQuery = `
      SELECT cd, nm 
      FROM pcc_worker 
      WHERE cd in ('${loader[0]}', '${loader[1]}', '${loader[2]}') AND pcc_estate_cd = '${estate_cd}'
    `

    await pool
      .query(findLoaderQuery)
      .then((res) => {
        if (res.rowCount === 0) callback({})
        else {
          const loaderData = {
            loader1: res.rows.find((data) => data.cd === loader[0]) || {},
            loader2: res.rows.find((data) => data.cd === loader[1]) || {},
            loader3: res.rows.find((data) => data.cd === loader[2]) || {}
          }
          callback(loaderData)
        }
      })
      .catch((error) => {
        logToFile(`Error find loader: ${error}`)
        callback({})
      })
  } else callback({})
}

const InsertWorker = (data, callback) => {
  let valueInsertWorker = ''
  data.forEach((value) => {
    valueInsertWorker += `(
        '${value.cd}',
        '${value.pcc_estate_cd}',
        '${value.nm.replace("'", "''")}'
      ),`
  })

  valueInsertWorker = valueInsertWorker.substring(0, valueInsertWorker.length - 1)

  let insertWorkerQuery = `INSERT INTO pcc_worker (cd, pcc_estate_cd, nm) VALUES ${valueInsertWorker}
    on conflict (cd) do 
    UPDATE SET
      cd = excluded.cd,
      pcc_estate_cd = excluded.pcc_estate_cd,
      nm = excluded.nm;`

  pool
    .query(insertWorkerQuery)
    .then((_) => callback({ ...success200, data: 'Berhasil menambahkan worker.' }))
    .catch((error) => {
      logToFile(`Error insert worker: ${error}`)
      callback({ ...error500, data: `Error Insert Worker: ${error}` })
    })
}

export { FindDriver, FindLoader, InsertWorker }
