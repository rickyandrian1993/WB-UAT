import { deleteQuery } from '../constants/deleteAllQuery.js'
import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'
import { logToFile } from '../utility/logger.js'
import { CommodityList } from './commodityController.js'
import { CustomerList, InsertCustomer } from './customerController.js'

const GetMill = async (callback) => {
  const getMillQuery = `SELECT * FROM pcc_mill`
  const response = {}

  try {
    await pool.query('BEGIN')
    const res = await pool.query(getMillQuery)
    if (res.rowCount < 1) {
      callback({ ...success200, data: [] })
      return
    }

    const millDetail = await GetMillDetail(res.rows[0].cd)
    const customer = await CustomerList()
    const commodity = await CommodityList()

    response.mill = {
      ...res.rows[0],
      last_update: res.rows[0].last_update !== null ? Date.parse(res.rows[0].last_update) : 0
    }

    response.mill_detail = millDetail.rows
    response.customer = customer
    response.commodity = commodity
    callback({ ...success200, data: response })
    await pool.query('COMMIT')
  } catch (e) {
    await pool.query('ROLLBACK')
    callback({ ...error500, data: 'Error Get Mill' })
    logToFile(`===GetMill===: ${e}`)
  }
}

const GetMillDetail = async (cd) => {
  const queryGetMillDetail = `SELECT cd, pcc_estate_cd, pcc_estate_nm FROM pcc_mill_dtl WHERE pcc_mill_cd = '${cd}'`
  const result = pool
    .query(queryGetMillDetail)
    .catch((err) => logToFile(`Error get mill detail: ${err}`))

  return result
}

const InsertMill = (data, callback) => {
  /* Clearing all db if mill change */
  pool
    .query(deleteQuery)
    .then((_) => {
      // WBAgriSystemV2 => Password for registering fingerprint
      const insertMill = `INSERT INTO pcc_mill (cd, nm, password, kop) VALUES ('${data.cd}', '${data.nm}', 'd8a5782a57931d630fad6017435712cc', '${data.kop}')`
      pool
        .query(insertMill)
        .then((_) => InsertMillDetailData(data.mill_dtl, callback))
        .catch((error) => {
          logToFile(`Error insert mill: ${error}`)
          callback({ ...error500, data: `Error Insert Mill: ${error}` })
        })
    })
    .catch((error) => {
      logToFile(`Error delete some table: ${error}`)
      callback({ ...error500, data: `Error Delete Some Table Data: ${error}` })
    })
}

const InsertMillDetailData = (data, callback) => {
  let millDetailValueQuery = ''
  data.forEach((value) => {
    millDetailValueQuery += `(
      '${value.cd}',
      '${value.pcc_estate_cd}',
      '${value.pcc_estate_nm}',
      '${value.pcc_mill_cd}'
    ),`
  })

  millDetailValueQuery = millDetailValueQuery.substring(0, millDetailValueQuery.length - 1)

  const insertMillDetail = `
    INSERT INTO pcc_mill_dtl (
      cd,
      pcc_estate_cd,
      pcc_estate_nm,
      pcc_mill_cd
    ) VALUES ${millDetailValueQuery};`

  pool
    .query(insertMillDetail)
    .then(() =>
      callback({
        ...success200,
        message: 'Berhasil update mill dan mill detai.',
        data: 'Berhasil update mill dan mill detail.'
      })
    )
    .catch((error) => {
      logToFile(`Error insert mill detail: ${error}`)
      callback({ ...error500, data: `Error Insert Mill Detail Data: ${error}` })
    })
}

const UpdateMill = (data, callback) => {
  const { PccMill, cust, updateDate } = data
  const newDate = new Date(updateDate).toISOString()

  const updateMillQuery = `
    UPDATE pcc_mill SET last_update = '${newDate}', mill_manager = '${data.manager}', server_url = '${data.server_url}'
    WHERE cd = '${PccMill.cd}'`

  pool
    .query(updateMillQuery)
    .then((_) => {
      if (cust.length > 0) InsertCustomer(cust)
      callback({
        ...success200,
        message: 'Mill berhasil di perbaharui.',
        data: 'Mill berhasil di perbaharui.'
      })
    })
    .catch((error) => {
      logToFile(`Error update mill: ${error}`)
      callback({ ...error500, data: `Error Update Mill: ${error}` })
    })
}

export { GetMill, InsertMill, UpdateMill }
