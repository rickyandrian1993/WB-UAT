import { Badge, Button, Divider, Drawer, Grid, Group, Loader, Title } from '@mantine/core'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ColGrid, ScaleGrid } from '../../assets/style/styled'
import { ButtonWB, Clock, PopUpModal, WideLogo } from '../../components'
import { getStore, removeStore, setStore } from '../../helpers/utility'
import { FingerPrintController } from '../../services'
import { DrawerSection, HeaderNav } from '../styledLayout'

const { Col } = Grid

const LogoutContent = React.memo(({ setLogoutModal, logout }) => (
  <Grid>
    <Col>
      <Group spacing={8} position="center">
        <ButtonWB variant="outline" onClick={() => setLogoutModal(false)}>
          Batal
        </ButtonWB>
        <ButtonWB variant="filled" color="red" onClick={() => logout()}>
          Keluar
        </ButtonWB>
      </Group>
    </Col>
  </Grid>
))

function NavHeader() {
  const mill = getStore('mill')
  const navigate = useNavigate()
  const { user } = getStore('accountInfo')
  const { userBiometricDelete } = FingerPrintController()

  const [logoutModal, setLogoutModal] = useState(false)
  const [fingerprintSection, setFingerprintSection] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(!user.bm ? false : true)

  const { fingerAuth, userBiometricCreate } = FingerPrintController()

  const handleLogout = () => {
    removeStore('isLogin')
    removeStore('accountInfo')
    navigate('/login')
  }
  const handleBM = (e) => {
    setStatus(e)
    setStore('accountInfo', { user: { ...user, bm: false } })
    setFingerprintSection(false)
  }

  const handleFingerprint = () => {
    setFingerprintSection(true)
    fingerAuth(
      () => null,
      (e) => userBiometricCreate({ cd: user.cd, biometric: e }, setLoading, handleBM)
    )
  }

  return (
    <HeaderNav height={56} mb={32}>
      <Group>
        <WideLogo size="unset" />
      </Group>
      <Group>
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/">
          <i className="ri-scales-fill" />
          Timbang
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/history">
          <i className="ri-history-line" />
          History
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/report">
          <i className="ri-survey-line" />
          Report
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/sync">
          <i className="ri-refresh-line"></i>
          Upload
        </NavLink>
        {/* <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/editor">
          <i className="ri-edit-box-line"></i>
          Editor
        </NavLink> */}
      </Group>
      <Group className="info">
        <Clock />
        <Button component="a" className="icon-fingerprint" onClick={() => setOpenDrawer(true)}>
          <i className="ri-settings-3-fill"></i>
        </Button>
        <Button
          component="a"
          className="icon-fingerprint logout"
          onClick={() => setLogoutModal(true)}
        >
          <i className="ri-logout-circle-line" />
        </Button>
      </Group>
      <PopUpModal
        state={logoutModal}
        stateCb={handleLogout}
        title="Apakah anda yakin ingin keluar?"
      >
        <LogoutContent setLogoutModal={setLogoutModal} logout={handleLogout} />
      </PopUpModal>
      <Drawer
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title={`Hi There! ${user.nm}`}
        padding="xl"
        size="30%"
        position="right"
      >
        <DrawerSection>
          <Title order={3}>
            <i className="ri-map-pin-user-line" />
            General Information
          </Title>
          <Divider />
          <ScaleGrid>
            <ColGrid span={5}>Mill</ColGrid>
            <ColGrid span={7}>{mill.mill.nm}</ColGrid>
            <ColGrid span={5}>Mill Manager</ColGrid>
            <ColGrid span={7}>{mill.mill.mill_manager}</ColGrid>
            <ColGrid span={5}>Estate Code</ColGrid>
            <ColGrid span={7}>{mill.mill_detail[0].pcc_estate_cd}</ColGrid>
            <ColGrid span={5}>Estate Name</ColGrid>
            <ColGrid span={7}>{mill.mill_detail[0].pcc_estate_nm}</ColGrid>
          </ScaleGrid>
        </DrawerSection>
        <DrawerSection>
          <Title order={3}>
            <i className="ri-fingerprint-2-line" />
            Fingerprint Setting
          </Title>
          <Divider />
          <ScaleGrid>
            <ColGrid span={5}>Fingerprint Login</ColGrid>
            {status ? (
              <>
                <ColGrid span={7}>
                  <Badge color="green" size="lg" radius="sm">
                    Active
                  </Badge>
                </ColGrid>
                <ColGrid>
                  <ButtonWB
                    variant="outline"
                    color="red"
                    onClick={() => userBiometricDelete({ username: user.cd }, setLoading, handleBM)}
                  >
                    {!loading ? (
                      'Hapus Fingerprint'
                    ) : (
                      <Loader color="red" variant="bars" size="sm" />
                    )}
                  </ButtonWB>
                </ColGrid>
              </>
            ) : (
              <>
                <ColGrid span={7}>
                  <Badge color="red" size="lg" radius="sm">
                    Nonactive
                  </Badge>
                </ColGrid>

                <ColGrid>
                  {fingerprintSection ? (
                    <div className="loader-fingerprint">
                      <div className="loader-fingerprint-icon">
                        <Loader />
                        <i className="ri-fingerprint-2-line" />
                      </div>
                      <span>Silahkan Scan Sidik Jari Anda.</span>
                    </div>
                  ) : null}
                  <ButtonWB onClick={handleFingerprint}>
                    {!loading ? (
                      'Tambah Fingerprint'
                    ) : (
                      <Loader color="white" variant="bars" size="sm" />
                    )}
                  </ButtonWB>
                </ColGrid>
              </>
            )}
          </ScaleGrid>
        </DrawerSection>
      </Drawer>
    </HeaderNav>
  )
}

export default NavHeader
