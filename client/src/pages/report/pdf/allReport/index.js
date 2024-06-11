import { Button } from '@mantine/core'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { Margin, usePDF } from 'react-to-pdf'
import { ReportSectionContent } from '../../ReportStyles'
import PrintElement from './PrintElement'

function AllReportData({ data, payload }) {
  const { commodity, startDate } = payload
  const { toPDF, targetRef } = usePDF({
    method: 'save',
    filename: `Laporan ${commodity} - ${moment().format('DD-MM-YYYY')}`,
    page: { margin: Margin.SMALL }
  })

  return (
    <div>
      <ReportSectionContent>
        {data?.length < 1 && (
          <h3 style={{ display: 'flex', justifyContent: 'center' }}>Tidak Ada Data.</h3>
        )}
        {data.length > 0 && (
          <ReportSectionContent>
            <Button
              className="print-pdf"
              onClick={() => toPDF()}
              leftIcon={<i className="ri-download-2-line"></i>}
            >
              Download Pdf
            </Button>
            <div ref={targetRef}>
              <PrintElement data={data} startDate={startDate} />
            </div>
          </ReportSectionContent>
        )}
      </ReportSectionContent>
    </div>
  )
}

AllReportData.propTypes = {
  data: PropTypes.array,
  payload: PropTypes.object
}

export default AllReportData
