import React from 'react'
import { Divider, Grid, Title } from '@mantine/core'
import moment from 'moment'
import { getStore } from '../../../../helpers/utility'

export default function Header({ data }) {
  const { contract, comodity_nm, wb_arrive_dt, first_update } = data
  const {
    mill: { kop }
  } = getStore('mill')

  return (
    <>
      <Title
        style={{
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {kop || '-'}
      </Title>
      <Grid justify="space-evenly">
        <Grid.Col span="content">Kontrak: {contract || '-'}</Grid.Col>
        <Grid.Col span="content">
          Tgl. Masuk: {moment(wb_arrive_dt).format('DD/MM/YY HH:mm:ss')}
        </Grid.Col>
        <Grid.Col span="content">
          Tgl. Keluar: {moment(first_update).format('DD/MM/YY HH:mm:ss')}
        </Grid.Col>
        <Grid.Col span="content">Komoditi: {comodity_nm}</Grid.Col>
      </Grid>
      <Divider my={1} variant="dashed" />
    </>
  )
}
