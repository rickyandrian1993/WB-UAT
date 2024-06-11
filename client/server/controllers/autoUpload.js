import axios from 'axios'
import https from 'https'
import pool from '../dbconfig.js'
import { logToFile } from '../utility/logger.js'
import { GetMill } from './millController.js'

export const AutoUpload = async () => {
  // Get Mill Data
  GetMill((e) => {
    if (e.status === 200) {
      const estate = []
      const {
        data: { mill, mill_detail }
      } = e
      mill_detail.forEach((item) => estate.push(item.pcc_estate_cd))

      const session = {
        millManager: mill.mill_manager || '',
        estate: estate,
        userCd: 'Service Auto Upload',
        urlEvac: `${mill.server_url}/pcc_evacuation_activity_dtl/addEvacuationDtlListFromMillYieldsMillActivity`,
        urlYields: `${mill.server_url}/mill_yields_activity/addMillYieldsActivityList`
      }

      // Auto Upload and Get Mill Yields Data
      upload(session)
    } else logToFile('Error get mill in auto upload')
  })
}

const upload = (session) => {
  // Get mill yields data
  const getMillYileds = `
    SELECT * FROM pcc_mill_yields_activity
    WHERE upload_flag = 'N'AND netto_w > 0
  `

  // Get detail evac data
  const getEvac = `
    SELECT pead.* FROM pcc_evacuation_activity_dtl pead 
      JOIN pcc_mill_yields_activity pmya 
      ON pead.pcc_evacuation_activity_cd = pmya.pcc_evacuation_activity_cd
    WHERE pead.upload_flag = 'N' AND pmya.netto_w > 0
  `

  // Exec get mill yields
  pool
    .query(getMillYileds)
    .then((millYields) => {
      if (millYields.rowCount > 0) {
        // Exec get evac
        pool
          .query(getEvac)
          .then((evacs) => {
            mappingData(session, millYields.rows, evacs.rows)
          })
          .catch((err) => logToFile(`Error auto upload get evac: ${err}`))
      }
    })
    .catch((err) => logToFile(`Error auto upload get mill yields: ${err}`))
}

const mappingData = async (session, millYields, evacs) => {
  try {
    mapMillYields(session, millYields)
    mapEvacs(session, evacs)
  } catch (error) {
    logToFile(`Error mapping data auto upload: ${error}`)
  }
}

