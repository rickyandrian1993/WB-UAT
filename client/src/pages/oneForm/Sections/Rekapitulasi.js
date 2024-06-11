import { Divider, Loader } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ColGrid, FormBox, ReportTableBox, ScaleGrid } from '../../../assets/style/styled'
import { numberFormat } from '../../../helpers/utility'
import { RekapitulasiController } from '../../../services'

const rekapColumn = {
  rekapCommodityColumn: [
    { name: 'Komoditi', selector: (row) => row.comodity_nm },
    { name: 'Total Kendaraan', selector: (row) => row.total_kendaraan },
    {
      name: 'Total Berat (Kg)',
      selector: (row) => row.total_berat,
      format: (row) => numberFormat(row.total_berat)
    }
  ],
  rekapSupplierColumn: [
    { name: 'Supplier', selector: (row) => row.supplier },
    { name: 'Total Trip', selector: (row) => row.total_kendaraan },
    {
      name: 'Total Berat (Kg)',
      selector: (row) => row.total_berat,
      format: (row) => numberFormat(row.total_berat)
    }
  ]
}

const Rekapitulasi = ({ loading }) => {
  const { rekapData } = RekapitulasiController()
  const [data, setData] = useState({
    rekap_commodity: [],
    rekap_supplier: []
  })

  useEffect(() => {
    rekapData((res) => setData(res))
  }, [loading])

  return (
    <FormBox style={{ marginTop: '16px' }}>
      <ScaleGrid>
        <Divider label="Rekapitulasi" />
        <ColGrid span={5}>
          <ReportTableBox>
            <DataTable
              columns={rekapColumn.rekapCommodityColumn}
              data={data.rekap_commodity}
              fixedHeader
              fixedHeaderScrollHeight="360px"
              progressPending={loading}
              progressComponent={<Loader color="#628B48" variant="bars" size="xl" mt={34} />}
            />
          </ReportTableBox>
        </ColGrid>
        <ColGrid span={7}>
          <ReportTableBox>
            <DataTable
              columns={rekapColumn.rekapSupplierColumn}
              data={data.rekap_supplier}
              fixedHeader
              fixedHeaderScrollHeight="360px"
              progressPending={loading}
              progressComponent={<Loader color="#628B48" variant="bars" size="xl" mt={34} />}
            />
          </ReportTableBox>
        </ColGrid>
      </ScaleGrid>
    </FormBox>
  )
}

export default Rekapitulasi
