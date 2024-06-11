import moment from 'moment'
import { defaultKeyInitialValue } from '../constants/basePayload'
import { dateFormat, getStore, trimPayload } from './utility'

const submiter = (values) => {
  const trimmedValue = trimPayload(values, defaultKeyInitialValue)
  const { user } = getStore('accountInfo')
  const { mill } = getStore('mill')

  const firstWeightPayload = () => {
    const payload = {
      data: {
        ...(values.comodity_nm === 'TBS Inti' || values.comodity_nm === 'Brondolan'
          ? trimmedValue
          : values),
        ...{
          do_date: values.do_date && dateFormat(values.do_date, 'Y-MM-DD'),
          spb_date: values.spb_date && dateFormat(values.spb_date, 'Y-MM-DD'),
          created_dt:
            values.comodity_nm === 'TBS Inti' || values.comodity_nm === 'Brondolan'
              ? moment.unix(values.created_dt / 1000).format('Y-MM-DD HH:mm:ss')
              : moment().format('Y-MM-DD HH:mm:ss'),
          ...(values.comodity_nm === 'TBS Inti' || values.comodity_nm === 'Brondolan'
            ? {
                nfc_received: 'Y',
                nfc_received_dt: moment().format('Y-MM-DD HH:mm:ss'),
                mt_comodity_cd: values.comodity_nm
              }
            : null)
        },
        pcc_estate_cd: values.comodity_nm !== 'TBS INTI' ? user?.estate : values.pcc_estate_cd,
        pcc_wrkr_cd_driver:
          values.comodity_nm === 'TBS Inti'
            ? values.pcc_wrkr_cd_driver
            : values.driver_nm.replace("'", "''"),
        driver_nm: values.driver_nm.replace("'", "''"),
        loader_nm: values.loader_nm.replace("'", "''"),
        loader_nm_2: values.loader_nm_2.replace("'", "''"),
        loader_nm_3: values.loader_nm_3.replace("'", "''"),
        created_by: user?.cd,
        mill_nm: mill?.nm,
        pcc_mill_cd: mill?.cd,
        mill_arrive_dt: moment().format('Y-MM-DD HH:mm:ss'), // Mill
        wb_arrive_dt: moment().format('Y-MM-DD HH:mm:ss'),
        wb_created_by: user?.cd,
        wb_created_dt: moment().format('Y-MM-DD HH:mm:ss')
      },
      ...(!values?.child_data ? { evac_act_dtl: {} } : { evac_act_dtl: values?.child_data })
    }
    delete payload.data.driver_cd
    delete payload.data.loader_cd
    delete payload.data.estate_level_cd
    delete payload.data.child_data
    delete payload.data.customer_nm

    return payload
  }

  const secondWeightPayload = () => {
    const payload = {
      ...(values.comodity_nm === 'TBS Inti' || values.comodity_nm === 'Brondolan'
        ? trimmedValue
        : values),
      cd: values.cd,
      customer_nm: values.customer_nm,
      do_date: values.do_date === null ? null : dateFormat(values.do_date, 'Y-MM-DD'),
      first_update: values.first_update || moment().format('Y-MM-DD HH:mm:ss'),
      mt_comodity_cd: values.comodity_nm,
      spb_date: values.spb_date === null ? null : dateFormat(values.spb_date, 'Y-MM-DD'),
      updated_dt: moment().format('Y-MM-DD HH:mm:ss'),
      updated_by: user?.cd
    }

    return payload
  }

  return { firstWeightPayload, secondWeightPayload }
}

export default submiter
