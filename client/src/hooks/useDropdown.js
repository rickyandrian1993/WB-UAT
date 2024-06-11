import { useEffect, useState } from 'react'
import { getStore } from '../helpers/utility'

function useDropdown() {
  const { commodity, customer } = getStore('mill')
  const [dropdown, setDropdown] = useState({
    commodity: [],
    customer: []
  })

  useEffect(() => {
    const commodityTemp = [],
      customerTemp = []

    commodity?.forEach((e) => {
      commodityTemp.push({
        value: e?.cd,
        label: e?.name,
        group: e?.group_category,
        code: e?.transaction_code
      })
    })

    customer?.forEach((e) => {
      customerTemp.push({ value: e.cd, label: e.nm })
    })

    setDropdown({
      commodity: commodityTemp,
      customer: customerTemp
    })
  }, [])

  return dropdown
}

export default useDropdown
