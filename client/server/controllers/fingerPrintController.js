import moment from 'moment'
import { uid } from 'uid'
import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'
import { logToFile } from '../utility/logger.js'

const InsertBiometric = async (data, callback) => {
  logToFile(`Insert biometric data: ${JSON.stringify(data)}`)
  const client = await pool.connect()
  const query = `
    INSERT INTO mt_fingerprint (cd, nm, role_position, biometric_data, created_by, created_dt)
    VALUES ($1, $2, $3, $4, $5, $6)
  `
  const values = [
    uid(32),
    data.nm,
    data.role_position,
    data.biometric_data,
    'Super Admin',
    moment().format('Y-MM-DD HH:mm:ss')
  ]

  try {
    await client.query('BEGIN')
    await client.query(query, values).then(() => {
      // GET LIST
      const queryGetListCredential = `SELECT cd, nm, role_position FROM mt_fingerprint ORDER BY nm`
      client
        .query(queryGetListCredential)
        .then((res) => callback({ ...success200, data: res.rows }))
    })

    await client.query('COMMIT')
  } catch (error) {
    client.query('ROLLBACK')
    logToFile(`Error insert biometric: ${error}`)
    callback({ ...error500, data: `Failed to insert biometric: ${error}` })
  } finally {
    client.release()
  }
}

const CredentialList = (callback) => {
  const queryGetListCredential = `
    SELECT cd, nm, role_position FROM mt_fingerprint
    ORDER BY nm`
  pool
    .query(queryGetListCredential)
    .then((res) => callback({ ...success200, data: res.rows }))
    .catch((error) => {
      logToFile(`Error get list credential: ${error}`)
      callback({ ...error500, data: `Error Get List Credential: ${error}` })
    })
}

const RemoveBiometric = (req, res) => {
  const { username } = req.body
  const removeBiometricQuery = `UPDATE pcc_app_user SET biometric = null WHERE cd = '${username}'`

  pool
    .query(removeBiometricQuery)
    .then((_) => res.json({ ...success200 }))
    .catch((err) => {
      logToFile(`Error remove biometric: ${err}`)
      res.status(500).json({ ...error500, data: err })
    })
}

export { CredentialList, InsertBiometric, RemoveBiometric }
