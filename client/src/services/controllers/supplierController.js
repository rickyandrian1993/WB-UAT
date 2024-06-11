/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react'
import { ToastNotification } from '../../components'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'

export default function SupplierController() {
  const getSupplierList = useCallback(async (callback) => {
    ApiService.jsonRequest(endpoints.getSupplier, {}, (response) => {
      if (response.isError)
        ToastNotification({
          title: response.isError ? 'Kesalahan' : 'Berhasil',
          message: response.message,
          isError: response.isError
        })
      else {
        const result = []
        response.data.forEach((data) => {
          result.push({ value: data.cd, label: data.name })
        })
        callback(result)
      }
    })
  }, [])

  const insertSupplierList = useCallback(async (payload, loading) => {
    ApiService.jsonRequest(endpoints.insertSupplier, payload, (response) => {
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

  return { getSupplierList, insertSupplierList }
}
