import { useCallback } from 'react'
import { ToastNotification } from '../../components'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'

export default function LoginController() {
  const getTimbanganData = useCallback((loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.getTimbanganData, {}, (response) => {
      if (response.isError === true || response.isError === 'Y')
        ToastNotification({
          title: 'Kesalahan',
          message: response.message === 'Network Error' ? 'Service gangguan' : response.message,
          isError: response.isError
        })
      else callback(response.data)
      loading(false)
    })
  }, [])

  return { getTimbanganData }
}
