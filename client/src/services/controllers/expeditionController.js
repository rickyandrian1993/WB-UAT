/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { ToastNotification } from '../../components'
import { getEstateList } from '../../helpers/utility'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'

export default function VendorController() {
  const estateList = getEstateList()
  const [vendor, setVendor] = useState([])

  useEffect(() => {
    ApiService.jsonRequest(endpoints.getVendorVehicle, { estateList }, (response) => {
      if (response.isError)
        ToastNotification({
          title: response.isError ? 'Kesalahan' : 'Berhasil',
          message: response.message,
          isError: response.isError
        })
      else {
        const vendors = []
        response.data?.forEach((data) => {
          vendors.push({ value: data.cd, label: data.nm })
        })
        setVendor(vendors)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { vendor }
}
