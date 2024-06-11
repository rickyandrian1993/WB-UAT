import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'
import { logToFile } from '../utility/logger.js'

const InsertUser = (data, callback) => {
  let valueInsertAppUser = ''
  let valueInsertUserAccess = ''
  data.forEach((value) => {
    valueInsertAppUser += `(
      '${value.cd}',
      ${value.nm ? `'${value.nm}'` : null},
      ${value.pcc_estate_cd ? `'${value.pcc_estate_cd}'` : null}
    ),`

    if (value.user_access.length > 0) {
      value.user_access.forEach((access) => {
        if (access.mt_app_section_cd === 'JEMBATAN_TIMBANG')
          valueInsertUserAccess += `(
            '${access.cd}',
            '${access.pcc_app_user_cd}',
            '${access.mt_app_section_cd}'
          ),`
      })
    }
  })
  valueInsertAppUser = valueInsertAppUser.substring(0, valueInsertAppUser.length - 1)
  valueInsertUserAccess = valueInsertUserAccess.substring(0, valueInsertUserAccess.length - 1)
  const insertAppUserQuery = `INSERT INTO pcc_app_user (
    cd,
    nm,
    pcc_estate_cd
  ) VALUES ${valueInsertAppUser}
  on conflict (cd) do 
  UPDATE SET
    cd = excluded.cd,
    nm = excluded.nm,
    pcc_estate_cd = excluded.pcc_estate_cd;`

  pool
    .query(insertAppUserQuery)
    .then((_) => InsertUserAccess(valueInsertUserAccess, callback))
    .catch((error) => {
      logToFile(`Error insert app user: ${error}`)
      callback({ ...error500, data: `Error Insert App User: ${error}` })
    })
}

const InsertUserAccess = (data, callback) => {
  const insertAppUserAccessQuery = `INSERT INTO pcc_app_user_access (
    cd,
    pcc_app_user_cd,
    mt_app_section_cd
  ) VALUES ${data}
  on conflict (cd) do 
  UPDATE SET
    cd = excluded.cd,
    pcc_app_user_cd = excluded.pcc_app_user_cd,
    mt_app_section_cd = excluded.mt_app_section_cd;`

  if (data.length)
    pool
      .query(insertAppUserAccessQuery)
      .then((_) => callback({ ...success200, data: 'Berhasil menambahkan app user access.' }))
      .catch((error) => {
        logToFile(`Error insert app user access: ${error}`)
        callback({ ...error500, data: `Error Insert App User Access: ${error}` })
      })
  else callback({ ...success200 })
}

const InsertPassword = (data, callback) => {
  let valueInsertAppPassword = ''
  data.forEach((value) => {
    valueInsertAppPassword += `(
        '${value.pcc_app_user_cd}',
        '${value.password}',
        '${new Date(value.created_dt).toISOString()}',
        ${value.pcc_estate_cd ? `'${value.pcc_estate_cd}'` : null}
      ),`
  })

  valueInsertAppPassword = valueInsertAppPassword.substring(0, valueInsertAppPassword.length - 1)

  const insertAppUserPassQuery = `
    INSERT INTO pcc_app_user_pass (pcc_app_user_cd, password, created_dt, pcc_estate_cd) VALUES ${valueInsertAppPassword}
    on conflict (pcc_app_user_cd) do 
    UPDATE SET
      pcc_app_user_cd = excluded.pcc_app_user_cd,
      password = excluded.password,
      created_dt = excluded.created_dt,
      pcc_estate_cd = excluded.pcc_estate_cd;`

  pool
    .query(insertAppUserPassQuery)
    .then((_) => callback({ ...success200, data: 'Berhasil menambahkan App user password.' }))
    .catch((error) => {
      logToFile(`Error insert app user password: ${error}`)
      callback({ ...error500, data: `Error Insert App User Password: ${error}` })
    })
}

export { InsertUser, InsertPassword }
