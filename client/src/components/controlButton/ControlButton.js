import React from 'react'
import { Drawer, Grid, Group, Select, Tabs } from '@mantine/core'
import { ControlBox } from './styledControlButton'
import { useEffect, useState } from 'react'
import {
  ButtonWB,
  FingerSettingContent,
  Loading,
  MillSettingContent,
  PopUpModal,
  PortSettingContent
} from '../index'
import PropTypes from 'prop-types'
import { MillController, SerialPortController } from '../../services'

const { Col } = Grid
const ModalContent = ({ setOpenModal }) => (
  <Grid>
    <Col>
      <Group spacing={8} position="right">
        <ButtonWB variant="outline" onClick={() => setOpenModal(false)}>
          Batal
        </ButtonWB>
        <ButtonWB variant="filled" color="red" onClick={() => window.close()}>
          Keluar
        </ButtonWB>
      </Group>
    </Col>
  </Grid>
)

const ControlButton = () => {
  const [category, setCategory] = useState('')
  const { getConnOpt } = SerialPortController()
  const { getMillList } = MillController()
  const [activeTab, setActiveTab] = useState('port')
  const [millData, setMillData] = useState([])
  const [portData, setPortData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)

  useEffect(() => {
    if (openDrawer) {
      if (activeTab === 'port') {
        setLoading(true)
        setPortData([])
        getConnOpt(setLoading, setPortData)
      }
    }
  }, [openDrawer, activeTab, getConnOpt, getMillList])

  const categoryChangeHandler = (e) => {
    setCategory(e)
    if (e === 'mill') getMillList(setLoading, setMillData)
    else if (e === 'estate') console.log('estate')
    else if (e === 'refinery') console.log('refinery')
  }

  return (
    <ControlBox>
      <ButtonWB
        color="yellow"
        variant="outline"
        size="sm"
        onClick={() => setOpenDrawer(true)}
        style={{ zIndex: 1 }}
      >
        <i className="ri-settings-3-line" />
      </ButtonWB>
      <ButtonWB color="red" variant="outline" size="sm" onClick={() => setOpenModal(true)}>
        <i className="ri-shut-down-line" />
      </ButtonWB>

      <PopUpModal state={openModal} stateCb={setOpenModal} title="Apakah anda yakin ingin keluar?">
        <ModalContent setOpenModal={setOpenModal} />
      </PopUpModal>

      <Drawer
        opened={openDrawer}
        onClose={() => {
          setOpenDrawer(false)
          setCategory('')
        }}
        title="Settings"
        padding="xl"
        size="md"
        position="right"
      >
        <Tabs defaultValue={activeTab} onTabChange={(e) => setActiveTab(e)}>
          <Tabs.List grow>
            <Tabs.Tab value="port">Port</Tabs.Tab>
            <Tabs.Tab value="config">WB Config</Tabs.Tab>
            <Tabs.Tab value="finger"> Fingerprint</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="port" pt="xs">
            {loading && portData?.length === 0 ? (
              <Loading visible={loading} />
            ) : (
              <PortSettingContent drawerVisible={setOpenDrawer} data={portData} />
            )}
          </Tabs.Panel>

          <Tabs.Panel value="config" pt="xs">
            <Select
              rightSection={<i className="ri-arrow-down-s-line"></i>}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              withAsterisk
              label="Kategori"
              placeholder="Kategori"
              searchable
              data={[
                { value: 'mill', label: 'Mill' },
                { value: 'estate', label: 'Estate' },
                { value: 'refinery', label: 'Refinery / Pelabuhan' }
              ]}
              size="md"
              radius="md"
              onChange={categoryChangeHandler}
            />

            {loading && <Loading visible={loading} />}
            <div style={{ marginTop: 20 }}>
              {category === 'mill' && <MillSettingContent data={millData} />}
              {category === 'estate' && <p>Estate</p>}
              {category === 'refinery' && <p>Refinery</p>}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="finger" pt="xs">
            <FingerSettingContent />
          </Tabs.Panel>
        </Tabs>
      </Drawer>
    </ControlBox>
  )
}

ModalContent.propTypes = {
  setOpenModal: PropTypes.func
}

export default ControlButton
