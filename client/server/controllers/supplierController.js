import pool from '../dbconfig.js'
import { error500, success200 } from '../constants/responseCallback.js'
import { logToFile } from '../utility/logger.js'

const getSupplier = (_, res) => {
  const getListQuery = `SELECT cd, name FROM supplier ORDER BY name ASC`
  pool
    .query(getListQuery)
    .then((result) => res.json({ ...success200, data: result.rows }))
    .catch((err) => {
      logToFile(`Error get supplier: ${err}`)
      res.status(500).json({ ...error500, data: `Error get list: ${err}` })
    })
}

const addSupplier = (req, res) => {
  const { name, created_by } = req.body
  const insertQuery = `
    INSERT INTO supplier (cd, name, created_by)
    VALUES ('${name}', '${name}', '${created_by}')
    on conflict (cd) do 
    UPDATE SET cd = excluded.cd, name = excluded.name, created_by = excluded.created_by;
  `
  pool
    .query(insertQuery)
    .then((_) => res.json({ ...success200 }))
    .catch((err) => {
      logToFile(`Error insert supplier: ${err}`)
      res.status(500).json({ ...error500, data: `Error insert supplier: ${err}` })
    })
}

export { getSupplier, addSupplier }
