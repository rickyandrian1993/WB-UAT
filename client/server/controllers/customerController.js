import pool from '../dbconfig.js'
import { logToFile } from '../utility/logger.js'

export const CustomerList = async () => {
  const customerListQuery = `SELECT cd, nm FROM pcc_customer ORDER BY nm`
  try {
    await pool.query('BEGIN')
    const res = await pool.query(customerListQuery)
    await pool.query('COMMIT')
    return res.rows
  } catch (err) {
    await pool.query('ROLLBACK')
    logToFile(`===Customer List Controller Error===: ${err}`)
  }
}

const InsertCustomer = (data) => {
  let valueInsertCustomer = ''
  data.forEach((value) => {
    valueInsertCustomer += `(
        '${value.cd}',
        '${value.nm}'
      ),`
  })
  valueInsertCustomer = valueInsertCustomer.substring(0, valueInsertCustomer.length - 1)
  let insertCustomerQuery = `
    INSERT INTO pcc_customer (cd, nm) VALUES ${valueInsertCustomer}
    on conflict (cd) do 
    UPDATE SET cd = excluded.cd, nm = excluded.nm;`

  pool.query(insertCustomerQuery).catch((error) => logToFile(`Error insert customer: ${error}`))
}

export { InsertCustomer }
