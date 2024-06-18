import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'
import { logToFile } from '../utility/logger.js'

const GetReport = (data, callback) => {
  const { commodity, date } = data
  const initialSelect = 'pcc_mill_yields_activity.*, pcc_customer.nm AS customer_nm'
  let queryData = ''

  if (commodity === 'all') {
    queryData = `
      SELECT ${initialSelect}
      FROM pcc_mill_yields_activity LEFT JOIN pcc_customer 
        ON pcc_mill_yields_activity.pcc_customer_cd = pcc_customer.cd
      WHERE pcc_mill_yields_activity.wb_arrive_dt::DATE = '${date}'
      ORDER BY wb_arrive_dt DESC
    `
  } else {
    queryData = `
      SELECT ${initialSelect}
      FROM pcc_mill_yields_activity LEFT JOIN pcc_customer 
        ON pcc_mill_yields_activity.pcc_customer_cd = pcc_customer.cd
      WHERE mt_comodity_cd = '${commodity}' AND pcc_mill_yields_activity.wb_arrive_dt::DATE ='${date}'
      ORDER BY wb_arrive_dt DESC
    `
  }

  pool
    .query(queryData)
    .then((res) => callback({ ...success200, data: { results: res.rows } }))
    .catch((error) => {
      logToFile(`Error get report: ${error}`)
      callback({ ...error500, data: `Error Get Report: ${error}` })
    })
}

const GetReportList = (req, res) => {
  const params = req.body
  const { startDate, endDate } = params

  if (!startDate || startDate === 'Invalid date' || !endDate || endDate === 'Invalid date')
    return res.json({ ...success200, data: [] })

  if (params.commodity === 'all') return getAllReportToday(res, params)

  switch (params.group) {
    case 'TBS':
      if (params.commodity === 'TBS Inti' || params.commodity === 'Brondolan')
        return getReportTbs(res, params)
      else return getReportTbsLuarPlasmaUsb(res, params)
    case 'NC':
      return getReportNonCommodity(res, params)
    case 'CPC':
      return getReportCommodity(res, params)
    default:
      return res.json({ ...success200, data: [] })
  }
}

const getAllReportToday = (res, params) => {
  const { startDate } = params

  const query = `
    SELECT comodity_nm, supplier, SUM(cut) as cut, SUM(first_w) as first_w,
      SUM(second_w) as second_w, SUM(netto_w) as netto_w, SUM(total_bunch) as tandan,
      estate_nm, (SUM(netto_w)::bigint - SUM(cut)::bigint) as total_netto,
      SUM(spb_weight) as spb_weight, COUNT(cd) as trip
    FROM pcc_mill_yields_activity
    WHERE second_w <> 0 AND wb_arrive_dt::DATE = '${startDate}'
    GROUP BY comodity_nm, supplier, estate_nm`

  pool
    .query(query)
    .then((result) => res.json({ ...success200, data: result.rows }))
    .catch((err) => {
      logToFile(`Error get all report: ${err}`)
      res.status(500).json({ ...error500, data: err })
    })
}

