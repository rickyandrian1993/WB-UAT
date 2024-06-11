import { useCallback } from 'react'
import { endpoints } from '../endpoints'
import ApiService from '../ApiService'
import { ToastNotification } from '../../components'

export default function SerialPortController() {
  const getConnOpt = useCallback((loading, callback) => {
    ApiService.jsonRequest(endpoints.getConnectionOption, {}, (response) => {
      loading(true)
      if (response.isError)
        ToastNotification({
          title: response.isError ? 'Kesalahan' : 'Berhasil',
          message: response.message,
          isError: response.isError
        })
      else callback(response.data)
      loading(false)
    })
  }, [])

  const updateConnOpt = useCallback((body, loading, callback) => {
    ApiService.jsonRequest(endpoints.updateConnectionOption, body, (response) => {
      loading(true)
      callback(response)
      ToastNotification({
        title: response.isError ? 'Kesalahan' : 'Berhasil',
        message: response.message,
        isError: response.isError
      })
      loading(false)
    })
  }, [])

  return { getConnOpt, updateConnOpt }
}
