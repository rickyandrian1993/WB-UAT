import { useCallback } from 'react'
import { endpoints } from '../endpoints'
import ApiService from '../ApiService'
import { ToastNotification } from '../../components'
import { setStore } from '../../helpers/utility'
import { server_url } from '../../../package.json'

export default function MillController() {
  const getMillUser = useCallback((setMillUser) => {
    ApiService.jsonRequest(endpoints.getMillUser, {}, (response) => {
      if (response.isError === true || response.isError === 'Y')
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.isError
        })
      else {
        setMillUser(response.data.mill)
        setStore('mill', response.data)
      }
    })
  }, [])

  const getMillList = useCallback((loading, setMillList) => {
    loading(true)
    ApiService.jsonRequest(server_url + endpoints.getToken, {}, (response) => {
      if (response.isError === true || response.isError === 'Y') {
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.isError
        })
      } else {
        const payload = {
          locale: 'en',
          remote: '12.213.1.55',
          agent: 'mozzila',
          user: {},
          data: { token_request: response?.data?.token_request }
        }
        ApiService.jsonRequest(server_url + endpoints.getAllMill, payload, (response) => {
          if (response.isError === true || response.isError === 'Y') {
            ToastNotification({
              title: 'Kesalahan',
              message: response.message,
              isError: response.isError
            })
            setMillList([])
          } else {
            const millList = []
            response.data.forEach((mill) => {
              millList.push({ value: mill.cd, label: mill.nm, data: mill })
            })
            setMillList(millList)
          }
        })
      }
      loading(false)
    })
  }, [])

  const updateMillUser = useCallback((body, loading) => {
    ApiService.jsonRequest(endpoints.insertMill, body, (response) => {
      loading(true)
      if (response.isError === true || response.isError === 'Y')
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.isError
        })
      else window.location.reload()
      loading(false)
    })
  }, [])

  return { getMillUser, getMillList, updateMillUser }
}
