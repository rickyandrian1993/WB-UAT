import { Modal } from '@mantine/core'
import styled from 'styled-components'

const ModalWb = styled(Modal)`
  .mantine-Modal {
    &-header {
      justify-content: center;
    }
    &-modal {
      background: #ffffffbe;
      border-radius: 8px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(4px);
      border: 1px solid rgba(149, 149, 149, 0.44);
    }
  }
`

export { ModalWb }
