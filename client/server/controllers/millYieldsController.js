import { uid } from 'uid'
import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'
import { logToFile } from '../utility/logger.js'
import { generateTicketNumber } from './ticketNumbers.js'

export const rekapData = async (_, res) => {
  const response = {}
  try {
    const getAllScaleHistoryCommodityQuery = `
      SELECT comodity_nm, SUM(netto_w::bigint - cut::bigint) as total_berat, count(case when netto_w > 0 then null else 1 end) as total_kendaraan
      FROM pcc_mill_yields_activity
      WHERE wb_arrive_dt::date = now()::date
      GROUP BY comodity_nm`

    const getAllScaleHistorySupplierQuery = `
      SELECT supplier, COUNT(cd) as total_kendaraan, SUM(netto_w::bigint - cut::bigint) as total_berat
      FROM pcc_mill_yields_activity
      WHERE wb_arrive_dt::date = now()::date AND netto_w > 0
      GROUP BY supplier`

    await pool.query('BEGIN')
    const rekapCommodity = await pool.query(getAllScaleHistoryCommodityQuery)
    const rekapSupplier = await pool.query(getAllScaleHistorySupplierQuery)

    response.rekap_commodity = rekapCommodity.rows
    response.rekap_supplier = rekapSupplier.rows

    pool.query('COMMIT')

    res.json({ ...success200, data: response })
  } catch (err) {
    pool.query('ROLLBACK')
    logToFile(`===ERROR GET REKAP DATA===: ${err}`)
    res.status(500).json({ ...error500, data: `Error Get Rekap History: ${err} ` })
  }
}

const getRekapHistory = async (req, res) => {
  const getAllScaleHistoryQuery = `
    SELECT comodity_nm, SUM(netto_w::bigint - cut::bigint) as total_berat, count(case when netto_w > 0 then null else 1 end) as total_kendaraan
    FROM pcc_mill_yields_activity
    WHERE wb_arrive_dt::date = now()::date
    GROUP BY comodity_nm`

  await pool
    .query(getAllScaleHistoryQuery)
    .then((result) => res.json({ ...success200, data: result.rows }))
    .catch((error) => {
      logToFile(`Error get rekap history: ${error}`)
      res.status(500).json({ ...error500, data: `Error Get Rekap History: ${error} ` })
    })
}

const getRekapHistorySupplier = async (req, res) => {
  const getAllScaleHistorySupplierQuery = `
    SELECT supplier, COUNT(cd) as total_kendaraan, SUM(netto_w::bigint - cut::bigint) as total_berat
    FROM pcc_mill_yields_activity
    WHERE wb_arrive_dt::date = now()::date AND netto_w > 0
    GROUP BY supplier`

  await pool
    .query(getAllScaleHistorySupplierQuery)
    .then((result) => res.json({ ...success200, data: result.rows }))
    .catch((error) => {
      logToFile(`Error get rekap history supplier: ${error}`)
      res.status(500).json({ ...error500, data: `Error Get Rekap History: ${error} ` })
    })
}

const DeleteMillYield = (req, callback) => {
  const { cd } = req
  const query = `SELECT * FROM pcc_mill_yields_activity WHERE cd = '${cd}' limit 1`

  pool
    .query(query)
    .then((res) => {
      const { cd, mt_comodity_cd, pcc_evacuation_activity_cd } = res.rows[0]
      if (mt_comodity_cd === 'TBS Inti') checkEvacData(cd, pcc_evacuation_activity_cd, callback)
      else deleteQueryMillTieldsFunction(cd, callback)
    })
    .catch((err) => {
      logToFile(`Error delete mill yields get data: ${query}`)
      callback({ ...error500, data: `Error get mill yields: ${err}` })
    })
}

const checkEvacData = (cd, evac_act_cd, callback) => {
  const query = `SELECT * FROM pcc_evacuation_activity_dtl WHERE pcc_evacuation_activity_cd = '${evac_act_cd}'`

  pool
    .query(query)
    .then((res) => {
      if (res.rowCount > 0) deleteQueryEvacFunction(evac_act_cd)

      deleteQueryMillTieldsFunction(cd, callback)
    })
    .catch((err) => {
      logToFile(`Error delete mill yields get data: ${query}`)
      callback({ ...error500, data: `Error get mill yields: ${err}` })
    })
}

