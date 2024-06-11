import styled from 'styled-components'
import { ColGrid, ScaleGrid } from '../../assets/style/styled'

const ReportSectionContent = styled.div`
  position: relative;
  border: 2px solid #628b48;
  padding: 12px 16px;
  border-radius: 6px;
  margin: 16px 0px;
  .print-pdf {
    position: absolute;
    right: 0;
    margin-right: 16px;
  }
`

const ContentPdf = styled.div`
  table {
    thead > tr > th {
      text-align: center;
    }
  }
`

const ContentHeader = styled.div``

const ContentFooter = styled.div`
  margin: 16px 0;
  ${ScaleGrid} {
    ${ColGrid} {
      table {
        width: 100%;
        tr {
          td:nth-child(1) {
            width: 300px;
          }
          td:nth-child(2) {
            width: 20px;
          }
          td:last-child {
            text-align: right;
          }
        }
      }
    }
  }
`

const ContentTtd = styled.div`
  margin-top: 3rem;
  table {
    width: 100%;
    tbody {
      tr {
        td {
          text-align: center;
        }
      }
      tr:nth-child(2) {
        td {
          padding-top: 80px;
        }
      }
    }
  }
`

export { ReportSectionContent, ContentPdf, ContentHeader, ContentFooter, ContentTtd }
