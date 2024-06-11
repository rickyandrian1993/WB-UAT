import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastNotification } from '../../components'
import { setStore } from '../../helpers/utility'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'

export default function LoginController() {
  const navigate = useNavigate()

  const getToken = async (url, loading, callback) => {
    ApiService.jsonRequest(url + endpoints.getToken, {}, (e) => {
      if (e.isError === true || e.isError === 'Y') {
        ToastNotification({
          title: 'Kesalahan',
          message: e.message,
          isError: e.isError
        })
        loading(false)
      } else callback(e)
    })
  }

  const login = useCallback(
    (body, loading) => {
      loading(true)
      ApiService.jsonRequest(endpoints.login, body, (response) => {
        if (!response.isError) {
          const accountInfo = {
            user: response.data.user
          }
          setStore('isLogin', true)
          setStore('currentUser', body.username)
          setStore('accountInfo', accountInfo)
          navigate('/', { replace: true })
        }
        ToastNotification({
          title: response.isError ? 'Kesalahan' : 'Berhasil',
          message: response.message,
          isError: response.isError
        })
        loading(false)
      })
    },
    [navigate]
  )

  const loginServer = useCallback((url, payload, callback) => {
    ApiService.jsonRequest(url + endpoints.loginServer, payload, (response) => {
      callback(response)
    })
  }, [])

  const logoutServer = useCallback(async (url, username, estateCd, callback) => {
    const payload = {
      locale: 'en_US',
      agent: 'mozzila',
      user: {
        user_id: username,
        estate_cd: estateCd
      },
      data: {}
    }
    await ApiService.jsonRequest(url + endpoints.logoutServer, payload, (response) => {
      callback(response)
    })
  }, [])

  const validateFingerPassword = useCallback(async (password, callback) => {
    const payload = { password }
    await ApiService.jsonRequest(endpoints.fingerSetting, payload, (res) => {
      if (res.isError === true || res.isError === 'Y')
        ToastNotification({
          title: 'Kesalahan',
          message: res.message,
          isError: res.isError
        })
      else {
        ToastNotification({
          title: 'Berhasil',
          message: res.message,
          isError: res.isError
        })
        callback(true)
      }
    })
  }, [])

  const getCredentialList = useCallback(async (callback) => {
    await ApiService.jsonRequest(endpoints.credentialList, {}, (res) => {
      if (res.isError === true || res.isError === 'Y')
        ToastNotification({
          title: 'Kesalahan',
          message: res.message,
          isError: res.isError
        })
      else callback(res.data)
    })
  }, [])

  return { getToken, login, loginServer, getCredentialList, logoutServer, validateFingerPassword }
}
