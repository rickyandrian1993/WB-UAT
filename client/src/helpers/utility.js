import axios from 'axios'
import moment from 'moment'
import { ToastNotification } from '../components'
import { commoditySubmenu, menu, nonCommoditySubmenu } from '../constants/sideMenuData'
import { endpoints } from '../services/endpoints'

export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') content = JSON.stringify(content)
  return window.localStorage.setItem(name, content)
}

export const getStore = (name) => {
  if (!name) return
  return JSON.parse(window.localStorage.getItem(name))
}

export const removeStore = (name) => {
  if (!name) return
  return window.localStorage.removeItem(name)
}

export const removeAllLocalStorage = () => {
  return window.localStorage.clear()
}

export const getEstateList = (type = null) => {
  const estate = []
  const { mill_detail } = getStore('mill')

  mill_detail.forEach((data) => {
    if (type === 'select') estate.push({ value: data.pcc_estate_cd, label: data.pcc_estate_nm })
    else estate.push({ estateCd: data.pcc_estate_cd, estateNm: data.pcc_estate_nm })
  })

  return estate
}

export const getDateAndTimeNow = (formatStr) => {
  return moment().format(formatStr)
}

export const dateFormat = (date, formatStr) => {
  return moment(date).format(formatStr)
}

export const numberFormat = (value) => {
  const nf = Intl.NumberFormat('id-ID')
  return nf.format(+value)
}

export const findLabelPath = (path) =>
  commoditySubmenu.find((x) => x.path === path) ??
  nonCommoditySubmenu.find((x) => x.path === path) ??
  menu.find((x) => x.path === path) ??
  'Weigh Bridge'

export const findPathByCd = (cd) =>
  commoditySubmenu.find((x) => x.cd === cd) ??
  nonCommoditySubmenu.find((x) => x.cd === cd) ??
  menu.find((x) => x.cd === cd) ??
  'Weigh Bridge'

export const getLastWeekDate = () => {
  const date = new Date()

  return new Date(date.setDate(date.getDate() - 6))
}

export const parseCSVData = (data) => {
  let result = []
  Object.keys(data).map((items) => {
    const row = data[items]
    let newObj = {
      ...row,
      wb_arrive_dt: row.wb_arrive_dt ? moment(row.wb_arrive_dt).format('DD MMMM Y HH:mm:ss') : null,
      first_update: row.first_update ? moment(row.first_update).format('DD MMMM Y HH:mm:ss') : null
    }
    result.push(newObj)
    return null
  })
  return result
}

export const generateHeader = (header) => {
  let columnHeader = []
  Object.keys(header).map((name) => {
    if (name !== 'actions') {
      let label = header[name]
      let key = name
      columnHeader.push({ label, key })
    }
    return null
  })
  return columnHeader
}

const duplicateCheck = async (cd) => {
  const result = await axios
    .post(endpoints.cardChecking, { cd }, { withCredentials: true })
    .then(({ data }) => {
      if (data.duplicate) {
        ToastNotification({
          title: 'Card Error',
          message: 'Kartu Duplikat',
          isError: true,
          cardError: true
        })
        return true
      } else return false
    })
    .catch((err) => {
      ToastNotification({
        title: 'Card Error',
        message: 'NFC Card Error',
        isError: true,
        cardError: true
      })
      return true
    })

  return result
}

