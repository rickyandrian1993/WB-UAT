import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastNotification } from '../../components'
import { setStore } from '../../helpers/utility'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'

const error = {
  'Network Error': 'Service gangguan',
  'nullBad Scan Result': 'Gagal mendapatkan biometric',
  'Failed to Connect': 'Device biometric tidak tersambung'
}

export default function FingerPrintController() {
  const navigate = useNavigate()

  const fingerAuth = useCallback((loading, callback) => {
    ApiService.jsonRequest(endpoints.authFinger, {}, (response) => {
      if (response.isError === 'Y' || response.isError === true) {
        ToastNotification({
          title: 'Kesalahan',
          message: error[response.message] || response.message,
          isError: true
        })
      } else callback(response.data)
      loading(false)
    })
  }, [])

  const fingerValidate = useCallback((loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.validateFinger, {}, (response) => {
      if (response.isError === 'Y' || response.isError === true) {
        ToastNotification({
          title: 'Kesalahan',
          message: 'Fingerprint Tidak Terdaftar',
          isError: true
        })
        callback(response)
      } else callback(response)
      loading(false)
    })
  }, [])

  const fingerInsert = useCallback(async (payload, callback) => {
    ApiService.jsonRequest(endpoints.registerFinger, payload, async (response) => {
      if (response.isError === 'Y' || response.isError === true)
        ToastNotification({
          title: 'Kesalahan',
          message: response?.message,
          isError: true
        })
      else {
        callback(response.data)
        ToastNotification({
          title: 'Berhasil',
          message: 'Pendaftaran Fingerprint Berhasil',
          isError: false
        })
      }
    })
  }, [])

  const userBiometricDelete = useCallback((payload, loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.deleteUserBiometric, payload, (response) => {
      if (response.isError === 'Y' || response.isError === true)
        ToastNotification({
          title: 'Kesalahan',
          message: 'Gagal Menghapus Biometric Fingerprint',
          isError: true
        })
      else {
        ToastNotification({
          title: 'Berhasil',
          message: 'Fingerprint Berhasil Dihapus',
          isError: false
        })
        callback(false)
      }
      loading(false)
    })
  }, [])

  const userBiometricIdentify = useCallback(
    (loading) => {
      loading(true)
      ApiService.jsonRequest(endpoints.identifyUserBiometric, {}, (response) => {
        if (response.is_error || response.isError === 'Y' || response.isError === true)
          ToastNotification({
            title: 'Kesalahan',
            message: 'Biometric Tidak Terdaftar',
            isError: true
          })
        else {
          ToastNotification({
            title: 'Berhasil',
            message: `Selamat Datang ${response.data.nm}`,
            isError: false
          })
          const accountInfo = {
            user: { nm: response.data.nm, cd: response.data.cd, bm: true }
          }
          setStore('isLogin', true)
          setStore('accountInfo', accountInfo)
          navigate('/', { replace: true })
        }
        loading(false)
      })
    },
    [navigate]
  )

  const userBiometricCreate = useCallback((payload, loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.registerUserBiometric, payload, (response) => {
      if (response.isError === 'Y' || response.isError === true)
        ToastNotification({
          title: 'Kesalahan',
          message: 'Gagal Menyimpan Biometric Fingerprint',
          isError: response.isError
        })
      else {
        ToastNotification({
          title: 'Berhasil',
          message: 'Pendaftaran Fingerprint Berhasil',
          isError: response.isError
        })
        callback(true)
      }
      loading(false)
    })
  }, [])

  return {
    fingerAuth,
    fingerValidate,
    fingerInsert,
    userBiometricDelete,
    userBiometricCreate,
    userBiometricIdentify
  }
}
