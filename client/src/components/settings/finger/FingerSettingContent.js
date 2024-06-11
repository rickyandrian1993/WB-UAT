import {
  Accordion,
  Button,
  Checkbox,
  Col,
  Grid,
  Loader,
  Modal,
  PasswordInput,
  Select,
  TextInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { FingerPrintController, LoginController } from '../../../services'
import { FingerTable, FormCreate } from '../../controlButton/styledControlButton'
import Loading from '../../loading/Loading'

const role_position = [
  { value: 'Mill Manager', label: 'Mill Manager' },
  { value: 'Mill Support', label: 'Mill Support' },
  { value: 'Mill IT', label: 'Mill IT' }
]

export default function FingerSettingContent() {
  const form = useForm({
    initialValues: {
      nm: '',
      role_position: '',
      biometric_data: ''
    },
    validateInputOnChange: ['nm'],
    validate: ({ nm, role_position, biometric_data }) => {
      return {
        nm:
          nm.trim().length === 0
            ? 'Tidak boleh kosong'
            : nm.trim().length < 3
            ? 'Min 3 huruf'
            : null,
        role_position: role_position === '' || role_position === null ? 'Tidak Boleh Kosong' : null,
        biometric_data: biometric_data.length === 0 ? 'Tidak Boleh Kosong' : null
      }
    }
  })
  const [isValidated, setIsValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [check, setCheck] = useState(false)
  const [data, setData] = useState([])
  const { validateFingerPassword, getCredentialList } = LoginController()
  const { fingerAuth, fingerInsert } = FingerPrintController()
  const [opened, setOpened] = useState(false)

  const createCredential = (e) => {
    setLoading(true)
    fingerInsert(e, setData).then(() => {
      form.reset()
      setCheck(false)
      setLoading(false)
    })
  }

  const handleScanFinger = () => {
    if (!check) {
      setOpened(true)
      fingerAuth(setOpened, (e) => {
        setCheck(true)
        form.setFieldValue('biometric_data', e)
      })
    } else setCheck(false)
  }

  const handlePassword = (e) => {
    e.preventDefault()
    const { value } = e.target[0]
    validateFingerPassword(value, (e) => {
      setIsValidated(e)
      getCredentialList(setData)
    })
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {}}
        withCloseButton={false}
        title="Silahkan pindai sidik jari"
      >
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
      </Modal>
      {loading ? (
        <Loading visible={loading} />
      ) : !isValidated ? (
        <form onSubmit={handlePassword}>
          <PasswordInput
            size="md"
            radius="md"
            name="Password"
            placeholder="Password"
            label="Input Password To Continue"
            withAsterisk
            visible={false}
            visibilityToggleIcon={() => false}
          />
        </form>
      ) : (
        <>
          {data.length && <TableData data={data} />}
          {data?.length < 5 ? (
            <>
              {loading && <Loading visible={loading} />}
              {!loading && (
                <Accordion
                  defaultValue={null}
                  variant="separated"
                  chevronPosition="left"
                  chevron={<i className="ri-add-circle-line"></i>}
                  radius="md"
                  sx={{ marginTop: 4 }}
                >
                  <Accordion.Item value="add" sx={{ background: '#ffffffbd', fontSize: 14 }}>
                    <Accordion.Control sx={{ fontSize: 14 }}>Add New Credential</Accordion.Control>
                    <Accordion.Panel>
                      <FormCreate onSubmit={form.onSubmit(createCredential)}>
                        <TextInput
                          withAsterisk
                          label="Name"
                          placeholder="Name"
                          name="nm"
                          {...form.getInputProps('nm')}
                        />
                        <Select
                          withAsterisk
                          label="Position"
                          placeholder="Position"
                          name="role_position"
                          sx={{ position: 'relative' }}
                          data={role_position}
                          {...form.getInputProps('role_position')}
                        />
                        <Checkbox
                          label="Biometric Fingerprint "
                          description="Klik untuk scan fingerprint"
                          checked={check}
                          labelPosition="left"
                          error={form.errors?.biometric_data}
                          onChange={() => null}
                          onClick={handleScanFinger}
                        />
                        <Button type="submit" variant="outline">
                          Create
                        </Button>
                      </FormCreate>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              )}
            </>
          ) : null}
        </>
      )}
    </>
  )
}

const TableData = React.memo(({ data }) => {
  return (
    <FingerTable verticalSpacing="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ nm, role_position }) => (
          <tr key={`${nm}-${role_position}`}>
            <td>{nm}</td>
            <td>{role_position}</td>
          </tr>
        ))}
      </tbody>
    </FingerTable>
  )
})
