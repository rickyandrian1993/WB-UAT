import React from 'react'
import { Divider, Grid, Title } from '@mantine/core'
import { PrintContent } from '../../../../assets/style/styled'
import PropTypes from 'prop-types'
import moment from 'moment'
import { numberFormat } from '../../../../helpers/utility'
import Remark from './Remark'

export default function SPBContent({ data }) {
  const {
    comodity_nm,
    customer_nm,
    dirt,
    do_date,
    do_number,
    dobi,
    ekspedisi_nm,
    ffa,
    first_w,
    mill_nm,
    moist,
    netto_w,
    pcc_vehicle_cd,
    pv,
    remark1,
    seal_number,
    second_w,
    spb_date,
    spb_number,
    ticket
  } = data

  const styledAlign = {
    right: { textAlign: 'right' }
  }

  return (
    <PrintContent>
      <Title
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        Surat Penerimaan Barang
      </Title>
      <Divider size={1} variant="dashed" />
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
            <Grid.Col span={4}>Komoditi</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {comodity_nm || '-'}
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
          <Grid>
            <Grid.Col span={4}>Seals</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {seal_number || '-'}
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={6}>
          <Grid>
            <Grid.Col span={4}>Bruto</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(first_w) || '-'} Kg
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>Tarra</Grid.Col>
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
          <Grid>
            <Grid.Col span={4}>FFA %</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {ffa || '-'} %
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>Moist %</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {moist || '-'} %
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>PV %</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {pv || '-'} %
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>Dirt</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {dirt || '-'}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>Dobi</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {dobi || '-'}
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
      {/* Section Comments */}
      <Remark data={remark1} />
    </PrintContent>
  )
}

SPBContent.propTypes = {
  data: PropTypes.object
}
