import React from 'react'
import { Divider, Grid } from '@mantine/core'
import { PrintContent } from '../../../../assets/style/styled'
import PropTypes from 'prop-types'
import moment from 'moment'
import { numberFormat } from '../../../../helpers/utility'
import Remark from './Remark'

export default function PrintTbsLuarContent({ data }) {
  const {
    after_cut,
    bjr,
    customer_nm,
    cut,
    do_date,
    do_number,
    ekspedisi_nm,
    fresh_fruit,
    garbage,
    grading_brondolan,
    first_w,
    janjang_kosong,
    long_stalk,
    mill_nm,
    netto_w,
    overripe_brondolan,
    overripe_fruit,
    pcc_vehicle_cd,
    remark1,
    restan_overnight,
    sand_fruit,
    second_w,
    spb_date,
    spb_number,
    total_brondolan,
    total_bunch,
    water,
    young_fruit,
    grade_class,
    supplier,
    spb_weight,
    farmer,
    ticket
  } = data

  const styledAlign = {
    right: { textAlign: 'right' }
  }

  return (
    <PrintContent>
      <Grid columns={24}>
        <Grid.Col span={12}>
          <Grid>
            <Grid.Col span={5}>Ticket No.</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {ticket}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>No/Tgl DO</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {do_number} - {do_date && moment(do_date).format('DD/MM/YY')}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>Mill/Pabrik</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {mill_nm || '-'}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>Supplier</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {supplier || '-'}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>Customer</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {customer_nm || '-'}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>Ekspedisi</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {ekspedisi_nm || '-'}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>No. Polisi</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {pcc_vehicle_cd || '-'}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>Kelas</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {grade_class || '-'}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>Petani</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {farmer || '-'}
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={12}>
          <Grid>
            <Grid.Col span={5}>No/Tgl SPB</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {spb_number} - {spb_date && moment(spb_date).format('DD/MM/YY')}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>Berat SPB</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(spb_weight)}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>Jml Tandan</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(total_bunch)}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>Brondolan</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(total_brondolan)} Kg
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>BJR</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {bjr || '-'}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>First Weight</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(first_w)} Kg
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>Second Weight</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(second_w)} Kg
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>Netto Weight</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(netto_w)} Kg
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>Potongan</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(cut)} Kg
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={5}>Setelah Potongan</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(after_cut)} Kg
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
      <Divider size={1} variant="dashed" />
      {/* Section Grading */}
      <Grid gutter={20}>
        <Grid.Col span={4}>
          <Grid>
            <Grid.Col span={6}>BH Mentah/HB</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(fresh_fruit)} Tdn
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>BH Busuk</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(overripe_fruit)} Tdn
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>BH Muda</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(young_fruit)} Tdn
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>BH Pasir</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(sand_fruit)} Tdn
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={4}>
          <Grid>
            <Grid.Col span={6}>Tangkai Panjang</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(long_stalk)} Tdn
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>Jankos</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {numberFormat(janjang_kosong)} Tdn
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>TBS Berair</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {water} %
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>Overnight</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {restan_overnight} %
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={4}>
          <Grid>
            <Grid.Col span={6}>Brondolan</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {grading_brondolan} %
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>Brondolan Busuk</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {overripe_brondolan} %
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>Sampah</Grid.Col>
            <Grid.Col span={'content'}>:</Grid.Col>
            <Grid.Col span={'auto'} style={styledAlign.right}>
              {garbage} %
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
      {/* Section Comments */}
      <Remark data={remark1} />
    </PrintContent>
  )
}

PrintTbsLuarContent.propTypes = {
  data: PropTypes.object
}
