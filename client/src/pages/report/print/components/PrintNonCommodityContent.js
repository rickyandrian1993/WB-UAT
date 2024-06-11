import { Grid } from '@mantine/core'
import React from 'react'
import { PrintContent } from '../../../../assets/style/styled'
import PropTypes from 'prop-types'
import moment from 'moment'
import { numberFormat } from '../../../../helpers/utility'
import Remark from './Remark'

export default function PrintNonCommodityContent({ data }) {
  const {
    customer_nm,
    do_date,
    do_number,
    ekspedisi_nm,
    first_w,
    mill_nm,
    netto_w,
    pcc_vehicle_cd,
    remark1,
    second_w,
    spb_date,
    spb_number,
    supplier,
    ticket
  } = data

  const styledAlign = {
    right: { textAlign: 'right' }
  }

  return (
    <PrintContent>
      <Grid>
        <Grid.Col span={6}>
          <Grid>
            <Grid.Col span={4}>Ticket No.</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {ticket}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>Mill/Pabrik</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {mill_nm || '-'}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>Supplier</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {supplier || '-'}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>Customer</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {customer_nm || '-'}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>Ekspedisi</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {ekspedisi_nm || '-'}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>No. Polisi</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {pcc_vehicle_cd || '-'}
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={6}>
          <Grid>
            <Grid.Col span={4}>No/Tgl DO</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {do_number} - {do_date && moment(do_date).format('DD/MM/YY')}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>No/Tgl SPB</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {spb_number} - {spb_date && moment(spb_date).format('DD/MM/YY')}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>First Weight</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(first_w) || '-'} Kg
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>Second Weight</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(second_w) || '-'} Kg
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>Netto Weight</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(netto_w) || '-'} Kg
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
      {/* Section Comments */}
      <Remark data={remark1} />
    </PrintContent>
  )
}

PrintNonCommodityContent.propTypes = {
  data: PropTypes.object
}
