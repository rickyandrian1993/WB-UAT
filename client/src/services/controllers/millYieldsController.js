import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastNotification } from '../../components'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'

export default function LoginController() {
  const navigate = useNavigate()

  const insertData = useCallback((body, loading, callback) => {
    if (!body.data.first_w) {
      ToastNotification({
        title: 'Kesalahan',
        message: 'Timbangan pertama tidak boleh kosong',
        isError: true
      })
      return
    }

    loading(true)
    ApiService.jsonRequest(endpoints.inputData, body, (response) => {
      if (response.isError === true || response.isError === 'Y')
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.isError
        })
      else {
        ToastNotification({
          title: 'Berhasil',
          message: response.message,
          isError: response.isError
        })
      }
      loading(false)
      callback(response)
    })
  }, [])

  const deleteData = useCallback((body, loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.deleteMillYield, body, (response) => {
      if (response.isError === true || response.isError === 'Y')
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.isError
        })
      else {
        ToastNotification({
          title: 'Berhasil',
          message: response.message,
          isError: response.isError
        })
      }
      loading(false)
      callback(response)
    })
  }, [])

  const updateData = useCallback(
    (body, loading) => {
      if (
        parseInt(body.first_w) === 0 ||
        parseInt(body.second_w) === 0 ||
        parseInt(body.netto_w) === 0
      ) {
        ToastNotification({
          title: 'Kesalahan',
          message: 'Data timbangan tidak boleh kosong',
          isError: true
        })
        return
      }
      loading(true)
      ApiService.jsonRequest(endpoints.updateData, body, (response) => {
        if (response.isError === true || response.isError === 'Y')
          ToastNotification({
            title: 'Kesalahan',
            message: response.message,
            isError: response.isError
          })
        else {
          ToastNotification({
            title: 'Berhasil',
            message: response.message,
            isError: response.isError
          })
          navigate('/print', {
            state: { type: 'TIKET', data: { ...body, ticket: response.ticket } }
          })
        }
        loading(false)
      })
    },
    [navigate]
  )

  const getScaleHistory = useCallback((body, loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.getScaleHistory, body, (response) => {
      if (response.isError === true || response.isError === 'Y')
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.isError
        })
      else callback(response.data)
      loading(false)
    })
  }, [])

  return { getScaleHistory, deleteData, insertData, updateData }
}
