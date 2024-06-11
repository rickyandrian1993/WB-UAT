import { Button, Space, Table } from '@mantine/core'
import moment from 'moment'
import React from 'react'
import toPdf from '../toPdf'
import PropTypes from 'prop-types'
import { getStore, numberFormat, sumData } from '../../../../helpers/utility'
import { ContentHeader, ContentPdf, ReportSectionContent } from '../../ReportStyles'

export default function NonCommodity({ data, payload }) {
  const { mill } = getStore('mill')

  return (
    <ReportSectionContent>
      {data?.length < 1 && (
        <h3 style={{ display: 'flex', justifyContent: 'center' }}>Tidak Ada Data.</h3>
      )}
      {data?.length > 0 && (
        <div>
          <Button
            style={{ float: 'right' }}
            onClick={() =>
              toPdf(
                `Laporan ${payload.commodity} - ${moment().format('DD-MM-YYYY')}`,
                '#generate-pdf'
              )
            }
            leftIcon={<i className="ri-download-2-line"></i>}
          >
            Download Pdf
          </Button>

          <div id="generate-pdf">
            <ContentPdf>
              <ContentHeader>
                <h4>LAPORAN PENIMBANGAN {payload.commodity.toUpperCase()}</h4>
                <div>
                  <p>
                    Periode : {moment(payload.startDate).format('DD MMMM Y')} -{' '}
                    {moment(payload.endDate).format('DD MMMM Y')}
                  </p>
                  <p>Mill : {mill?.nm || '-'}</p>
                  <p>Total Trip : {sumData(data, 'trip')}</p>
                  <p>Total Netto : {numberFormat(sumData(data, 'total_netto'))}</p>
                </div>
              </ContentHeader>
              <Space h="lg" />
              <Table withBorder withColumnBorders>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Supplier</th>
                    <th>Customer</th>
                    <th>Timbang Masuk</th>
                    <th>Timbang Keluar</th>
                    <th>Berat</th>
                    <th>Potongan</th>
                    <th>Netto</th>
                    <th>Trip</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, i) => {
                    return (
                      <tr key={`all-${i}`}>
                        <td align="center">{i + 1}</td>
                        <td align="center">{item.supplier || '-'}</td>
                        <td align="center">{item.customer || '-'}</td>
                        <td align="center">{numberFormat(item.first_w) || '-'}</td>
                        <td align="center">{numberFormat(item.second_w) || '-'}</td>
                        <td align="center">{numberFormat(item.netto_w) || '-'}</td>
                        <td align="center">{numberFormat(item.cut) || '-'}</td>
                        <td align="center">{numberFormat(item.total_netto) || '-'}</td>
                        <td align="center">{item.trip}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </ContentPdf>
          </div>
        </div>
      )}
    </ReportSectionContent>
  )
}

NonCommodity.propTypes = {
  data: PropTypes.array,
  payloads: PropTypes.object
}