export const nfcParse = async (isGrading, data, evac_cd, resultCallback) => {
  const { nfc_id, nfc_payload } = data
  const { mill } = getStore('mill')

  const parent = nfc_payload.split('|')[0]
  const dataParent = parent.split(';')
  const result = []

  const nfcIndicator = dataParent[0]
  const pcc_mill_cd = dataParent[9]

  if (nfcIndicator !== '33' && nfcIndicator !== '34')
    ToastNotification({
      title: 'NFC Error',
      message: 'Kartu NFC tidak dikenal!',
      isError: true
    })
  else if (nfcIndicator === '33' && mill.cd !== pcc_mill_cd) {
    ToastNotification({
      title: 'NFC Error',
      message: 'Tujuan Mill Berbeda',
      isError: true
    })
  } else if (nfcIndicator === '33' && !isGrading) {
    const isDupp = await duplicateCheck(dataParent[1])
    if (!isDupp) {
      const childData = []
      const child = nfc_payload.split('|')[1]
      const dataChild = child.split(';')

      const childDataLength = child.split('~')
      for (let i = 0; i < childDataLength.length; i++) {
        const splitData = childDataLength[i].split(';')
        childData.push({
          pcc_estate_cd: dataParent[3],
          pcc_estate_level_cd: splitData[1],
          pcc_evacuation_activity_cd: dataParent[1],
          pcc_harvas_or_evact_cd: splitData[0],
          created_dt: moment.unix(dataParent[13] / 1000).format('Y-MM-DD HH:mm:ss'),
          bunch_amount: splitData[2],
          brondolan: splitData[3],
          pcc_mill_cd: dataParent[9],
          is_from_tph: dataParent[12],
          wb_arrive_dt: moment().format('Y-MM-DD HH:mm:ss')
        })
      }
      result.push({
        nfc_id: nfc_id,
        pcc_evacuation_activity_cd: dataParent[1],
        pcc_evac_prnt_actv_cd: dataParent[2],
        pcc_estate_cd: dataParent[3],
        pcc_wrkr_cd_loader: dataParent[4],
        pcc_wrkr_cd_loader_2: dataParent[5],
        pcc_wrkr_cd_loader_3: dataParent[6],
        pcc_wrkr_cd_driver: dataParent[7],
        pcc_vehicle_cd: dataParent[8],
        pcc_mill_cd: dataParent[9],
        pcc_mill_is_load_st: dataParent[10],
        is_lefted: dataParent[11],
        is_from_tph: dataParent[12],
        created_dt: dataParent[13],
        total_loaded_nfc: dataParent[14],
        total_bunch: +dataParent[15],
        total_brondolan: +dataParent[16],
        mill_nm: mill.nm,
        driver_cd: dataParent[7],
        estate_level_cd: dataChild[1],
        loader_cd: [dataParent[4], dataParent[5], dataParent[6]],
        child_data: childData
      })
      resultCallback(...result)

      const { child_data, pcc_estate_cd, loader_cd, driver_cd } = result[0]
      return {
        estate_level_cd: [child_data?.map(({ pcc_estate_level_cd }) => pcc_estate_level_cd)],
        pcc_estate_cd,
        loader_cd,
        driver_cd
      }
    }
    return
  } else if (nfcIndicator === '34' && isGrading) {
    if (dataParent[5] === evac_cd) {
      result.push({
        disortasi_worker_cd: dataParent[8],
        fresh_fruit: dataParent[9],
        overripe_fruit: dataParent[10],
        young_fruit: dataParent[11],
        long_stalk: dataParent[12],
        janjang_kosong: dataParent[13],
        grading_brondolan: dataParent[14],
        overripe_brondolan: dataParent[15],
        restan_overnight: dataParent[16],
        garbage: dataParent[17]
      })
      resultCallback(...result)
      return null
    } else if (!evac_cd) {
      ToastNotification({
        title: 'NFC Error',
        message: 'Silahkan Pilih No Kendaraan!',
        isError: true
      })
    } else {
      ToastNotification({
        title: 'NFC Error',
        message: 'Kartu NFC Grading tidak sesuai!',
        isError: true
      })
    }
    return null
  } else
    ToastNotification({
      title: 'NFC Error',
      message: 'Kartu NFC salah!',
      isError: true
    })
}

export const isNaNToZero = (val) => {
  if (isNaN(parseInt(val))) {
    return 0
  } else {
    return val
  }
}

export const parseValue = (data, form) => {
  form.setValues({
    ...data,
    after_cut: isNaNToZero(data.after_cut),
    bjr: isNaNToZero(data.bjr),
    cut: isNaNToZero(data.cut),
    dirt: isNaNToZero(parseInt(data.dirt)),
    do_date: data.do_date !== '' ? new Date(data.do_date) : null,
    dobi: isNaNToZero(parseInt(data.dobi)),
    ffa: isNaNToZero(parseFloat(data.ffa)),
    first_w: isNaNToZero(parseInt(data.first_w)),
    fresh_fruit: isNaNToZero(parseInt(data.fresh_fruit)),
    fresh_fruit_kg: isNaNToZero(data.fresh_fruit_kg),
    janjang_kosong: isNaNToZero(parseInt(data.janjang_kosong)),
    janjang_kosong_kg: isNaNToZero(data.janjang_kosong_kg),
    garbage: isNaNToZero(parseFloat(data.garbage)),
    garbage_kg: isNaNToZero(data.garbage_kg),
    grading_brondolan: isNaNToZero(parseFloat(data.grading_brondolan)),
    grading_brondolan_kg: isNaNToZero(data.grading_brondolan_kg),
    long_stalk: isNaNToZero(parseInt(data.long_stalk)),
    long_stalk_kg: isNaNToZero(data.long_stalk_kg),
    moist: isNaNToZero(parseFloat(data.moist)),
    netto_w: isNaNToZero(parseInt(data.netto_w)),
    restan_overnight: isNaNToZero(parseFloat(data.restan_overnight)),
    restan_overnight_kg: isNaNToZero(data.restan_overnight_kg),
    overripe_fruit: isNaNToZero(parseInt(data.overripe_fruit)),
    overripe_fruit_kg: isNaNToZero(data.overripe_fruit_kg),
    overripe_brondolan: isNaNToZero(parseFloat(data.overripe_brondolan)),
    overripe_brondolan_kg: isNaNToZero(data.overripe_brondolan_kg),
    pv: isNaNToZero(parseFloat(data.pv)),
    sand_fruit: isNaNToZero(parseInt(data.sand_fruit)),
    sand_fruit_kg: isNaNToZero(data.sand_fruit_kg),
    second_w: isNaNToZero(parseInt(data.second_w)),
    spb_date: data.spb_date !== '' ? new Date(data.spb_date) : null,
    spb_weight: isNaNToZero(parseInt(data.spb_weight)),
    total_brondolan: isNaNToZero(parseInt(data.total_brondolan)),
    total_bunch: isNaNToZero(parseInt(data.total_bunch)),
    water: isNaNToZero(parseFloat(data.water)),
    water_kg: isNaNToZero(data.water_kg),
    young_fruit: isNaNToZero(parseInt(data.young_fruit)),
    young_fruit_kg: isNaNToZero(data.young_fruit_kg)
  })
}

