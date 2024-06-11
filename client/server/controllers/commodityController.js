import { success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'
import { logToFile } from '../utility/logger.js'

export const CommodityList = async () => {
  const commodityListQuery = `SELECT * FROM commodity group by cd, group_category order by group_category desc, cd asc`
  try {
    await pool.query('BEGIN')
    const res = await pool.query(commodityListQuery)
    await pool.query('COMMIT')
    return res.rows
  } catch (err) {
    await pool.query('ROLLBACK')
    logToFile(`===Commodity List Controller Error===: ${err}`)
  }
}

const InsertCommodity = (data, callback) => {
  let value = ''
  data.forEach((item) => {
    value += `(
        '${item.commodity_cd}',
        '${item.commodity_nm}',
        ${item.tracking_code ? `'${item.tracking_code}'` : null},
        '${item.MtCommodityCatgoodsCd}'
      ),`
  })

  value = value.substring(0, value.length - 1)

  let query = `
    INSERT INTO commodity (cd, name, transaction_code, group_category) VALUES ${value}
    on conflict (cd) do
    UPDATE SET 
      cd = excluded.cd,
      name = excluded.name,
      transaction_code = excluded.transaction_code,
      group_category = excluded.group_category;`

  pool
    .query(query)
    .then(() => callback({ ...success200, data: 'Berhasil menambahkan commodity.' }))
    .catch((error) => {
      logToFile(`Error insert commodity: ${error}}`)
      logToFile(`Error insert commodity: ${query}}`)
    })
}

export { InsertCommodity }
