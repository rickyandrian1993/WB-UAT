import { Button, Space, Table } from '@mantine/core'
import moment from 'moment'
import React from 'react'
import { filteringData, getStore, numberFormat, sumData } from '../../../../helpers/utility'
import { ContentFooter, ContentHeader, ContentPdf, ReportSectionContent } from '../../ReportStyles'
import toPdf from '../toPdf'
import PropTypes from 'prop-types'
import { ColGrid, ScaleGrid } from '../../../../assets/style/styled'
import TtdPdf from '../components/TtdPdf'

export default function Rincian({ data, payloads: { payload } }) {
  const {
    mill: { kop }
  } = getStore('mill')
  const { data: dataReport, dataAdditional, dataKeseluruhan } = data
  const CPOData = dataAdditional[0] || {}
  const KernelData = dataAdditional[1] || {}
  const groupSupplier = filteringData(dataReport, 'supplier')

  return (
    <ReportSectionContent>
      <div>
        <Button
          style={{ float: 'right' }}
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
                    <h4>{kop}</h4>
                    <Space h="lg" />
                    <h4>RINCIAN PENIMBANGAN TBS PERAFDELING PERSUPPLIER</h4>
                    <div>
                      <p>Supplier : {val}</p>
                      <p>
                        Periode : {moment(payload.startDate).format('DD MMMM Y')} -{' '}
                        {moment(payload.endDate).format('DD MMMM Y')}
                      </p>
                      <p>Inti / Plasma / Luar : {payload.commodity}</p>
                      <p>Total Trip : {groupSupplier[val].length}</p>
                      <p>Total Tandan : {numberFormat(sumData(groupSupplier[val], 'tandan'))}</p>
                      <p>Potongan : {numberFormat(sumData(groupSupplier[val], 'cut'))}</p>
                      <p>
                        Total Netto : {numberFormat(sumData(groupSupplier[val], 'total_netto'))}
                      </p>
                    </div>
                  </ContentHeader>
                  <Space h="lg" />
                  <Table withBorder withColumnBorders>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>Kelas</th>
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
                            <td align="center">
                              {moment(item.mill_arrive_dt).format('DD/MM/YYYY')}
                            </td>
                            <td align="center">{item.grade_class || '-'}</td>
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
                  <ContentFooter>
                    <ScaleGrid>
                      <ColGrid span={6}>
                        <table>
                          <tbody>
                            <tr>
                              <td>{val}</td>
                              <td>:</td>
                              <td>{groupSupplier[val].length} Trip</td>
                              <td>{numberFormat(sumData(groupSupplier[val], 'total_netto'))} Kg</td>
                            </tr>
                            <tr>
                              <td>Total Keseluruhan</td>
                              <td>:</td>
                              <td>{dataKeseluruhan.trip || 0} Trip</td>
                              <td>{numberFormat(dataKeseluruhan.total_netto)} Kg</td>
                            </tr>
                            <tr>
                              <td>Total Pengiriman CPO</td>
                              <td>:</td>
                              <td>{CPOData?.trip ? numberFormat(CPOData.trip) : 0} Trip</td>
                              <td>{CPOData?.total_kg ? numberFormat(CPOData.total_kg) : 0} Kg</td>
                            </tr>
                            <tr>
                              <td>Total Pengiriman Inti/Kernel</td>
                              <td>:</td>
                              <td>{KernelData?.trip ? numberFormat(KernelData.trip) : 0} Trip</td>
                              <td>
                                {KernelData?.total_kg ? numberFormat(KernelData.total_kg) : 0} Kg
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </ColGrid>
                      <ColGrid span={6}>
                        <table>
                          <tbody>
                            <tr>
                              <td>Potongan</td>
                              <td>:</td>
                              <td>{numberFormat(dataKeseluruhan?.total_cut)} Kg</td>
                            </tr>
                            <tr>
                              <td>FFA</td>
                              <td>:</td>
                              <td>{(CPOData?.total_ffa || 0) + (KernelData?.total_ffa || 0)} %</td>
                            </tr>
                            <tr>
                              <td>Kotoran</td>
                              <td>:</td>
                              <td>
                                {(CPOData?.total_dirt || 0) + (KernelData?.total_dirt || 0)} %
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </ColGrid>
                    </ScaleGrid>
                  </ContentFooter>
                  <TtdPdf />
                </ContentPdf>
              )
            })}
        </div>
      </div>
    </ReportSectionContent>
  )
}

Rincian.propTypes = {
  data: PropTypes.object,
  payloads: PropTypes.object
}
