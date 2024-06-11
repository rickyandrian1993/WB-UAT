import { LoadingOverlay } from '@mantine/core'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PrintWrapper } from '../../../assets/style/styled'
import useDropdown from '../../../hooks/useDropdown.js'
import Footer from './components/Footer'
import Header from './components/Header'
import PrintCommodityContent from './components/PrintCommodityContent.js'
import PrintTbsIntiContent from './components/PrintIntiContent'
import PrintNonCommodityContent from './components/PrintNonCommodityContent.js'
import PrintTbsPlasmaContent from './components/PrintPlasmaContent'
import PrintTbsLuarContent from './components/PrintTbsLuarContent'
import SPBContent from './components/SPBContent'

export default function Print() {
  const { commodity } = useDropdown()
  const navigate = useNavigate()
  const { state } = useLocation()

  const printFunc = async () => window.print()

  useEffect(() => {
    if (!state) navigate(-1)
    else if (commodity.length > 0) printFunc().then(() => navigate(-1))
  }, [state, navigate, commodity])

  const printContent = (value) => {
    const findGroup = commodity.find((item) => item.value === value)?.group

    switch (findGroup) {
      case 'TBS':
        if (value === 'TBS Luar' || value === 'USB')
          return <PrintTbsLuarContent data={state?.data} />
        else if (value === 'TBS Plasma') return <PrintTbsPlasmaContent data={state?.data} />
        else return <PrintTbsIntiContent data={state?.data} />
      case 'NC':
        return <PrintNonCommodityContent data={state?.data} />
      case 'CPC':
        return <PrintCommodityContent data={state?.data} />
      default:
        return
    }
  }

  return (
    <div style={{ position: 'relative', borderRadius: '16px' }}>
      {state && (
        <PrintWrapper id="print-section">
          {state?.type !== 'SPB' && <Header data={state?.data} />}
          {state?.type === 'SPB' && commodity.includes(state?.data?.mt_comodity_cd) && (
            <SPBContent data={state?.data} />
          )}
          {state?.type === 'TIKET' && printContent(state?.data?.mt_comodity_cd)}
          <Footer data={state?.data} status={state?.status} />
        </PrintWrapper>
      )}
      <LoadingOverlay
        visible={true}
        loaderProps={{ size: 'xl', color: '#628B48', variant: 'bars' }}
        overlayColor="#e1ffb1 !important"
        radius={16}
      />
    </div>
  )
}
