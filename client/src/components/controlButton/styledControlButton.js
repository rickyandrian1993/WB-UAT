import { Box, Table } from '@mantine/core'
import styled from 'styled-components'

const ControlBox = styled(Box)`
  position: absolute;
  right: 15px;
  top: 15px;
  button {
    height: 32px;
    width: 32px;
    padding: 0px;
    margin: 0px 4px;
    border-radius: 200px;
    i {
      position: absolute;
      top: 50%;
      left: 52%;
      transform: translate(-50%, -50%);
      font-size: 18px;
    }
  }
`

const FingerTable = styled(Table)`
  background: #ffffffbd;
  border-radius: 8px;
  .mantine-Button-leftIcon {
    margin-right: 5px;
  }
  tbody {
    .add {
      &-cell {
        position: relative;
        color: transparent;
      }
      &-button {
        width: inherit;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .form-create {
    > div {
      margin: 0px 6px;
    }
  }
`

const FormCreate = styled.form`
  > div {
    margin: 8px 0px;
  }
`

export { ControlBox, FingerTable, FormCreate }
