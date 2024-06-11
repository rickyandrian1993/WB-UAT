import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'
import { logToFile } from '../utility/logger.js'

const FindEstate = async (data, callback) => {
  const { estate_cd } = data
  const findEstateQuery = `SELECT cd, nm FROM pcc_estate WHERE cd = '${estate_cd}'`

  await pool
    .query(findEstateQuery)
    .then((res) => {
      if (res.rowCount === 0) callback({})
      else callback(res.rows[0])
    })
    .catch((error) => {
      logToFile(`Error find estate: ${error}`)
      callback({})
    })
}

const FindEstateLevel = async (data, callback) => {
  const { estate_cd, estate_level } = data

  if (estate_level) {
    const findEstateLevelQuery = `
    SELECT cd, divisi_cd, section_cd, subblock_cd 
    FROM pcc_estate_level 
    WHERE cd in ('${estate_level[0]}', '${estate_level[1]}', '${estate_level[2]}') 
      AND estate_cd = '${estate_cd}'
  `

    await pool
      .query(findEstateLevelQuery)
      .then((res) => {
        if (res.rowCount === 0) callback({})
        else {
          const estateLevelData = {
            estate_level1: res.rows.find((data) => data.cd === estate_level[0]) || {},
            estate_level2: res.rows.find((data) => data.cd === estate_level[1]) || {},
            estate_level3: res.rows.find((data) => data.cd === estate_level[2]) || {}
          }
          callback(estateLevelData)
        }
      })
      .catch((error) => {
        logToFile(`Error find estate level: ${error}`)
        callback({})
      })
  } else callback({})
}

const InsertEstate = (data, callback) => {
  let valueInsertEstate = ''
  data.forEach((value) => {
    valueInsertEstate += `(
      '${value.cd}',
      '${value.nm}',
      '${new Date(value.created_dt).toISOString()}'
    ),`
  })
  valueInsertEstate = valueInsertEstate.substring(0, valueInsertEstate.length - 1)
  const insertEstateQuery = `INSERT INTO pcc_estate (cd, nm, created_dt) VALUES ${valueInsertEstate}
    on conflict (cd) do 
    UPDATE SET
      cd = excluded.cd,
      nm = excluded.nm,
      created_dt = excluded.created_dt;`

  pool
    .query(insertEstateQuery)
    .then((_) => callback({ ...success200, data: 'Berhasil menambahkan estate.' }))
    .catch((error) => {
      logToFile(`Error insert estate: ${error}`)
      callback({ ...error500, data: `Error Insert Estate: ${error}` })
    })
}

const InsertEstateLevel = (data, callback) => {
  let valueInsertEstateLevel = ''
  data.forEach((value) => {
    valueInsertEstateLevel += `(
        '${value.cd}',
        '${value.estate_cd}',
        '${value.divisi_cd}',
        ${value.section_cd ? `'${value.section_cd}'` : null},
        ${value.subblock_cd ? `'${value.subblock_cd}'` : null},
        ${value.shelf_from ? `${value.shelf_from}` : null},
        ${value.shelf_to ? `${value.shelf_to}` : null},
        ${value.tph_from ? `${value.tph_from}` : null},
        ${value.tph_to ? `${value.tph_to}` : null},
        '${new Date(value.created_dt).toISOString()}'
      ),`
  })
  valueInsertEstateLevel = valueInsertEstateLevel.substring(0, valueInsertEstateLevel.length - 1)
  let insertEstateLevelQuery = `INSERT INTO pcc_estate_level (
      cd, 
      estate_cd, 
      divisi_cd, 
      section_cd, 
      subblock_cd, 
      shelf_from, 
      shelf_to, 
      tph_from, 
      tph_to,
      created_dt 
    ) VALUES ${valueInsertEstateLevel}
    on conflict (cd) do 
    UPDATE SET
      cd = excluded.cd,
      estate_cd = excluded.estate_cd, 
      divisi_cd = excluded.divisi_cd, 
      section_cd = excluded.section_cd, 
      subblock_cd = excluded.subblock_cd, 
      shelf_from = excluded.shelf_from, 
      shelf_to = excluded.shelf_to, 
      tph_from = excluded.tph_from, 
      tph_to = excluded.tph_to,
      created_dt = excluded.created_dt;`

  pool
    .query(insertEstateLevelQuery)
    .then((_) => callback({ ...success200, data: 'Berhasil menambahkan estate level' }))
    .catch((error) => {
      logToFile(`Error insert estate level: ${error}`)
      callback({ ...error500, data: `Error Insert Estate Level: ${error}` })
    })
}

export { FindEstate, FindEstateLevel, InsertEstate, InsertEstateLevel }
