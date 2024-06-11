import React, { useState } from 'react'
import { ActionsBox, ColGrid, ScaleGrid } from '../../assets/style/styled'
import ButtonWB from '../buttons/ButtonWB'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'
import PopUpModal from '../popUpModal/PopUpModal'
import { Col, Grid, Loader, Text } from '@mantine/core'
import { FingerPrintController, MillYieldsController } from '../../services'
import { commodityList } from '../../constants'

const ModalContent = () => (
  <Grid justify="center" align="center">
    <Col span="content">
      <div style={{ position: 'relative', width: '100px', height: '100px' }}>
        <Loader sx={{ width: '100%', height: '100%' }} />
        <i
          className="ri-fingerprint-2-line"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 65
          }}
        ></i>
      </div>
    </Col>
  </Grid>
)

export default function ActionsButton({ data }) {
  const navigate = useNavigate()
  const { netto_w, mt_comodity_cd } = data
  const [openModal, setOpenModal] = useState(false)
  const { fingerValidate } = FingerPrintController()
  const { deleteData } = MillYieldsController()
  const [, setLoading] = useState(false)

  const handlePrint = (type, data, status) => {
    setOpenModal(true)
    fingerValidate(setOpenModal, (res) => {
      if (res.status_code === 200) navigate('/print', { state: { type: type, data: data, status } })
      else setOpenModal(false)
    })
  }

  const deleteHandler = (row) => {
    fingerValidate(setOpenModal, (res) => {
      if (res.status_code === 200) deleteData({ cd: row }, setLoading, (res) => window.location.reload())
      else setOpenModal(false)
    })
  }

  return (
    <ActionsBox>
      <PopUpModal state={openModal} stateCb={setOpenModal} title="Silahkan pindai sidik jari">
        <ModalContent />
      </PopUpModal>
      <ScaleGrid justify="start">
        <>
          {parseInt(netto_w) > 0 && (
            <>
              <ColGrid
                span={
                  commodityList
                    .filter((item) => item.group === 'Commodity')
                    .map((group) => group.value)
                    .includes(mt_comodity_cd)
                    ? 6
                    : 12
                }
              >
                <ButtonWB
                  size="md"
                  color="red"
                  variant="outline"
                  onClick={() => handlePrint('TIKET', data, 'offline')}
                >
                  Print Tiket
                </ButtonWB>
              </ColGrid>
              {commodityList
                .filter((item) => item.group === 'Commodity')
                .map((group) => group.value)
                .includes(mt_comodity_cd) && (
                <ColGrid span={6}>
                  <ButtonWB
                    size="md"
                    color="red"
                    variant="outline"
                    onClick={() => handlePrint('SPB', data, 'offline')}
                  >
                    Print SPB
                  </ButtonWB>
                </ColGrid>
              )}
            </>
          )}
          {parseInt(netto_w) < 1 && (
            <>
              <ColGrid span={7}>
                <Text fz="xl" fw={700}>
                  Blm Timbang Ke-2
                </Text>
              </ColGrid>
              <ColGrid span={2}>
                <i
                  onClick={() => deleteHandler(data.cd)}
                  className="ri-delete-bin-2-line"
                  style={{ fontSize: '18px', color: '#ec0041' }}
                ></i>
              </ColGrid>
            </>
          )}
        </>
      </ScaleGrid>
    </ActionsBox>
  )
}

ActionsButton.propTypes = {
  data: PropTypes.object
}