const getReportTbs = (res, params) => {
  const { commodity, startDate, endDate, supplier, estate } = params
  const query = `
    SELECT ticket, comodity_nm, supplier, cut, mill_arrive_dt,
      first_update, first_w, do_number, spb_number,
      second_w, netto_w, total_bunch as tandan, ekspedisi_nm,
      do_date, pcc_vehicle_cd, pmya.pcc_estate_level_cd,
      pel.divisi_cd, pel.section_cd, pel.subblock_cd, estate_nm,
      (netto_w::bigint - cut::bigint) as total_netto, pc.nm as customer, spb_weight,
      CASE WHEN spb_weight::bigint > 0 THEN (netto_w::bigint - cut::bigint) - spb_weight ELSE 0 END as selisih
    FROM pcc_mill_yields_activity pmya
      LEFT JOIN pcc_estate_level pel ON pmya.pcc_estate_level_cd = pel.cd
      LEFT JOIN pcc_customer pc ON pmya.pcc_customer_cd = pc.cd
    WHERE (second_w <> 0 AND mt_comodity_cd = '${commodity}') AND
      (pmya.wb_arrive_dt::DATE BETWEEN '${startDate}' AND '${endDate}') ${
    supplier && `AND supplier = '${supplier}'`
  } ${estate && `AND pmya.pcc_estate_cd = '${estate}'`}
    ORDER BY first_update DESC`

  pool
    .query(query)
    .then((result) => {
      const additionalQuery = `
        SELECT comodity_nm, netto_w::bigint, ffa, dirt
        FROM pcc_mill_yields_activity
        WHERE comodity_nm IN ('CPO', 'Kernel') AND (second_w <> 0 AND (wb_arrive_dt::DATE BETWEEN '${startDate}' AND '${endDate}'))`

      pool
        .query(additionalQuery)
        .then((data) => {
          const datas = data.rows

          const commodityGroup = Object.entries(
            datas.reduce((acc, { comodity_nm, netto_w, ffa, dirt }) => {
              if (!acc[comodity_nm]) {
                acc[comodity_nm] = []
              }
              acc[comodity_nm].push({ netto_w, ffa, dirt })
              return acc
            }, {})
          ).map(([commodity, values]) => ({ commodity, values }))

          let dataAdditional = []

          commodityGroup.forEach((com) => {
            const total_netto = sumData(com.values, 'netto_w')
            const total_ffa = sumDataFloat(com.values, 'ffa').toFixed(2)
            const total_dirt = sumDataFloat(com.values, 'dirt')
            dataAdditional.push({
              commodity: com.commodity,
              trip: com.values.length,
              total_kg: total_netto,
              total_ffa,
              total_dirt
            })
          })

          const allCommodityQuery = `
            SELECT COUNT(cd) as trip, SUM(netto_w::bigint - cut::bigint) as total_netto, SUM(cut::bigint) as total_cut
            FROM pcc_mill_yields_activity
            WHERE second_w <> 0 AND (wb_arrive_dt::DATE BETWEEN '${startDate}' AND '${endDate}')`

          pool
            .query(allCommodityQuery)
            .then((allDataResult) => {
              res.json({
                ...success200,
                data: result.rows,
                dataKeseluruhan: allDataResult.rows[0],
                dataAdditional
              })
            })
            .catch((err) => logToFile(`Error get report allCommodityQuery: ${err}`))
        })
        .catch((err) => logToFile(`Error get report tbs: ${err}`))
    })
    .catch((err) => {
      logToFile(`Error get report tbs: ${err}`)
      res.status(500).json({ ...error500, data: err })
    })
}

const getReportTbsLuarPlasmaUsb = async (res, params) => {
  const { commodity, startDate, endDate, supplier, estate } = params

  const query = `
    SELECT
      comodity_nm, grade_class, supplier, cut, mill_arrive_dt,
      first_update, first_w, do_number, spb_number,
      second_w, netto_w, total_bunch as tandan, ekspedisi_nm,
      do_date, pcc_vehicle_cd, estate_nm,
      (netto_w::bigint - cut::bigint) as total_netto, spb_weight,
      CASE WHEN spb_weight::bigint > 0 THEN (netto_w::bigint - cut::bigint) - spb_weight ELSE 0 END as selisih
    FROM pcc_mill_yields_activity
    WHERE (second_w <> 0 AND mt_comodity_cd = '${commodity}') AND 
      (wb_arrive_dt::DATE BETWEEN '${startDate}' AND '${endDate}') ${
    supplier && `AND (supplier = '${supplier}' ${estate && `AND pcc_estate_cd = '${estate}'`})`
  }
    ORDER BY first_update DESC`

  pool
    .query(query)
    .then((result) => {
      const additionalQuery = `
        SELECT comodity_nm, netto_w::bigint, ffa, dirt
        FROM pcc_mill_yields_activity
        WHERE comodity_nm IN ('CPO', 'Kernel') AND (second_w <> 0 AND (wb_arrive_dt::DATE BETWEEN '${startDate}' AND '${endDate}'))`

      pool
        .query(additionalQuery)
        .then((data) => {
          const datas = data.rows

          const commodityGroup = Object.entries(
            datas.reduce((acc, { comodity_nm, netto_w, ffa, dirt }) => {
              if (!acc[comodity_nm]) {
                acc[comodity_nm] = []
              }
              acc[comodity_nm].push({ netto_w, ffa, dirt })
              return acc
            }, {})
          ).map(([commodity, values]) => ({ commodity, values }))

          let dataAdditional = []

          commodityGroup.forEach((com) => {
            const total_netto = sumData(com.values, 'netto_w')
            const total_ffa = sumDataFloat(com.values, 'ffa').toFixed(2)
            const total_dirt = sumDataFloat(com.values, 'dirt').toFixed(2)
            dataAdditional.push({
              commodity: com.commodity,
              trip: com.values.length,
              total_kg: total_netto,
              total_ffa,
              total_dirt
            })
          })

          const allCommodityQuery = `
            SELECT COUNT(cd) as trip, SUM(netto_w::bigint - cut::bigint) as total_netto, SUM(cut::bigint) as total_cut
            FROM pcc_mill_yields_activity
            WHERE second_w <> 0 AND (wb_arrive_dt::DATE BETWEEN '${startDate}' AND '${endDate}')`

          pool
            .query(allCommodityQuery)
            .then((allDataResult) => {
              res.json({
                ...success200,
                data: result.rows,
                dataKeseluruhan: allDataResult.rows[0],
                dataAdditional
              })
            })
            .catch((err) => logToFile(`Error get report tbs luar plasma: ${err}`))
        })
        .catch((err) => logToFile(`Error get report tbs luar plasma: ${err}`))
    })
    .catch((err) => {
      logToFile(`Error get report tbs luar plasma: ${err}`)
      res.status(500).json({ ...error500, data: err })
    })
}

