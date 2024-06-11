import { DatePicker } from '@mantine/dates'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import {
  ColGrid,
  FormGroup,
  ReportHeader,
  ReportTableBox,
  ScaleGrid
} from '../../assets/style/styled'
import { ToastNotification } from '../../components'
import { columnsSync } from '../../constants/headerTable'
import { getLastWeekDate } from '../../helpers/utility'
import { ReportController } from '../../services'

export const OverlayContext = createContext(null)

export default function Sync() {
  const { getUploadList } = ReportController()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [payload, setPayload] = useState({
    from_date: getLastWeekDate(),
    thru_date: new Date()
  })

  const handleChangeData = useCallback((data) => setData(data), [])

  const validateDateFilter = (start, end) => {
    if (start === null || end === null) {
      ToastNotification({
        title: 'Kesalahan',
        message: 'Salah satu tanggal tidak boleh kosong',
        isError: true
      })
      setData([])
    } else if (start > end) {
      ToastNotification({
        title: 'Kesalahan',
        message: 'Tanggal mulai harus lebih kecil dari tanggal akhir',
        isError: true
      })
    } else setLoading(true)
  }

  useEffect(() => {
    if (loading) getUploadList(payload, setLoading, handleChangeData)
  }, [getUploadList, handleChangeData, loading, payload])

  return (
    <ScaleGrid align="center">
      <ColGrid>
        <ReportHeader>
          <ScaleGrid align="center" justify="space-between">
            <ColGrid span={5}>
              <FormGroup>
                <DatePicker
                  label="Filter Date"
                  placeholder="Tanggal Mulai"
                  locale="id"
                  value={payload.from_date}
                  icon={<i className="ri-calendar-event-line" />}
                  onChange={(e) => {
                    validateDateFilter(e, payload.thru_date)
                    setPayload({ ...payload, from_date: e })
                  }}
                />
                <DatePicker
                  placeholder="Tanggal Akhir"
                  locale="id"
                  value={payload.thru_date}
                  icon={<i className="ri-calendar-event-line" />}
                  onChange={(e) => {
                    validateDateFilter(payload.from_date, e)
                    setPayload({ ...payload, thru_date: e })
                  }}
                />
              </FormGroup>
            </ColGrid>
          </ScaleGrid>
        </ReportHeader>
      </ColGrid>
      <ColGrid>
        <ReportTableBox>
          <OverlayContext.Provider
            value={{ setUploadLoading, getUploadList, payload, handleChangeData }}
          >
            <DataTable
              columns={columnsSync}
              data={data}
              direction="auto"
              fixedHeaderScrollHeight="300px"
              highlightOnHover
              persistTableHead
              progressPending={loading || uploadLoading}
              defaultSortFieldId
              responsive
              subHeaderAlign="left"
              subHeaderWrap
            />
          </OverlayContext.Provider>
        </ReportTableBox>
      </ColGrid>
    </ScaleGrid>
  )
}
