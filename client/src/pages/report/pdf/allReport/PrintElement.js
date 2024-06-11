import { Space, Table } from '@mantine/core'
import moment from 'moment'
import React from 'react'
import { ColGrid, ScaleGrid } from '../../../../assets/style/styled'
import {
  filteringData,
  filteringTBSOnly,
  getStore,
  numberFormat,
  sumData
} from '../../../../helpers/utility'
import { ContentHeader, ContentPdf } from '../../ReportStyles'

function PrintElement({ data, startDate }) {
  const { mill } = getStore('mill')
  const groupCommodity = filteringData(data, 'comodity_nm')
  const tbs = filteringTBSOnly(data)

  return (
    <ContentPdf>
      <ScaleGrid>
        <ColGrid span={3}>
          <ContentHeader>
            <h4>LAPORAN PENIMBANGAN HARIAN</h4>
            <div>
              <p>Periode : {moment(startDate).format('DD MMMM Y')}</p>
              <p>Mill : {mill?.nm || '-'}</p>
              <p>Total Trip : {sumData(data, 'trip')}</p>
              <p>Total Netto : {numberFormat(sumData(data, 'total_netto'))}</p>
            </div>
          </ContentHeader>
          <Space h="lg" />
          <Table withBorder withColumnBorders>
            <thead>
              <tr>
                <th>Komoditi</th>
                <th>Trip</th>
                <th>Netto</th>
              </tr>
            </thead>
            <tbody>
              {data.length < 1 && (
                <tr>
                  <td colSpan={12} align="center">
                    No Data Available.
                  </td>
                </tr>
              )}
              {Object.keys(groupCommodity)?.map((key, i) => {
                return (
                  <tr key={`all-${i}`}>
                    <td align="center">{key}</td>
                    <td align="center">{sumData(groupCommodity[key], 'trip')}</td>
                    <td align="center">
                      {numberFormat(sumData(groupCommodity[key], 'total_netto'))}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </ColGrid>
        <ColGrid span={9}>
          <ContentHeader>
            <h4>LAPORAN PENIMBANGAN HARIAN TBS</h4>
            <div>
              <p>Periode : {moment(startDate).format('DD MMMM Y')}</p>
              <p>Mill : {mill?.nm || '-'}</p>
              <p>Total Trip : {sumData(tbs, 'trip')}</p>
              <p>Total Netto : {numberFormat(sumData(tbs, 'total_netto'))}</p>
            </div>
          </ContentHeader>
          <Space h="lg" />
          <Table withBorder withColumnBorders>
            <thead>
              <tr>
                <th>TBS</th>
                <th>Supplier</th>
                <th>Estate</th>
                <th>Tandan</th>
                <th>Trip</th>
                <th>Berat</th>
                <th>Potongan</th>
                <th>Netto</th>
              </tr>
            </thead>
            <tbody>
              {data.length < 1 && (
                <tr>
                  <td colSpan={12} align="center">
                    No Data Available.
                  </td>
                </tr>
              )}
              {tbs?.map((item, i) => {
                return (
                  <tr key={`all-${i}`}>
                    <td align="center">{item.comodity_nm}</td>
                    <td align="center">{item.supplier || '-'}</td>
                    <td align="center">{item.estate_nm || '-'}</td>
                    <td align="center">{numberFormat(item.tandan) || '-'}</td>
                    <td align="center">{item.trip || '-'}</td>
                    <td align="center">{numberFormat(item.netto_w) || '-'}</td>
                    <td align="center">{numberFormat(item.cut) || '-'}</td>
                    <td align="center">{numberFormat(item.total_netto) || '-'}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </ColGrid>
      </ScaleGrid>
    </ContentPdf>
  )
}

export default PrintElement