const deleteQueryEvacFunction = (evac_act_cd) => {
  const deleteQuery = `DELETE FROM pcc_evacuation_activity_dtl WHERE pcc_evacuation_activity_cd = '${evac_act_cd}'`

  pool.query(deleteQuery).catch((err) => {
    logToFile(`Error delete mill yields get data: ${deleteQuery}`)
    logToFile(`Error delete mill yields get data err message: ${err}`)
  })
}

const deleteQueryMillTieldsFunction = (cd, callback) => {
  const deleteQuery = `DELETE FROM pcc_mill_yields_activity WHERE cd = '${cd}'`

  pool
    .query(deleteQuery)
    .then(() =>
      callback({
        ...success200,
        message: 'Data has been Deleted',
        data: 'Data has been Deleted'
      })
    )
    .catch((err) => {
      logToFile(`Error delete mill yields get data: ${deleteQuery}`)
      callback({ ...error500, data: `Error get mill yields: ${err}` })
    })
}

const checkDuplicate = (req, callback) => {
  const { cd } = req.body
  const q = `SELECT * FROM pcc_mill_yields_activity WHERE pcc_evacuation_activity_cd = '${cd}'`
  pool.query(q).then((res) => {
    if (res.rowCount > 0) callback({ duplicate: true })
    else callback({ duplicate: false })
  })
}

const InsertMillYileds = (req, callback) => {
  logToFile(`DATA Insert Mill Yields: ${JSON.stringify(req.body)}`)
  const milLYieldData = req.body.data

  if (Object.keys(milLYieldData).length > 0) {
    milLYieldData.cd = uid(32)
    const body = [],
      header = []
    for (const e in milLYieldData) {
      if (milLYieldData[e] === null || milLYieldData[e] === '') {
      } else {
        const keys = `"${e}"`
        const values = `'${milLYieldData[e]}'`
        header.push(keys)
        body.push(values)
      }
    }

    const insertMillYieldQuery = `INSERT INTO pcc_mill_yields_activity (${header}) VALUES (${body})`
    pool
      .query(insertMillYieldQuery)
      .then(() => {
        if (Object.keys(req.body.evac_act_dtl).length > 0) insertEvac(req.body.evac_act_dtl)
        callback({
          ...success200,
          message: 'Data timbangan pertama telah disimpan',
          data: 'Data timbangan pertama telah disimpan'
        })
      })
      .catch((error) => {
        logToFile(`Error insert mill yields: ${error}`)
        logToFile(`Error insert mill yields Query: ${insertMillYieldQuery}`)
        callback({ ...error500, data: `Error Insert Mill Yields: ${error}` })
      })
  } else callback({ ...success200, data: 'Data Kosong.' })
}

const insertEvac = (data) => {
  let valueEvacActDtl = ''
  data.forEach((value) => {
    valueEvacActDtl += `(
      '${uid(32)}',
      ${value.pcc_estate_cd ? `'${value.pcc_estate_cd}'` : null},
      ${value.pcc_estate_level_cd ? `'${value.pcc_estate_level_cd}'` : null},
      ${value.pcc_evacuation_activity_cd ? `'${value.pcc_evacuation_activity_cd}'` : null},
      ${value.pcc_harvas_or_evact_cd ? `'${value.pcc_harvas_or_evact_cd}'` : null},
      ${value.created_dt ? `'${value.created_dt}'` : null},
      'N',
      'N',
      ${value.bunch_amount ? `${value.bunch_amount}` : null},
      ${value.brondolan ? `${value.brondolan}` : null},
      ${value.pcc_mill_cd ? `'${value.pcc_mill_cd}'` : null},
      ${value.is_from_tph ? `'${value.is_from_tph}'` : null},
      ${value.wb_arrive_dt ? `'${value.wb_arrive_dt}'` : null}
    ),`
  })

  valueEvacActDtl = valueEvacActDtl.substring(0, valueEvacActDtl.length - 1)

  const insertEvacActDtlQuery = `
    INSERT INTO pcc_evacuation_activity_dtl (
      cd,
      pcc_estate_cd,
      pcc_estate_level_cd, 
      pcc_evacuation_activity_cd,
      pcc_harvas_or_evact_cd, 
      created_dt,
      is_delete, 
      is_inactive,
      bunch_amount, 
      brondolan, 
      pcc_mill_cd, 
      is_from_tph,
      wb_arrive_dt
    ) VALUES ${valueEvacActDtl}`

  pool.query(insertEvacActDtlQuery).catch((error) => {
    logToFile(`Error insert evac ${error}`)
    logToFile(`Error insert evac Query: ${insertEvacActDtlQuery}`)
  })
}

