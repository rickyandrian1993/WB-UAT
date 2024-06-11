import { Select } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ColGrid, ScaleGrid } from '../../../../assets/style/styled'
import { SupplierController } from '../../../../services'
import { ReportSectionContent } from '../../ReportStyles'
import Rincian from './Rincian'

export default function TbsLuarPlasmaUSBReport(props) {
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

  return (
    <ReportSectionContent>
      <ScaleGrid align="center" style={{ padding: '16px 0px' }}>
        <ColGrid span={2}>
          <Select
            label="Supplier"
            placeholder="Supplier"
            searchable
            clearable
            data={supplier}
            value={payload.supplier}
            size="sm"
            nothingFound="Tidak ada data."
            onChange={(supplier) => setPayload({ ...payload, supplier: supplier ?? '' })}
          />
        </ColGrid>
      </ScaleGrid>
      <ScaleGrid align="center">
        <ColGrid>
          {dataReport?.length < 1 && (
            <h3 style={{ display: 'flex', justifyContent: 'center' }}>Tidak Ada Data.</h3>
          )}
          {dataReport?.length > 0 && <Rincian {...props} />}
        </ColGrid>
      </ScaleGrid>
    </ReportSectionContent>
  )
}

TbsLuarPlasmaUSBReport.propTypes = {
  data: PropTypes.any,
  payloads: PropTypes.object
}
