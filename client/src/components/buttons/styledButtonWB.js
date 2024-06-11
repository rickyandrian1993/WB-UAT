import { Button } from '@mantine/core'
import styled from 'styled-components'

const StyleButton = styled(Button)`
  margin: 0px 4px;
  border-width: 1.5px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  &[data-disabled] {
    background: #ced9e2;
    border: 1.5px solid;
    pointer-events: all;
  }
`

export { StyleButton }
