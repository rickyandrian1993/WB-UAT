import { Badge } from '@mantine/core'
import React from 'react'
import { ActionsButton, UploadAction } from '../components'
import { dateFormat } from '../helpers/utility'
import { dateTimeHMS } from './dateFormat'

export const columns = [
  {
    name: 'Aksi',
    grow: 1.5,
    selector: (row) => <ActionsButton data={row} />
  },
  {
    name: 'Ticket Number',
    selector: (row) => row.ticket || '-'
  },
  {
    name: 'Tanggal Masuk',
    selector: (row) => (row.wb_arrive_dt ? dateFormat(row.wb_arrive_dt, dateTimeHMS) : '-'),
    sortable: true
  },

  {
    name: 'Tanggal Keluar',
    selector: (row) => (row.first_update ? dateFormat(row.first_update, dateTimeHMS) : '-'),
    sortable: true
  },
  {
    name: 'Komoditi',
    selector: (row) => row.comodity_nm ?? '-',
    sortable: true
  },
  {
    name: 'No. Polisi',
    selector: (row) => row.pcc_vehicle_cd ?? '-',
    sortable: true
  },
  {
    name: 'First Weight',
    selector: (row) => parseInt(row.first_w) || '-'
  },
  {
    name: 'Second Weight',
    selector: (row) => parseInt(row.second_w) || '-'
  },
  {
    name: 'Netto',
    selector: (row) => parseInt(row.netto_w) || '-'
  }
]

export const columnsSync = [
  {
    name: 'Aksi',
    selector: (row) => <UploadAction data={row} />
  },
  {
    name: 'Tanggal',
    selector: (row) => (row.tanggal ? dateFormat(row.tanggal, 'DD MMM Y') : '-')
  },
  {
    name: 'Records',
    selector: (row) => row.record ?? '-'
  },
  {
    name: 'Status',
    selector: (row) =>
      row.failed > 0 ? (
        <Badge color="red" size="xl">
          NOT UPLOAD
        </Badge>
      ) : (
        <Badge color="lime" size="xl">
          UPLOADED
        </Badge>
      )
  }
]
