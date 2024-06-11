import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'
import { logToFile } from '../utility/logger.js'

const getVehicle = async (_, res) => {
  const getList = `SELECT cd FROM pcc_vehicle ORDER BY cd ASC`

  await pool
    .query(getList)
    .then((result) => res.json({ ...success200, data: result.rows }))
    .catch((err) => {
      logToFile(`Error get vehicle: ${err}`)
      res.status(500).json({ ...error500, data: `Error get list: ${err}` })
    })
}

const insertVehicleLocal = async (req, res) => {
  const { cd, created_by } = req.body
  const insertQuery = `
    INSERT INTO pcc_vehicle (cd, created_by)
    VALUES ('${cd}', '${created_by}')`

  await pool
    .query(insertQuery)
    .then((_) => res.json({ ...success200 }))
    .catch((err) => {
      logToFile(`Error insert vehicle: ${err}`)
      res.status(500).json({ ...error500, data: `Error insert supplier: ${err}` })
    })
}

const InsertVehicle = (data, callback) => {
  let valueInsertVehicle = ''
  data.forEach((value) => {
    valueInsertVehicle += `(
      '${value.cd}',
      '${value.created_by}',
      '${new Date(value.created_dt).toISOString()}',
      '${value.pcc_estate_cd}'
    ),`
  })

  valueInsertVehicle = valueInsertVehicle.substring(0, valueInsertVehicle.length - 1)

  let insertVehicleQuery = `
    INSERT INTO pcc_vehicle (cd,created_by, created_dt, pcc_estate_cd) VALUES ${valueInsertVehicle}
    on conflict (cd) do 
    UPDATE SET cd = excluded.cd, created_by = excluded.created_by, created_dt = excluded.created_dt, pcc_estate_cd = excluded.pcc_estate_cd;`

  pool
    .query(insertVehicleQuery)
    .then((_) => callback({ ...success200, data: 'Berhasil menambahkan kendaraan.' }))
    .catch((error) => {
      logToFile(`Error insert vehicle: ${error}`)
      callback({ ...error500, data: `Error Insert Vehicle: ${error}` })
    })
}

export { getVehicle, InsertVehicle, insertVehicleLocal }
