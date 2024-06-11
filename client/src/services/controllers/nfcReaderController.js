import { object } from 'prop-types'
import { useCallback } from 'react'
import { ToastNotification } from '../../components'
import { getStore, nfcParse } from '../../helpers/utility'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'
import DataMappingController from './dataMappingController'

export default function SerialPortController() {
  const { mapData } = DataMappingController()

  const readNFC = useCallback(
    async (isGrading, loading, form, customer = []) => {
      const { mill } = getStore('mill')
      loading(true)
      ApiService.jsonRequest(endpoints.readNfc, {}, ({ isError, data, message }) => {
        if (isError === true || isError === 'Y') {
          if (data === 'card off')
            ToastNotification({
              title: 'NFC Error',
              message: 'Kartu NFC tidak terdeteksi!',
              isError: isError
            })
          else
            ToastNotification({
              title: 'NFC Error',
              message: message || 'NFC Reader tidak tersambung!',
              isError: isError
            })
        } else {
          nfcParse(isGrading, data, form.values?.pcc_evacuation_activity_cd, (response) => {
            Object.keys(response).map((items) => {
              if (items !== 'disortasi_worker_cd' && isGrading)
                form.setFieldValue(items, +response[items])
              else if (typeof response[items] !== object) {
                if (items === 'pcc_mill_cd') {
                  const findCust = customer.find((val) => val.label === mill.nm)
                  if (findCust) form.setFieldValue('pcc_customer_cd', findCust.value)
                }
                form.setFieldValue(items, response[items])
              }

              return null
            })
          }).then((e) => {
            if (e) {
              let { pcc_estate_cd, driver_cd, loader_cd, estate_level_cd } = e
              let payload = {
                estate_cd: pcc_estate_cd,
                driver_cd,
                loader: loader_cd,
                estate_level: estate_level_cd[0]
              }
              mapData(payload, form)
            }
          })
        }
        loading(false)
      })
    },
    [mapData]
  )

  return { readNFC }
}
