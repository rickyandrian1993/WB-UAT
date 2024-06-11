import { useCallback } from 'react'
import { ToastNotification } from '../../components'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'

export default function RekapitulasiController() {
  const rekapData = useCallback(async (callback) => {
    ApiService.jsonRequest(
      endpoints.getRekapData,
      {},
      (response) => {
        if (response.isError)
          ToastNotification({
            title: response.isError ? 'Kesalahan' : 'Berhasil',
            message: response.message,
            isError: response.isError
          })
        else callback(response.data)
      },
      []
    )
  }, [])

  return { rekapData }
}
