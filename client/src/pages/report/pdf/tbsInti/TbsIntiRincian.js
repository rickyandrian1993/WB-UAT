import { Button, Space, Table } from '@mantine/core'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { filteringData, getStore, numberFormat } from '../../../../helpers/utility'
import { ContentHeader, ContentPdf, ReportSectionContent } from '../../ReportStyles'
import toPdf from '../toPdf'
import TbsIntiSummary from './TbsIntiSummary'

export default function TbsIntiRincian({ data, payloads: { payload } }) {
  const { mill } = getStore('mill')
  const { data: dataReport } = data
  const groupSupplier = filteringData(dataReport, 'supplier')

  return (
    <ReportSectionContent>
      <div>
        <Button
          style={{ position: 'absolute', right: 16 }}
          onClick={() =>
            toPdf(
              `RINCIAN ${payload.commodity} - ${moment().format('DD-MM-YYYY')}`,
              '.generate-pdf'
            )
          }
          leftIcon={<i className="ri-download-2-line"></i>}
        >
          Download Pdf
        </Button>

        <div className="generate-pdf">
          {Object.keys(groupSupplier).length > 0 &&
            Object.keys(groupSupplier)?.map((val, i) => {
              return (
                <ContentPdf key={`Supplier-${i}`}>
                  <ContentHeader>
                    <h4 style={{ textAlign: 'center' }}>{mill?.nm || '-'}</h4>
                    <h4 style={{ textAlign: 'center' }}>
                      RINCIAN PENIMBANGAN TBS PERAFDELING PERSUPPLIER
                    </h4>
                    <div>
                      <p>Supplier : {val}</p>
                      <p>
                        Periode : {moment(payload.startDate).format('DD MMMM Y')} -{' '}
                        {moment(payload.endDate).format('DD MMMM Y')}
                      </p>
                      <p>Inti / Plasma / Luar : {payload.commodity}</p>
                    </div>
                  </ContentHeader>
                  <Space h="lg" />
                  <Table withBorder withColumnBorders>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Ticket No.</th>
                        <th>Tanggal</th>
                        <th>Divisi</th>
                        <th>Afdeling</th>
                        <th>Sub Blok</th>
                        <th>Jam Masuk</th>
                        <th>Jam Keluar</th>
                        <th>No. Kendaraan</th>
                        <th>Timbang Masuk</th>
                        <th>Timbang Keluar</th>
                        <th>Berat</th>
                        <th>Potongan</th>
                        <th>Netto</th>
                        <th>Tandan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupSupplier[val]?.map((item, i) => {
                        return (
                          <tr key={`all-${i}`}>
                            <td align="center">{i + 1}</td>
                            <td align="center">{item.ticket || '-'}</td>
                            <td align="center">
                              {moment(item.mill_arrive_dt).format('DD/MM/YYYY')}
                            </td>
                            <td align="center">{item.divisi_cd || '-'}</td>
                            <td align="center">{item.section_cd || '-'}</td>
                            <td align="center">{item.subblock_cd || '-'}</td>
                            <td align="center">
                              {item.mill_arrive_dt
                                ? moment(item.mill_arrive_dt).format('HH:mm:ss')
                                : '-'}
                            </td>
                            <td align="center">
                              {item.first_update
                                ? moment(item.first_update).format('HH:mm:ss')
                                : '-'}
                            </td>
                            <td align="center">{item.pcc_vehicle_cd || '-'}</td>
                            <td align="center">{numberFormat(item.first_w) || '-'}</td>
                            <td align="center">{numberFormat(item.second_w) || '-'}</td>
                            <td align="center">{numberFormat(item.netto_w) || '-'}</td>
                            <td align="center">{numberFormat(item.cut) || '-'}</td>
                            <td align="center">{numberFormat(item.total_netto) || '-'}</td>
                            <td align="center">{numberFormat(item.tandan) || '-'}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                  <br />
                  <TbsIntiSummary data={groupSupplier[val]} />
                </ContentPdf>
              )
            })}
        </div>
      </div>
    </ReportSectionContent>
  )
}

TbsIntiRincian.propTypes = {
  data: PropTypes.any,
  payloads: PropTypes.object
}
