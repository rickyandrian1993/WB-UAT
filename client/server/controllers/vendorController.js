import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'
import { logToFile } from '../utility/logger.js'

const GetVendor = (req, callback) => {
  const { estateList } = req.body
  const queryGetVendor = `
    SELECT cd, nm FROM mt_vndr_rent_vhcle 
    WHERE pcc_estate_cd in (${estateList.map((data) => `'${data.estateCd.toString()}'`)})
    ORDER BY nm`

  pool
    .query(queryGetVendor)
    .then((res) => callback({ ...success200, data: res.rows }))
    .catch((error) => {
      logToFile(`Error get vendor: ${error}`)
      callback({ ...error500, data: error })
    })
}

const InsertVendor = (data, callback) => {
  let valueInsertVendor = ''
  data.forEach((value) => {
    if (value.is_delete === 'N' && value.is_inactive === 'N' && value.pcc_estate_cd !== null)
      valueInsertVendor += `(
        '${value.cd}',
        '${value.nm}',
        '${value.pcc_estate_cd}'
      ),`
  })

  valueInsertVendor = valueInsertVendor.substring(0, valueInsertVendor.length - 1)

  let insertVendorQuery = `INSERT INTO mt_vndr_rent_vhcle (
    cd, 
    nm, 
    pcc_estate_cd
  ) VALUES ${valueInsertVendor}
  on conflict (cd) do 
  UPDATE SET
    cd = excluded.cd,
    nm = excluded.nm, 
    pcc_estate_cd = excluded.pcc_estate_cd;`

  pool
    .query(insertVendorQuery)
    .then((_) => callback({ ...success200, data: 'Berhasil menambahkan vendor.' }))
    .catch((error) => {
      logToFile(`Error insert vendor: ${error}`)
      callback({ ...error500, data: `Error Insert Vendor: ${error}` })
    })
}

export { GetVendor, InsertVendor }