const mapMillYields = async (session, data) => {
  const dataMap = []
  const maxBatch = Math.ceil(data.length / 50)

  try {
    let temp = []
    for (let i = 0; i < data.length; i++) {
      if (i % 50 === 0 && i !== 0) {
        dataMap.push(temp)
        temp = []
      }
      let item = data[i]
      temp.push({
        after_cut: item.after_cut || null,
        bjr: item.bjr || null,
        cd: item.cd,
        created_by: item.created_by,
        created_dt: item.created_dt ? Date.parse(item.created_dt) : null,
        cut: item.cut || null,
        dirt: item.dirt || null,
        disortasi_worker_cd: item.disortasi_worker_cd || null,
        do_date: item.do_date ? Date.parse(item.do_date) : null,
        do_number: item.do_number || null,
        dobi: item.dobi || null,
        driver_nm: item.driver_nm || null,
        ffa: item.ffa || null,
        first_update: item.first_update ? Date.parse(item.first_update) : null,
        first_w: item.first_w || null,
        fresh_fruit: item.fresh_fruit || null,
        fresh_fruit_kg: item.fresh_fruit_kg || null,
        garbage: item.garbage || null,
        garbage_kg: item.garbage_kg || null,
        grading_brondolan: item.grading_brondolan || null,
        grading_brondolan_kg: item.grading_brondolan_kg || null,
        img1: null,
        img1_desc: null,
        img2: null,
        img2_desc: null,
        img3: null,
        img3_desc: null,
        is_from_tph: item.is_from_tph || null,
        is_lefted: item.is_lefted || null,
        janjang_kosong: item.janjang_kosong || null,
        janjang_kosong_kg: item.janjang_kosong_kg || null,
        latitude: null,
        lefted: item.lefted || null,
        long_stalk: item.long_stalk || null,
        long_stalk_kg: item.long_stalk_kg || null,
        longitude: null,
        mill_arrive_dt: item.mill_arrive_dt ? Date.parse(item.mill_arrive_dt) : null,
        moist: item.moist || null,
        mt_comodity_cd: item.mt_comodity_cd || null,
        mt_vndr_rent_vhcle_cd: item.mt_vndr_rent_vhcle_cd || null,
        netto_w: item.netto_w || null,
        nfc_id: item.nfc_id || null,
        nfc_received: item.nfc_received || null,
        nfc_received_dt: item.nfc_received_dt ? Date.parse(item.nfc_received_dt) : null,
        overripe_brondolan: item.overripe_brondolan || null,
        overripe_brondolan_kg: item.overripe_brondolan_kg || null,
        overripe_fruit: item.overripe_fruit || null,
        overripe_fruit_kg: item.overripe_fruit_kg || null,
        pcc_customer_cd: item.pcc_customer_cd || null,
        pcc_estate_cd: item.pcc_estate_cd || null,
        pcc_estate_level_cd: item.pcc_estate_level_cd || null,
        pcc_evac_prnt_actv_cd: item.pcc_evac_prnt_actv_cd || null,
        pcc_evacuation_activity_cd: item.pcc_evacuation_activity_cd || null,
        pcc_mill_cd: item.pcc_mill_cd || null,
        pcc_mill_manager_cd: session.millManager || null,
        pcc_vehicle_cd: item.pcc_vehicle_cd || null,
        pcc_wrkr_cd_driver: item.pcc_wrkr_cd_driver || null,
        pcc_wrkr_cd_loader: item.pcc_wrkr_cd_loader || null,
        pcc_wrkr_cd_loader_2: item.pcc_wrkr_cd_loader_2 || null,
        pcc_wrkr_cd_loader_3: item.pcc_wrkr_cd_loader_3 || null,
        pv: item.pv || null,
        remark1: item.remark1 || null,
        restan_overnight: item.restan_overnight || null,
        restan_overnight_kg: item.restan_overnight_kg || null,
        sand_fruit: item.sand_fruit || null,
        sand_fruit_kg: item.sand_fruit_kg || null,
        seal_number: item.seal_number || null,
        second_w: item.second_w || null,
        spb_date: item.spb_date ? Date.parse(item.spb_date) : null,
        spb_number: item.spb_number || null,
        total_brondolan: item.total_brondolan || null,
        total_bunch: item.total_bunch || null,
        updated_dt: item.updated_dt ? Date.parse(item.updated_dt) : null,
        updated_by: item.updated_by || null,
        water: item.water || null,
        water_kg: item.water_kg || null,
        wb_arrive_dt: item.wb_arrive_dt ? Date.parse(item.wb_arrive_dt) : null,
        wb_created_by: item.wb_created_by || null,
        wb_created_dt: item.wb_created_dt ? Date.parse(item.wb_created_dt) : null,
        young_fruit: item.young_fruit || null,
        young_fruit_kg: item.young_fruit_kg || null,
        pcc_mill_is_load_st: item.pcc_mill_is_load_st || null,
        total_harvaster_nfc: item.total_loaded_nfc || null,
        wb_upload_dt: Date.parse(new Date()),
        contract: item.contract || null,
        supplier: item.supplier || null,
        grade_class: item.grade_class || null,
        spb_weight: item.spb_weight || null,
        farmer: item.farmer || null,
        wb_upload_by: null,
        mbl_updated_by: null,
        mbl_updated_dt: null,
        mt_cmdity_catgds_cd: item.mt_cmdity_catgds_cd || null,
        tracking_no: item.tracking_no || null
      })
    }
    dataMap.push(temp)
    await sendingDataToServer(session, dataMap, 1, maxBatch, 'mill')
  } catch (error) {
    logToFile(`Error mapping data mill yields list upload: ${error}`)
    return { is_error: 'Y', message: error }
  }
}