const getReportCommodity = (res, params) => {
  const { commodity, startDate, endDate, supplier, customer } = params

  if (supplier === '' || customer === '') return res.json({ ...success200, data: [] })

  const query = `
    SELECT comodity_nm, supplier, cut, mill_arrive_dt, first_update,
      first_w, do_number, spb_number, second_w, netto_w, total_bunch as tandan,
      ekspedisi_nm, do_date, pcc_vehicle_cd, pmya.pcc_estate_level_cd,
      pel.divisi_cd, pel.section_cd, pel.subblock_cd, estate_nm,
      (netto_w::bigint - cut::bigint) as total_netto, pc.nm as customer, spb_weight
    FROM pcc_mill_yields_activity pmya
      LEFT JOIN pcc_estate_level pel ON pmya.pcc_estate_level_cd = pel.cd
      LEFT JOIN pcc_customer pc ON pmya.pcc_customer_cd = pc.cd
    WHERE (second_w <> 0 AND 
      mt_comodity_cd = '${commodity}') AND 
      (pmya.wb_arrive_dt::DATE 
        BETWEEN '${startDate}' AND '${endDate}') AND 
      (pc.cd = '${customer}' AND supplier = '${supplier}')
    ORDER BY first_update DESC`

  pool
    .query(query)
    .then((result) => res.json({ ...success200, data: result.rows }))
    .catch((err) => {
      logToFile(`Error get report commodity: ${err}`)
      res.status(500).json({ ...error500, data: err })
    })
}

const getReportNonCommodity = (res, params) => {
  const { commodity, startDate, endDate } = params

  const query = `
    SELECT supplier, pc.nm as customer, SUM(cut) as cut, SUM(first_w) as first_w,
      SUM(second_w) as second_w, SUM(netto_w) as netto_w, SUM(total_bunch) as tandan,
      (SUM(netto_w)::bigint - SUM(cut)::bigint) as total_netto,
      SUM(spb_weight) as spb_weight, COUNT(pmya.cd) as trip
    FROM pcc_mill_yields_activity pmya
      LEFT JOIN pcc_customer pc ON pmya.pcc_customer_cd = pc.cd
    WHERE (second_w <> 0 AND comodity_nm = '${commodity}') AND
      (pmya.wb_arrive_dt::DATE BETWEEN '${startDate}' AND '${endDate}')
    GROUP BY supplier, pc.nm`

  pool
    .query(query)
    .then((result) => res.json({ ...success200, data: result.rows }))
    .catch((err) => {
      logToFile(`Error get report non commodity: ${err}`)
      res.status(500).json({ ...error500, data: err })
    })
}

const sumData = (datas, key) => {
  return datas.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue[key])
  }, 0)
}

const sumDataFloat = (datas, key) => {
  return datas.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue[key])
  }, 0)
}

export { GetReport, GetReportList }
