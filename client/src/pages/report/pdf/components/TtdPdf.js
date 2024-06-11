import React from 'react'
import { getStore } from '../../../../helpers/utility'
import { ContentTtd } from '../../ReportStyles'

export default function TtdPdf() {
  const { user } = getStore('accountInfo')
  const { mill } = getStore('mill')

  return (
    <ContentTtd>
      <table>
        <tbody>
          <tr>
            <td>Diketahui Oleh</td>
            <td>Diperiksa Oleh</td>
            <td>Dibuat Oleh</td>
          </tr>
          <tr>
            <td>____________________</td>
            <td>____________________</td>
            <td>____________________</td>
          </tr>
          <tr>
            <td>{mill?.mill_manager || '-'}</td>
            <td>FC/Auditor WB</td>
            <td>{user?.nm || '-'}</td>
          </tr>
        </tbody>
      </table>
    </ContentTtd>
  )
}