const mapEvacs = async (session, data) => {
  let temp = []
  let dataMaps = []
  const maxBatch = Math.ceil(data.length / 50)

  for (let i = 0; i < data.length; i++) {
    if (i === 50 && i !== 0) {
      dataMaps.push(temp)
      temp = []
    }
    temp.push({
      pcc_evacuation_activity_dtl_cd: data[i].cd,
      pcc_evacuation_activity_cd: data[i].pcc_evacuation_activity_cd,
      pcc_estate_cd: data[i].pcc_estate_cd,
      pcc_estate_level_cd: data[i].pcc_estate_level_cd,
      pcc_mill_cd: data[i].pcc_mill_cd,
      is_from_tph: data[i].is_from_tph,
      total_bunch: data[i].bunch_amount,
      total_brondolan: data[i].brondolan,
      pcc_harvas_or_evact_cd: data[i].pcc_harvas_or_evact_cd,
      pcc_harvaster_nfc_id: data[i].pcc_harvaster_nfc_id || null,
      created_by: data[i].created_by || null,
      created_dt: Date.parse(data[i].created_dt)
    })
  }
  dataMaps.push(temp)
  await sendingDataToServer(session, dataMaps, 1, maxBatch, 'evac')
}

const sendingDataToServer = async (session, data, batch, maxBatch, type) => {
  try {
    const { userCd, estate } = session
    const payload = {
      locale: 'en',
      agent: 'mozzila',
      remote: '12.213.1.55',
      user: {
        user_id: userCd,
        estates: estate
      },
      data: data[batch - 1]
    }

    await axios({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
      httpsAgent: new https.Agent({ rejectUnauthorized: false, keepAlive: true }),
      url: type === 'mill' ? session.urlYields : session.urlEvac,
      data: JSON.stringify(payload)
    })
      .then((res) => {
        if (res.data.isError === 'Y') {
          logToFile(`===RESPONSE UPLOAD DATA SERVER===: ${JSON.stringify(res.data)}`)
          logToFile(`===PAYLOAD===: ${JSON.stringify(payload)}`)
        }
        const uploadedData = data[batch - 1].map((item) =>
          type === 'mill' ? item.cd : item.pcc_evacuation_activity_cd
        )

        switch (type) {
          case 'mill':
            updateUploadFlagPccMillYieldActivity(uploadedData)
            break
          case 'evac':
            updateFlagEvacActivityDtl(uploadedData)
            break
          default:
            break
        }
      })
      .catch((error) => {
        logToFile(`===CATCH ERROR UPLOAD DATA AXIOS===: ${error}`)
        logToFile(`===PAYLOAD===: ${JSON.stringify(payload)}`)
      })

    if (batch < maxBatch) await sendingDataToServer(session, data, batch + 1, maxBatch, type)
  } catch (error) {
    logToFile(`Error cron send data to server: ${error}`)
  }
}

const updateUploadFlagPccMillYieldActivity = (cd) => {
  const query = `
    UPDATE "pcc_mill_yields_activity" set "upload_flag" = 'Y'
    WHERE cd IN (${cd.map((data) => `'${data.toString()}'`)})`

  try {
    pool.query(query, (err, _) => {
      if (err) logToFile(`Error update flag mill yields: ${err}`)
    })
  } catch (error) {
    logToFile(`Error update flag mill yields: ${error}`)
  }
}

const updateFlagEvacActivityDtl = (cd) => {
  const query = `
    UPDATE "pcc_evacuation_activity_dtl" set "upload_flag" = 'Y'
    WHERE pcc_evacuation_activity_cd IN (${cd.map((data) => `'${data.toString()}'`)})`

  try {
    pool.query(query, (err, _) => {
      if (err) logToFile(`Error update flag evacuation activity detail: ${err}`)
    })
  } catch (error) {
    logToFile(`Error update flag evacuation activity detail ${error}`)
  }
}