export const trimPayload = (payload, parity) => {
  const result = {}
  Object.keys(payload).map((items) => {
    if (parity.find((e) => e === items)) {
      result[items] = payload[items]
    }
    return null
  })
  return { ...payload, ...result }
}

export const noPol = (text) => {
  if (typeof text !== 'string' || !text) return ''

  const result = text.replace(/\s/g, '')
  return result.toUpperCase()
}

export const filteringData = (datas, key) => {
  return datas.reduce((result, value) => {
    result[value[key]] = result[value[key]] || []
    result[value[key]].push(value)
    return result
  }, Object.create(null))
}

export const filteringTwoKeys = (datas, key1, key2) => {
  return datas.reduce((r, o, i) => {
    const key = o[key1] + '-' + o[key2]
    r[key] = r[key] || []
    r[key].push(o)
    return r
  }, Object.create(null))
}

export const filteringTBSOnly = (datas) => {
  const tbs = ['TBS Inti', 'TBS Luar', 'TBS Plasma', 'Brondolan', 'USB']

  return filterItems(datas, tbs)
}

export const sumData = (datas, key) => {
  return datas.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue[key])
  }, 0)
}

const filterItems = (arr, query) => {
  return arr.filter((el) => query.includes(el.comodity_nm))
}

export const calculateByTBS = (value, form) => {
  const commodity = form?.values?.comodity_nm
  const {
    fresh_fruit,
    garbage,
    grading_brondolan,
    janjang_kosong,
    long_stalk,
    restan_overnight,
    overripe_brondolan,
    overripe_fruit,
    sand_fruit,
    young_fruit,
    water
  } = value

  let bjr = isNaNToZero(form.values?.bjr)
  let netto = isNaNToZero(form.values?.netto_w)
  let result = {}
  switch (commodity) {
    case 'TBS Plasma':
    case 'TBS Inti':
    case 'Brondolan':
      let tempRottenKg = Math.round(0.25 * ((overripe_fruit * bjr) / netto - 0.05) * netto) || 0
      let tempRottenBrondolan = Math.round((overripe_brondolan / 100) * (overripe_fruit + 0.25))
      result = {
        fresh_fruit_kg: Math.round(+fresh_fruit * bjr * 0.5),
        garbage_kg: Math.round(+garbage * 2),
        grading_brondolan_kg:
          grading_brondolan === 0 ? 0 : Math.round(0.3 * netto * (0.125 - grading_brondolan / 100)),
        janjang_kosong_kg: Math.round(+janjang_kosong * bjr),
        long_stalk_kg: Math.round(+long_stalk * bjr * 0.01),
        overripe_fruit_kg: tempRottenKg > 0 ? tempRottenKg : 0,
        restan_overnight_kg: Math.round((+restan_overnight / 100) * netto),
        overripe_brondolan_kg: tempRottenBrondolan > 0 ? tempRottenBrondolan : 0,
        water_kg: Math.round((+water / 100) * netto),
        sand_fruit_kg: Math.round(+sand_fruit * bjr * 0.7),
        young_fruit_kg: Math.round(+young_fruit * bjr * 0.5)
      }
      return result
    case 'TBS Luar':
      result = {
        fresh_fruit_kg: Math.round(+fresh_fruit * bjr),
        janjang_kosong_kg: Math.round(+janjang_kosong * bjr),
        long_stalk_kg: Math.round(+long_stalk * bjr),
        overripe_fruit_kg: Math.round(+overripe_fruit * bjr),
        sand_fruit_kg: Math.round(+sand_fruit * bjr),
        young_fruit_kg: Math.round(+young_fruit * bjr),
        garbage_kg: Math.round((+garbage / 100) * netto),
        grading_brondolan_kg: Math.round((+grading_brondolan / 100) * netto),
        restan_overnight_kg: Math.round((+restan_overnight / 100) * netto),
        overripe_brondolan_kg: Math.round((+overripe_brondolan / 100) * netto),
        water_kg: Math.round((+water / 100) * netto)
      }
      return result
    default:
      break
  }
}
