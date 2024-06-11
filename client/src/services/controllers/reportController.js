import moment from 'moment'
import { useCallback } from 'react'
import { ToastNotification } from '../../components'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'

export default function ReportController() {
  const getReport = useCallback((payload, loading, callback) => {
    loading(true)
    ApiService.jsonRequest(
      endpoints.getReport,
      {
        ...payload,
        date: moment(payload.date).format('Y-MM-DD')
      },
      (response) => {
        if (response.isError === true || response.isError === 'Y') {
          ToastNotification({
            title: 'Kesalahan',
            message: response.message,
            isError: response.isError
          })
        } else callback(response.data)
        loading(false)
      }
    )
  }, [])

  const getReportData = useCallback((payload, callback) => {
    ApiService.jsonRequest(
      endpoints.getReportData,
      {
        ...payload,
        startDate: moment(payload.startDate).format('Y-MM-DD'),
        endDate: moment(payload.endDate).format('Y-MM-DD')
      },
      (response) => {
        if (response.isError === true || response.isError === 'Y') {
          ToastNotification({
            title: 'Kesalahan',
            message: response.message,
            isError: response.isError
          })
        } else {
          if (
            ['TBS Luar', 'TBS Plasma', 'USB', 'TBS Inti', 'Brondolan'].includes(payload.commodity)
          )
            callback(response)
          else callback(response.data)
        }
      }
    )
  }, [])

  const getUploadList = useCallback((payload, loading, callback) => {
    const from_date = moment(payload.from_date).format('Y-MM-DD')
    const thru_date = moment(payload.thru_date).format('Y-MM-DD')
    loading(true)
    ApiService.jsonRequest(endpoints.getListUploadData, { from_date, thru_date }, (response) => {
      if (response.isError === true || response.isError === 'Y') {
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.isError
        })
      } else callback(response.data)
      loading(false)
    })
  }, [])

  const uploadData = useCallback(async (payload, loading) => {
    loading(true)
    await ApiService.jsonRequest(endpoints.uploadData, payload, (response) => {
      if (response.isError === true || response.isError === 'Y') {
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.isError
        })
      } else {
        ToastNotification({
          title: 'Berhasil',
          message: response.message,
          isError: response.isError
        })
      }
      loading(false)
    })
  }, [])

  return { getReport, getReportData, getUploadList, uploadData }
}
