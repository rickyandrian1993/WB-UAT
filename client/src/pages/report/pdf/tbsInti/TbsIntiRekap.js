import { Button, Space, Table } from '@mantine/core'
import moment from 'moment'
import React from 'react'
import { filteringData, numberFormat, sumData } from '../../../../helpers/utility'
import { ContentFooter, ContentHeader, ContentPdf, ReportSectionContent } from '../../ReportStyles'
import toPdf from '../toPdf'
import PropTypes from 'prop-types'
import { ColGrid, ScaleGrid } from '../../../../assets/style/styled'
import TtdPdf from '../components/TtdPdf'

export default function TbsIntiRekap({ data, payloads: { payload } }) {
  const { data: dataReport, dataAdditional, dataKeseluruhan } = data
  const CPOData = dataAdditional[0] || {}
  const KernelData = dataAdditional[1] || {}
  const groupSupplier = filteringData(dataReport, 'supplier')

  const groupingDivisi = (arr) => {
    const divisi = filteringData(arr, 'divisi_cd')
    return Object.keys(divisi).map((div) => {
      const section = filteringData(divisi[div], 'section_cd')
      return Object.keys(section).map((item, j) => {
        return (
          <React.Fragment key={`${div}-section-${item}-${j}`}>
            <tr key={`section-${item}-${j}}`}>
              <td>{section[item][0].divisi_cd}</td>
              <td>{item}</td>
              <td align="center">{section[item].length}</td>
              <td align="center">{numberFormat(sumData(section[item], 'tandan'))}</td>
              <td align="center">{numberFormat(sumData(section[item], 'netto_w'))}</td>
              <td align="center">{numberFormat(sumData(section[item], 'cut'))}</td>
              <td align="center">{numberFormat(sumData(section[item], 'total_netto'))}</td>
              <td align="center">{numberFormat(sumData(section[item], 'spb_weight'))}</td>
              <td align="center">{numberFormat(sumData(section[item], 'selisih'))}</td>
            </tr>
            {Object.keys(section).length - 1 === j && (
              <tr key={`section-${item}-${j}`}>
                <td colSpan={2} align="center">
                  Subtotal
                </td>
                <td align="center">{divisi[div].length}</td>
                <td align="center">{numberFormat(sumData(divisi[div], 'tandan'))}</td>
                <td align="center">{numberFormat(sumData(divisi[div], 'netto_w'))}</td>
                <td align="center">{numberFormat(sumData(divisi[div], 'cut'))}</td>
                <td align="center">{numberFormat(sumData(divisi[div], 'total_netto'))}</td>
                <td align="center">{numberFormat(sumData(divisi[div], 'spb_weight'))}</td>
                <td align="center">{numberFormat(sumData(divisi[div], 'selisih'))}</td>
              </tr>
            )}
          </React.Fragment>
        )
      })
    })
  }

  return (
    <ReportSectionContent>
      <div>
        <Button
          style={{ float: 'right' }}
          onClick={() =>
            toPdf(
              `REKAPITULASI ${payload.commodity} - ${moment().format('DD-MM-YYYY')}`,
              '#generate-pdf'
            )
          }
          leftIcon={<i className="ri-download-2-line"></i>}
        >
          Download Pdf
        </Button>

        <div id="generate-pdf">
          {Object.keys(groupSupplier).length > 0 &&
            Object.keys(groupSupplier)?.map((val, i) => {
              return (
                <ContentPdf key={`supplier-${i}`}>
                  <ContentHeader>
                    <h4>REKAPITULASI PENIMBANG TBS PERAFDELING PERSUPPLIER</h4>
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
                        <th>Divisi</th>
                        <th>Afdeling</th>
                        <th>Trip</th>
                        <th>Tandan</th>
                        <th>Berat</th>
                        <th>Potongan</th>
                        <th>Netto</th>
                        <th>Berat SPB</th>
                        <th>Selisih</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataReport.length < 1 && (
                        <tr>
                          <td colSpan={9} align="center">
                            No Data Available.
                          </td>
                        </tr>
                      )}
                      {dataReport.length > 0 && groupingDivisi(groupSupplier[val])}
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

TbsIntiRekap.propTypes = {
  data: PropTypes.any,
  payloads: PropTypes.object
}
