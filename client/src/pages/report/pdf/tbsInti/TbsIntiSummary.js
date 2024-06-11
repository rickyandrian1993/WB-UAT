import React from 'react'
import { Table } from '@mantine/core'
import PropTypes from 'prop-types'
import { filteringData, numberFormat, sumData } from '../../../../helpers/utility'

export default function TbsIntiSummary({ data }) {
  const groupEstate = filteringData(data, 'estate_nm')
  const groupDivisi = filteringData(data, 'divisi_cd')
  const groupSection = filteringData(data, 'section_cd')
  const groupBlock = filteringData(data, 'subblock_cd')

  return (
    <>
      <h5>Summary</h5>
      <Table withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Estate</th>
            <th>Trip</th>
            <th>Timbang Masuk</th>
            <th>Timbang Keluar</th>
            <th>Berat</th>
            <th>Potongan</th>
            <th>Netto</th>
            <th>Tandan</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupEstate)?.map((groupKey, i) => {
            return (
              <tr key={`Estate-${i}`}>
                <td>{groupKey}</td>
                <td align="center">{groupEstate[groupKey].length}</td>
                <td align="center">{numberFormat(sumData(groupEstate[groupKey], 'first_w'))}</td>
                <td align="center">{numberFormat(sumData(groupEstate[groupKey], 'second_w'))}</td>
                <td align="center">{numberFormat(sumData(groupEstate[groupKey], 'netto_w'))}</td>
                <td align="center">{numberFormat(sumData(groupEstate[groupKey], 'cut'))}</td>
                <td align="center">
                  {numberFormat(sumData(groupEstate[groupKey], 'total_netto'))}
                </td>
                <td align="center">{numberFormat(sumData(groupEstate[groupKey], 'tandan'))}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <br />
      <Table withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Divisi</th>
            <th>Trip</th>
            <th>Timbang Masuk</th>
            <th>Timbang Keluar</th>
            <th>Berat</th>
            <th>Potongan</th>
            <th>Netto</th>
            <th>Tandan</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupDivisi)?.map((groupKey, i) => {
            return (
              <tr key={`Divisi-${i}`}>
                <td>{groupKey}</td>
                <td align="center">{groupDivisi[groupKey].length}</td>
                <td align="center">{numberFormat(sumData(groupDivisi[groupKey], 'first_w'))}</td>
                <td align="center">{numberFormat(sumData(groupDivisi[groupKey], 'second_w'))}</td>
                <td align="center">{numberFormat(sumData(groupDivisi[groupKey], 'netto_w'))}</td>
                <td align="center">{numberFormat(sumData(groupDivisi[groupKey], 'cut'))}</td>
                <td align="center">
                  {numberFormat(sumData(groupDivisi[groupKey], 'total_netto'))}
                </td>
                <td align="center">{numberFormat(sumData(groupDivisi[groupKey], 'tandan'))}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <br />
      <Table withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Afdeling</th>
            <th>Trip</th>
            <th>Timbang Masuk</th>
            <th>Timbang Keluar</th>
            <th>Berat</th>
            <th>Potongan</th>
            <th>Netto</th>
            <th>Tandan</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupSection)?.map((groupKey, i) => {
            return (
              <tr key={`Section-${i}`}>
                <td>{groupKey}</td>
                <td align="center">{groupSection[groupKey].length}</td>
                <td align="center">{numberFormat(sumData(groupSection[groupKey], 'first_w'))}</td>
                <td align="center">{numberFormat(sumData(groupSection[groupKey], 'second_w'))}</td>
                <td align="center">{numberFormat(sumData(groupSection[groupKey], 'netto_w'))}</td>
                <td align="center">{numberFormat(sumData(groupSection[groupKey], 'cut'))}</td>
                <td align="center">
                  {numberFormat(sumData(groupSection[groupKey], 'total_netto'))}
                </td>
                <td align="center">{numberFormat(sumData(groupSection[groupKey], 'tandan'))}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <br />
      <Table withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Sub Blok</th>
            <th>Trip</th>
            <th>Timbang Masuk</th>
            <th>Timbang Keluar</th>
            <th>Berat</th>
            <th>Potongan</th>
            <th>Netto</th>
            <th>Tandan</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupBlock)?.map((groupKey, i) => {
            return (
              <tr key={`Blok-${i}`}>
                <td>{groupKey}</td>
                <td align="center">{groupBlock[groupKey].length}</td>
                <td align="center">{numberFormat(sumData(groupBlock[groupKey], 'first_w'))}</td>
                <td align="center">{numberFormat(sumData(groupBlock[groupKey], 'second_w'))}</td>
                <td align="center">{numberFormat(sumData(groupBlock[groupKey], 'netto_w'))}</td>
                <td align="center">{numberFormat(sumData(groupBlock[groupKey], 'cut'))}</td>
                <td align="center">{numberFormat(sumData(groupBlock[groupKey], 'total_netto'))}</td>
                <td align="center">{numberFormat(sumData(groupBlock[groupKey], 'tandan'))}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

TbsIntiSummary.propTypes = {
  data: PropTypes.any
}
