import React, { useState } from 'react'
import { Burger, Grid, Group, Menu, NavLink } from '@mantine/core'
import { SideBox, SideSection } from '../styledLayout'
import { ButtonWB, PopUpModal, WideLogo } from '../../components/index'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { menu } from '../../constants/sideMenuData'
import { removeStore } from '../../helpers/utility'

const { Col } = Grid

const ModalContent = ({ setOpenModal, logout }) => (
  <Grid>
    <Col>
      <Group spacing={8} position="right">
        <ButtonWB variant="outline" onClick={() => setOpenModal(false)}>
          Batal
        </ButtonWB>
        <ButtonWB variant="filled" color="red" onClick={() => logout()}>
          Keluar
        </ButtonWB>
      </Group>
    </Col>
  </Grid>
)

const LogoBurger = ({ state, setState }) => {
  return (
    <Grid align="center" justify="space-around">
      <Col span={8}>
        <WideLogo size={!state ? '0' : '120'} justify="start" />
      </Col>
      <Col span={'content'}>
        <Burger opened={state} onClick={() => setState(!state)} />
      </Col>
    </Grid>
  )
}

const Side = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  const handleNavigate = (open, active, path) => {
    setOpen(open)
    setActive(active)
    navigate(path)
  }

  const handleLogout = () => {
    removeStore('isLogin')
    removeStore('accountInfo')
    navigate('/login')
  }

  return (
    <>
      <PopUpModal state={openModal} stateCb={handleLogout} title="Apakah anda yakin ingin keluar?">
        <ModalContent setOpenModal={setOpenModal} logout={handleLogout} />
      </PopUpModal>
      <SideBox width={open ? { base: 250 } : { base: 75 }} top={0} p="sm">
        <SideSection>
          <LogoBurger state={open} setState={setOpen} />
        </SideSection>
        {/* <SideSection
          sx={!open && { '.mantine-NavLink-rightSection': { display: 'none' } }}
          grow
          component={ScrollArea}
        > */}
        <SideSection sx={!open && { '.mantine-NavLink-rightSection': { display: 'none' } }}>
          {menu.map(({ label, path, icon, rightIcon, child }, index) => (
            <div key={index}>
              {!child ? (
                <NavLink
                  key={`menu-${index}`}
                  label={label}
                  icon={icon}
                  color="green"
                  rightSection={open ? rightIcon : false}
                  onClick={() => {
                    handleNavigate(false, index, path)
                  }}
                  active={index === active}
                />
              ) : (
                <Menu
                  position="right-start"
                  trigger="hover"
                  openDelay={100}
                  closeDelay={200}
                  key={index}
                >
                  <Menu.Target key={`menu-${index}`}>
                    <NavLink
                      key={`menu-${index}`}
                      label={label}
                      icon={icon}
                      color="green"
                      rightSection={open ? rightIcon : false}
                      childrenOffset={16}
                      active={index === active}
                    >
                      {child.map(({ label, path, icon, rightIcon }, i) => (
                        <NavLink
                          key={`submenu-${index}-${i}`}
                          label={label}
                          icon={icon}
                          rightSection={rightIcon}
                          onClick={() => {
                            handleNavigate(false, index, path)
                          }}
                          sx={!open && { display: 'none' }}
                        />
                      ))}
                    </NavLink>
                  </Menu.Target>
                  <Menu.Dropdown sx={open && { display: 'none' }}>
                    <Menu.Label>{label}</Menu.Label>
                    {child.map(({ label, path, icon }, i) => (
                      <Menu.Item
                        key={`hover-menu-${index}-${i}`}
                        onClick={() => {
                          handleNavigate(false, index, path)
                        }}
                        icon={icon}
                      >
                        {label}
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu>
              )}
            </div>
          ))}
        </SideSection>
        <SideSection>
          <NavLink
            label={'LogOut'}
            icon={<i className="ri-logout-circle-line" />}
            variant="subtle"
            onClick={() => setOpenModal(true)}
          />
        </SideSection>
      </SideBox>
    </>
  )
}

LogoBurger.propTypes = {
  state: PropTypes.bool,
  setState: PropTypes.func
}

export default Side