const GetScaleHistory = (data, callback) => {
  const getAllScaleHistoryQuery = `
    SELECT * FROM pcc_mill_yields_activity 
    WHERE ((second_w is null OR second_w = 0) 
      AND (netto_w is null or netto_w = 0))`

  pool
    .query(getAllScaleHistoryQuery)
    .then((res) => callback({ ...success200, data: res.rows }))
    .catch((error) => {
      logToFile(`Error get scale history: ${error}`)
      callback({ ...error500, data: `Error Get Scale History: ${error} ` })
    })
}

const UpdateMillYields = (data, callback) => {
  generateTicketNumber(data.mt_comodity_cd, (res) => {
    const updateInputQuery = `
      UPDATE pcc_mill_yields_activity SET
        afdeling_nm = ${data.afdeling_nm === '' ? null : `'${data.afdeling_nm}'`},
        after_cut = ${data.after_cut === null ? 0 : data.after_cut},
        bjr = ${data.bjr === null ? 0 : data.bjr},
        block_nm = ${data.block_nm === '' ? null : `'${data.block_nm}'`},
        contract = ${data.contract === '' ? null : `'${data.contract}'`},
        cut = ${data.cut === null ? 0 : data.cut},
        dirt = ${data.dirt === null || data.dirt === undefined ? 0 : data.dirt},      
        disortasi_worker_cd = ${
          data.disortasi_worker_cd === '' ? null : `'${data.disortasi_worker_cd}'`
        },
        do_date = ${data.do_date === null ? null : `'${data.do_date}'`},
        do_number = ${data.do_number === '' ? null : `'${data.do_number}'`},
        dobi = ${data.dobi === null || data.dobi === undefined ? 0 : data.dobi},
        driver_nm = '${data.driver_nm.replace("'", "''")}',
        ekspedisi_nm = '${data.ekspedisi_nm}',
        estate_nm = ${data.estate_nm === '' ? null : `'${data.estate_nm}'`},
        farmer = ${data.farmer === '' ? null : `'${data.farmer}'`},
        ffa = ${data.ffa === null || data.ffa === undefined ? 0 : data.ffa},
        first_update = '${data.first_update}',
        first_w = '${data.first_w}',
        fresh_fruit = ${
          data.fresh_fruit === null || data.fresh_fruit === undefined ? 0 : data.fresh_fruit
        },
        fresh_fruit_kg = ${data.fresh_fruit_kg === null ? 0 : data.fresh_fruit_kg},
        garbage = ${data.garbage === null || data.garbage === undefined ? 0 : data.garbage},
        garbage_kg = ${data.garbage_kg === null ? 0 : data.garbage_kg},
        grade_class = ${data.grade_class === '' ? null : `'${data.grade_class}'`},
        grading_brondolan = ${
          data.grading_brondolan === null || data.grading_brondolan === undefined
            ? 0
            : data.grading_brondolan
        },
        grading_brondolan_kg = ${
          data.grading_brondolan_kg === null ? 0 : data.grading_brondolan_kg
        },
        janjang_kosong = ${
          data.janjang_kosong === null || data.janjang_kosong === undefined
            ? 0
            : data.janjang_kosong
        },
        janjang_kosong_kg = ${data.janjang_kosong_kg === null ? 0 : data.janjang_kosong_kg},
        loader_nm = ${data.loader_nm === '' ? null : `'${data.loader_nm.replace("'", "''")}'`},
        loader_nm_2 = ${
          data.loader_nm_2 === '' ? null : `'${data.loader_nm_2.replace("'", "''")}'`
        },
        loader_nm_3 = ${
          data.loader_nm_3 === '' ? null : `'${data.loader_nm_3.replace("'", "''")}'`
        },
        long_stalk = ${
          data.long_stalk === null || data.long_stalk === undefined ? 0 : data.long_stalk
        },
        long_stalk_kg = ${data.long_stalk_kg === null ? 0 : data.long_stalk_kg},
        mill_nm = '${data.mill_nm}',
        moist = ${data.moist === null || data.moist === undefined ? 0 : data.moist},
        mt_vndr_rent_vhcle_cd = '${data.mt_vndr_rent_vhcle_cd}',
        netto_w = '${data.netto_w}',
        overripe_brondolan = ${
          data.overripe_brondolan === null || data.overripe_brondolan === undefined
            ? 0
            : data.overripe_brondolan
        },
        overripe_brondolan_kg = ${
          data.overripe_brondolan_kg === null ? 0 : data.overripe_brondolan_kg
        },
        overripe_fruit = ${
          data.overripe_fruit === null || data.overripe_fruit === undefined
            ? 0
            : data.overripe_fruit
        },
        overripe_fruit_kg = ${data.overripe_fruit_kg === null ? 0 : data.overripe_fruit_kg},
        pcc_customer_cd = '${data.pcc_customer_cd}',
        pcc_vehicle_cd = '${data.pcc_vehicle_cd}',
        pcc_wrkr_cd_driver = ${
          data.pcc_wrkr_cd_driver === '' ? null : `'${data.pcc_wrkr_cd_driver.replace("'", "''")}'`
        },
        pcc_wrkr_cd_loader = ${
          data.pcc_wrkr_cd_loader === '' ? null : `'${data.pcc_wrkr_cd_loader}'`
        },
        pcc_wrkr_cd_loader_2 = ${
          data.pcc_wrkr_cd_loader_2 === '' ? null : `'${data.pcc_wrkr_cd_loader_2}'`
        },
        pcc_wrkr_cd_loader_3 = ${
          data.pcc_wrkr_cd_loader_3 === '' ? null : `'${data.pcc_wrkr_cd_loader_3}'`
        },
        pv = ${data.pv === null || data.pv === undefined ? 0 : data.pv},
        remark1 = ${data.remark1 === '' ? null : `'${data.remark1}'`},
        restan_overnight = ${
          data.restan_overnight === null || data.restan_overnight === undefined
            ? 0
            : data.restan_overnight
        },
        restan_overnight_kg = ${data.restan_overnight_kg === null ? 0 : data.restan_overnight_kg},
        sand_fruit = ${
          data.sand_fruit === null || data.sand_fruit === undefined ? 0 : data.sand_fruit
        },
        sand_fruit_kg = ${data.sand_fruit_kg === null ? 0 : data.sand_fruit_kg},
        seal_number = ${data.seal_number === '' ? null : `'${data.seal_number}'`},
        second_w = '${data.second_w}',
        spb_date = ${data.spb_date === null ? null : `'${data.spb_date}'`},
        spb_number = ${data.spb_number === '' ? null : `'${data.spb_number}'`},
        spb_weight = ${
          data.spb_weight === null || data.spb_weight === undefined ? 0 : data.spb_weight
        },
        supplier = ${data.supplier === '' ? null : `'${data.supplier}'`},
        total_brondolan = ${
          data.total_brondolan === null || data.total_brondolan === undefined
            ? 0
            : data.total_brondolan
        },
        total_bunch = ${
          data.total_bunch === null || data.total_bunch === undefined ? 0 : data.total_bunch
        },
        updated_by = '${data.updated_by}',
        updated_dt = '${data.updated_dt}',
        upload_flag = '${data.upload_flag}',
        water = ${data.water === null || data.water === undefined ? 0 : data.water},
        water_kg = ${data.water_kg === null ? 0 : data.water_kg},
        young_fruit = ${
          data.young_fruit === null || data.young_fruit === undefined ? 0 : data.young_fruit
        },
        young_fruit_kg = ${data.young_fruit_kg === null ? 0 : data.young_fruit_kg},
        tracking_no= '${res.number}',
        ticket= '${res.ticket_num}'
      WHERE cd = '${data.cd}';
      `
    pool
      .query(updateInputQuery)
      .then((_) => {
        logToFile(`Update transaction: ${JSON.stringify(data)}`)
        callback({ ...success200, data: 'Data telah di perbaharui.', ticket: res.ticket_num })
      })
      .catch((error) => {
        logToFile(`Error update mill yields: ${error}`)
        logToFile(`Query: ${updateInputQuery}`)
        callback({ ...error500, data: `Error Update Mill Yields: ${error} ` })
      })
  })
}

const getDataById = (data, callback) => {
  const { ticket } = data.body

  const queryData = `
    SELECT cd, first_w, second_w, total_brondolan, total_bunch, supplier, pcc_customer_cd
    FROM pcc_mill_yields_activity
    WHERE ticket = '${ticket}'`

  pool
    .query(queryData)
    .then((res) => callback({ ...success200, data: res.rows }))
    .catch((err) => callback({ ...error500, data: err }))
}

export {
  DeleteMillYield,
  GetScaleHistory,
  InsertMillYileds,
  UpdateMillYields,
  checkDuplicate,
  getDataById,
  getRekapHistory,
  getRekapHistorySupplier
}
