import { Divider, Grid } from '@mantine/core'
import React from 'react'

function Remark({ data = '' }) {
  return (
    <>
      <Divider size={1} variant="dashed" />
      <Grid>
        <Grid.Col span={1}>Catatan</Grid.Col>
        <Grid.Col span={'content'}>:</Grid.Col>
        <Grid.Col span={'auto'}>{data}</Grid.Col>
      </Grid>
      <Divider size={1} variant="dashed" />
    </>
  )
}

Remark.propTypes = {}

export default Remark
