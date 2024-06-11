import { Button, LoadingOverlay, Select, Space } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import React, { useState } from 'react'
import { ColGrid, FormGroup, ReportHeader, ScaleGrid } from '../../assets/style/styled'
import { ToastNotification } from '../../components'
import useDropdown from '../../hooks/useDropdown'
import { ReportController } from '../../services'
import AllReportData from './pdf/allReport'
import Commodity from './pdf/commodity'
import NonCommodity from './pdf/nonCommodity'
import TBSIntiReport from './pdf/tbsInti'
import TbsLuarPlasmaUSBReport from './pdf/tbsLuarPlasmaUSB'

export default function Report() {
  const dropdown = useDropdown()
  const { getReportData } = ReportController()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [payload, setPayload] = useState({
    commodity: '',
    estate: '',
    supplier: '',
    customer: '',
    startDate: new Date(),
    endDate: new Date()
  })

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
    }
  }

  const globalSearchHandler = () => {
    setLoading(true)
    getReportData(payload, (res) => {
      setData(res)
      setLoading(false)
    })
  }

  const reportContent = (value) => {
    const findGroup = dropdown.commodity.find((item) => item.value === value)?.group

    switch (findGroup) {
      case 'TBS':
        if (value === 'TBS Inti' || value === 'Brondolan')
          return <TBSIntiReport data={data} payloads={{ payload, setPayload }} />
        else return <TbsLuarPlasmaUSBReport data={data} payloads={{ payload, setPayload }} />
      case 'NC':
        return <NonCommodity data={data} payload={payload} />
      case 'CPC':
        return <Commodity data={data} payloads={{ payload, setPayload }} />
      default:
        return <AllReportData data={data} payload={payload} />
    }
  }

  return (
    <>
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <ScaleGrid align="center">
        <ColGrid>
          <ReportHeader>
            <ScaleGrid align="center" justify={'space-between'}>
              <ColGrid span={12}>
                <ScaleGrid>
                  <ColGrid span={2}>
                    <Select
                      rightSection={<i className="ri-arrow-down-s-line"></i>}
                      styles={{ rightSection: { pointerEvents: 'none' } }}
                      label="Komoditi"
                      placeholder="Komoditi"
                      required
                      withAsterisk
                      searchable
                      data={[
                        { label: 'Semua', value: 'all', group: 'Semua' },
                        ...dropdown.commodity
                      ]}
                      size="sm"
                      nothingFound="Tidak ada data."
                      onChange={(val) => {
                        const findGroup = dropdown.commodity.find(
                          (item) => item.value === val
                        )?.group
                        setPayload({
                          ...payload,
                          customer: '',
                          estate: '',
                          supplier: '',
                          commodity: val,
                          group: findGroup
                        })
                        setData([])
                      }}
                    />
                  </ColGrid>
                  {payload.commodity === 'all' && (
                    <ColGrid span={2}>
                      <DatePicker
                        label="Tanggal"
                        placeholder="Tanggal"
                        locale="id"
                        value={payload.startDate}
                        icon={<i className="ri-calendar-event-line" />}
                        onChange={(e) => {
                          setPayload({ ...payload, startDate: e })
                        }}
                      />
                    </ColGrid>
                  )}
                  {payload.commodity !== 'all' && (
                    <ColGrid span={4}>
                      <FormGroup>
                        <DatePicker
                          withAsterisk
                          label="Filter Date"
                          placeholder="Tanggal Mulai"
                          locale="id"
                          value={payload.startDate}
                          icon={<i className="ri-calendar-event-line" />}
                          onChange={(e) => {
                            validateDateFilter(e, payload.endDate)
                            setPayload({ ...payload, startDate: e })
                          }}
                        />
                        <DatePicker
                          placeholder="Tanggal Akhir"
                          locale="id"
                          value={payload.endDate}
                          icon={<i className="ri-calendar-event-line" />}
                          onChange={(e) => {
                            validateDateFilter(payload.startDate, e)
                            setPayload({ ...payload, endDate: e })
                          }}
                        />
                      </FormGroup>
                    </ColGrid>
                  )}
                  <ColGrid span={2}>
                    <Button
                      onClick={globalSearchHandler}
                      leftIcon={<i className="ri-file-search-line"></i>}
                    >
                      Cari
                    </Button>
                  </ColGrid>
                </ScaleGrid>
                <Space h="md" />
              </ColGrid>
            </ScaleGrid>
          </ReportHeader>
        </ColGrid>
      </ScaleGrid>

      {!loading && reportContent(payload.commodity)}
    </>
  )
}
