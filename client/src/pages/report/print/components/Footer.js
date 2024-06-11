import { Flex, Grid } from '@mantine/core'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { getStore } from '../../../../helpers/utility'

export default function Footer({ data, status }) {
  const { mill } = getStore('mill')
  const { driver_nm, wb_created_by, mt_comodity_cd } = data

  const styledAlign = {
    center: { textAlign: 'center' }
  }

  return (
    <StyledContent>
      <Grid columns={24}>
        <Grid.Col span={6} style={styledAlign.center}>
          Diketahui Oleh
        </Grid.Col>
        <Grid.Col span={6} style={styledAlign.center}>
          Penimbang
        </Grid.Col>
        <Grid.Col span={6} style={styledAlign.center}>
          Supir
        </Grid.Col>
        <Grid.Col span={6} style={styledAlign.center}>
          {mt_comodity_cd === 'Kernel' ? 'Diperiksa Oleh' : 'Diterima Oleh'}
        </Grid.Col>
      </Grid>
      <Grid columns={24} style={{ marginTop: '20px' }}>
        <Grid.Col span={6} style={styledAlign.center}>
          {mill?.mill_manager || '-'}
        </Grid.Col>
        <Grid.Col span={6} style={styledAlign.center}>
          {wb_created_by}
        </Grid.Col>
        <Grid.Col span={6} style={styledAlign.center}>
          {driver_nm}
        </Grid.Col>
        <Grid.Col span={6} style={styledAlign.center}>
          {mt_comodity_cd === 'Kernel' ? '' : '(________________)'}
        </Grid.Col>
      </Grid>
      <Grid columns={24} style={{ marginTop: '-20px' }}>
        <Grid.Col span={6} style={styledAlign.center}>
          Mill Manager
        </Grid.Col>
        <Grid.Col span={6} style={styledAlign.center}>
          Penimbang
        </Grid.Col>
        <Grid.Col span={6} style={styledAlign.center}>
          Supir
        </Grid.Col>
        <Grid.Col span={6} style={styledAlign.center}>
          {mt_comodity_cd === 'Kernel' ? 'KA. Kantor' : ''}
        </Grid.Col>
      </Grid>
      <Flex
        justify="space-between"
        align="center"
        style={{ margin: '12px 10px 0 10px', fontStyle: 'italic' }}
      >
        <div>Status : {status ? status : 'online'}</div>
        <div>Tgl Print: {moment().format('DD/MM/YY HH:mm:ss')}</div>
      </Flex>
    </StyledContent>
  )
}

const StyledContent = styled.div`
  margin: 0 26px;
`

Footer.propTypes = {
  data: PropTypes.object
}
