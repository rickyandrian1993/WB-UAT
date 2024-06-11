import { Grid, Loader, LoadingOverlay, PasswordInput, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import { title, version } from '../../../package.json'
import { ButtonWB, ControlButton, WideLogo } from '../../components'
import { loginForm } from '../../constants'
import {
  FingerPrintController,
  LoginController,
  MillController,
  SyncController
} from '../../services'
import { GlassCard, LoginPage } from './styledLogin'

const { Col } = Grid

export default function Login() {
  const form = useForm(loginForm)
  const { login } = LoginController()
  const { syncData } = SyncController()
  const { getMillUser } = MillController()
  const { userBiometricIdentify } = FingerPrintController()
  const [millUser, setMillUser] = useState(null)
  const [dataState, setDataState] = useState('')
  const [loading, setLoading] = useState({
    sync: false,
    login: false
  })

  useEffect(() => {
    getMillUser(setMillUser)
    let currentUser = window.localStorage.getItem('currentUser')
    if (currentUser) form.setValues({ username: currentUser })
  }, [getMillUser])

  const handleSync = () => {
    if (form.validate().hasErrors) return
    syncData(
      form.values,
      (e) => setLoading((prev) => ({ ...prev, sync: e })),
      setDataState,
      () => {}
    )
  }

  const handleBmLogin = () =>
    userBiometricIdentify((e) => setLoading((prev) => ({ ...prev, login: e })))

  const loginHandler = async () => {
    if (form.validate().hasErrors) return
    login(form.values, (e) => setLoading((prev) => ({ ...prev, login: e })))
  }

  return (
    <>
      <LoadingOverlay
        visible={loading.sync}
        overlayBlur={2}
        loader={
          <div style={{ width: '100vw', height: 'inherit', display: 'grid', placeItems: 'center' }}>
            <Loader color="#ddd" variant="oval" size="sm" />
            <p style={{ color: '#ddd' }}>{dataState}</p>
          </div>
        }
      />
      <LoginPage>
        <GlassCard shadow="md">
          <ControlButton />
          <WideLogo size="sm" />
          <Text fz={'32px'} fw="500" ta="center">
            {title}
          </Text>
          <TextInput
            label="Username"
            placeholder="Username"
            rightSection={<i className="ri-user-3-line" />}
            radius="md"
            size="sm"
            required
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            radius="md"
            size="sm"
            required
            {...form.getInputProps('password')}
          />
          <Grid grow gutter={4} align="center" justify="center">
            <Col span={10}>
              <TextInput
                label="Mill"
                placeholder="Mill"
                rightSection={<i className="ri-community-fill" />}
                radius="md"
                size="sm"
                value={millUser ? millUser.nm : ''}
                disabled
              />
            </Col>
            <Col span={2}>
              <ButtonWB
                size="md"
                radius="md"
                onClick={handleSync}
                disabled={loading.sync}
                sx={{
                  padding: '0px 5px',
                  width: '100%'
                }}
              >
                <i className="ri-radar-line"></i>
              </ButtonWB>
            </Col>
          </Grid>
          <Grid grow gutter={4} align="center" justify="center">
            <Col span={10}>
              <ButtonWB
                size="md"
                radius="md"
                onClick={loginHandler}
                sx={{ width: '100%' }}
                loading={loading.login}
              >
                LOGIN
              </ButtonWB>
            </Col>
            <Col span={2}>
              <ButtonWB
                size="md"
                radius="md"
                onClick={handleBmLogin}
                sx={{
                  padding: '0px 5px',
                  width: '100%'
                }}
                disabled={loading.login}
              >
                <i className="ri-fingerprint-2-line" />
              </ButtonWB>
            </Col>
          </Grid>
          <div className="login__copyright">&copy;WIDE 2021 - V{version}</div>
        </GlassCard>
      </LoginPage>
    </>
  )
}
