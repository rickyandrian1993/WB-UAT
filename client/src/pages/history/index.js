import { Button, Loader, Select, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import DataTable from 'react-data-table-component'
import { ColGrid, ReportHeader, ReportTableBox, ScaleGrid } from '../../assets/style/styled'
import { ToastNotification } from '../../components'
import { label } from '../../constants'
import { columns } from '../../constants/headerTable'
import { generateHeader, parseCSVData } from '../../helpers/utility'
import useDropdown from '../../hooks/useDropdown'
import { ReportController } from '../../services'

const Expand = ({ data }) => {
  const {
    wb_arrive_dt,
    estate_nm,
    total_bunch,
    ekspedisi_nm,
    customer_nm,
    seal_number,
    cut,
    after_cut,
    bjr
  } = data
  const extra = {
    estate_nm,
    total_bunch,
    ekspedisi_nm,
    customer_nm,
    seal_number,
    cut,
    after_cut,
    bjr
  }

  return (
    <ScaleGrid justify="space-between" px={12}>
      {Object.keys(extra).map((items, i) => (
        <ColGrid span="content" key={`${wb_arrive_dt}-${items}-${i}`}>
          <p>{label[items]}</p>
          <p>{extra[items] ?? '-'}</p>
        </ColGrid>
      ))}
    </ScaleGrid>
  )
}

export default function History() {
  const { getReport } = ReportController()
  const { commodity } = useDropdown()
  const [data, setData] = useState([])
  const [dataFilter, setDataFilter] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFilter, setIsFilter] = useState(false)
  const [payload, setPayload] = useState({
    commodity: 'all',
    date: new Date()
  })

  const handleChangeData = useCallback(({ results }) => setData(results), [payload])

  const validateDateFilter = (start) => {
    if (start === null) {
      ToastNotification({
        title: 'Kesalahan',
        message: 'Tanggal tidak boleh kosong!',
        isError: true
      })
      setData([])
    } else setLoading(true)
  }

  useEffect(() => {
    if (loading) getReport(payload, setLoading, handleChangeData)
  }, [getReport, handleChangeData, loading, payload])

  const filterDataHandler = (e) => {
    const val = e.target.value
    if (val) {
      setIsFilter(true)
      const filteredData = data.filter((i) => i.ticket.includes(val))
      setDataFilter(filteredData)
    } else {
      setIsFilter(false)
      setDataFilter([])
    }
  }

  return (
    <ScaleGrid align="center">
      <ColGrid>
        <ReportHeader>
          <ScaleGrid align="center" justify={'space-between'}>
            <ColGrid span={6}>
              <ScaleGrid>
                <ColGrid span={4}>
                  <Select
                    value={payload.commodity}
                    rightSection={<i className="ri-arrow-down-s-line"></i>}
                    styles={{ rightSection: { pointerEvents: 'none' } }}
                    label="Komoditi"
                    placeholder="Komoditi"
                    searchable
                    data={[{ label: 'Semua', value: 'all', group: 'Semua' }, ...commodity]}
                    size="sm"
                    nothingFound="Tidak ada data."
                    onChange={(commodity) => {
                      setPayload({ ...payload, commodity })
                      setLoading(true)
                    }}
                  />
                </ColGrid>
                <ColGrid span={4}>
                  <DatePicker
                    label="Filter Date"
                    placeholder="Tanggal Mulai"
                    locale="id"
                    value={payload.date}
                    icon={<i className="ri-calendar-event-line" />}
                    onChange={(e) => {
                      validateDateFilter(e)
                      setPayload((prev) => ({ ...prev, date: e }))
                    }}
                  />
                </ColGrid>
                <ColGrid span={4}>
                  <TextInput
                    label="Cari Ticket Number"
                    placeholder="Ticket Number"
                    onChange={filterDataHandler}
                  />
                </ColGrid>
              </ScaleGrid>
            </ColGrid>
            {data.length > 0 && (
              <ColGrid span={'content'}>
                <CSVLink
                  data={parseCSVData(data)}
                  headers={generateHeader(label)}
                  separator=";"
                  filename={`Laporan Timbangan Detail ${moment(new Date()).format(
                    'DD-MM-YY HHmmss'
                  )}.csv`}
                >
                  <Button leftIcon={<i className="ri-download-2-line"></i>}>
                    Unduh CSV Detail
                  </Button>
                </CSVLink>
              </ColGrid>
            )}
          </ScaleGrid>
        </ReportHeader>
      </ColGrid>
      <ColGrid>
        <ReportTableBox>
          <DataTable
            columns={columns}
            data={isFilter ? dataFilter : data}
            expandableRowsComponent={Expand}
            direction="auto"
            expandOnRowClicked
            expandableRows
            expandableRowsHideExpander
            fixedHeaderScrollHeight="300px"
            highlightOnHover
            persistTableHead
            pagination
            progressPending={loading}
            progressComponent={<Loader color="#628B48" variant="bars" size="xl" mt={34} />}
            defaultSortFieldId
            pointerOnHover
            responsive
            subHeaderAlign="left"
            subHeaderWrap
          />
        </ReportTableBox>
      </ColGrid>
    </ScaleGrid>
  )
}
