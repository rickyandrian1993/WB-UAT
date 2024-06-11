import { Select, Tabs } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import TbsIntiRincian from './TbsIntiRincian'
import TbsIntiRekap from './TbsIntiRekap'
import PropTypes from 'prop-types'
import { ColGrid, ScaleGrid } from '../../../../assets/style/styled'
import { SupplierController } from '../../../../services'
import { getEstateList } from '../../../../helpers/utility'
import { ReportSectionContent } from '../../ReportStyles'

export default function TBSIntiReport(props) {
  const {
    data,
    payloads: { payload, setPayload }
  } = props
  const { data: dataReport } = data
  const { getSupplierList } = SupplierController()
  const [supplier, setSupplier] = useState([])

  useEffect(() => {
    getSupplierList(setSupplier)
  }, [getSupplierList])
  const estate = getEstateList('select')

  return (
    <ReportSectionContent>
      <ScaleGrid align="center" style={{ padding: '16px 0px' }}>
        <ColGrid span={2}>
          <Select
            clearable
            label="Supplier"
            placeholder="Supplier"
            searchable
            data={supplier}
            value={payload.supplier}
            size="sm"
            nothingFound="Tidak ada data."
            onChange={(supplier) => setPayload({ ...payload, supplier: supplier ?? '' })}
          />
        </ColGrid>
        <ColGrid span={2}>
          <Select
            label="Estate"
            placeholder="Estate"
            searchable
            data={estate}
            value={payload.estate}
            size="sm"
            nothingFound="Tidak ada data."
            onChange={(estate) => setPayload({ ...payload, estate: estate ?? '' })}
          />
        </ColGrid>
      </ScaleGrid>
      <ScaleGrid align="center">
        <ColGrid>
          {dataReport?.length < 1 && (
            <h3 style={{ display: 'flex', justifyContent: 'center' }}>Tidak Ada Data.</h3>
          )}
          {dataReport?.length > 0 && (
            <Tabs defaultValue="rincian">
              <Tabs.List grow position="center">
                <Tabs.Tab value="rincian">
                  <h3>Rincian Penimbangan</h3>
                </Tabs.Tab>
                <Tabs.Tab value="rekap">
                  <h3>Rekapitulasi Penimbangan</h3>
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="rincian">
                <TbsIntiRincian {...props} />
              </Tabs.Panel>
              <Tabs.Panel value="rekap">
                <TbsIntiRekap {...props} />
              </Tabs.Panel>
            </Tabs>
          )}
        </ColGrid>
      </ScaleGrid>
    </ReportSectionContent>
  )
}

TBSIntiReport.propTypes = {
  data: PropTypes.any,
  payloads: PropTypes.object
}
