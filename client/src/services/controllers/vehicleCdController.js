import { useCallback } from 'react'
import { ToastNotification } from '../../components'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'

export default function VehicleCdController() {
  const getVehicleCd = useCallback(async (callback) => {
    ApiService.jsonRequest(endpoints.getVehicleList, {}, (response) => {
      if (response.isError)
        ToastNotification({
          title: response.isError ? 'Kesalahan' : 'Berhasil',
          message: response.message,
          isError: response.isError
        })
      else {
        const result = []
        response.data.forEach((data) => {
          result.push({ value: data.cd, label: data.cd })
        })
        callback(result)
      }
    })
  }, [])

  const insertVehicleCd = useCallback(async (payload, loading) => {
    ApiService.jsonRequest(endpoints.insertVehicleLocal, payload, (response) => {
      loading(true)
      if (response.isError)
        ToastNotification({
          title: response.isError ? 'Kesalahan' : 'Berhasil',
          message: response.message,
          isError: response.isError
        })
      else {
        loading(false)
      }
    })
  }, [])
  return { getVehicleCd, insertVehicleCd }
}
