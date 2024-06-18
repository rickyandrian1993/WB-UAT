import { Divider, Grid, Loader, Modal } from '@mantine/core'
import React from 'react'
import styled from 'styled-components'
import { ButtonWB } from '../../../components'

const ModalTimbangan = React.memo((props) => {
  const { isOpen, setIsOpen, weight, loading, readWeight } = props

  return (
    <Modal opened={isOpen} withCloseButton={false} centered>
      <DisplayStyled justify="center">
        {weight ? <span>{weight} KG</span> : <Loader color="#000" variant="bars" />}
      </DisplayStyled>
      <Divider size={'xl'} my={12} />
      <Grid justify="space-around">
        <Grid.Col span={6}>
          <ButtonWB
            fullWidth
            color="green"
            size="sm"
            leftIcon={<i className="ri-check-line" />}
            onClick={setIsOpen}
          >
            OK
          </ButtonWB>
        </Grid.Col>
        <Grid.Col span={6}>
          <ButtonWB
            fullWidth
            variant="outline"
            size="sm"
            leftIcon={<i className="ri-truck-line" />}
            onClick={readWeight}
            disabled={loading}
          >
            {loading ? <Loader color="#fff" variant="bars" /> : 'TIMBANG ULANG'}
          </ButtonWB>
        </Grid.Col>
      </Grid>
    </Modal>
  )
})

export default ModalTimbangan

const DisplayStyled = styled(Grid)`
  font-size: 4rem;
  font-weight: 700;
`
