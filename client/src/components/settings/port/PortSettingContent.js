import React from 'react'
import { Col, Grid, Loader, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { SerialPortController } from '../../../services'
import { ButtonWB, Loading } from '../../index'
import PropTypes from 'prop-types'

export default function PortSettingContent({ data, drawerVisible }) {
  const form = useForm({
    initialValues: {
      baudrate: !data?.baudrate ? '' : data?.baudrate,
      bits: !data?.databits ? '' : data?.databits,
      stopbit: !data?.stopbits ? '' : data?.stopbits,
      parity: !data?.parity ? '' : data?.parity,
      com: !data?.path ? '' : data?.path
    },
    validate: (values) => {
      return {
        baudrate:
          values.baudrate === '' || values.baudrate === null
            ? 'Baudrate tidak boleh kosong.'
            : null,
        bits: values.bits === '' || values.bits === null ? 'Tidak boleh kosong.' : null,
        stopbit: values.stopbit === '' || values.stopbit === null ? 'Tidak boleh kosong.' : null,
        parity: values.parity === '' || values.parity === null ? 'Tidak boleh kosong.' : null,
        com: values.com === '' || values.com === null ? 'Tidak boleh kosong.' : null
      }
    }
  })
  const { updateConnOpt } = SerialPortController()
  const [loading, setLoading] = useState(false)

  const settingOptionSubmitHandle = () => {
    return updateConnOpt(form.values, setLoading, (response) => {
      if (!response.isError) drawerVisible(false)
    })
  }

  return (
    <form onSubmit={form.onSubmit(settingOptionSubmitHandle)}>
      <Grid sx={{ '.mantine-Select-root': { position: 'relative' } }}>
        <Loading visible={loading} />
        <Col>
          <Select
            rightSection={<i className="ri-arrow-down-s-line"></i>}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            withAsterisk
            label="Baudrate"
            placeholder="Baudrate"
            searchable
            data={[
              { value: 1200, label: '1200' },
              { value: 2400, label: '2400' },
              { value: 4600, label: '4600' },
              { value: 9600, label: '9600' }
            ]}
            size="md"
            radius="md"
            {...form.getInputProps('baudrate')}
          />
        </Col>
        <Col>
          <Select
            rightSection={<i className="ri-arrow-down-s-line"></i>}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            withAsterisk
            label="Bits"
            placeholder="Bits"
            searchable
            data={[
              { value: 1, label: 'Bits 1' },
              { value: 2, label: 'Bits 2' },
              { value: 3, label: 'Bits 3' },
              { value: 4, label: 'Bits 4' },
              { value: 5, label: 'Bits 5' },
              { value: 6, label: 'Bits 6' },
              { value: 7, label: 'Bits 7' },
              { value: 8, label: 'Bits 8' }
            ]}
            size="md"
            radius="md"
            {...form.getInputProps('bits')}
          />
        </Col>
        <Col>
          <Select
            rightSection={<i className="ri-arrow-down-s-line"></i>}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            withAsterisk
            label="Stop Bit"
            placeholder="Stop Bit"
            searchable
            data={[
              { value: 1, label: 'Stopbit 1' },
              { value: 2, label: 'Stopbit 2' },
              { value: 3, label: 'Stopbit 3' },
              { value: 4, label: 'Stopbit 4' }
            ]}
            size="md"
            radius="md"
            {...form.getInputProps('stopbit')}
          />
        </Col>
        <Col>
          <Select
            rightSection={<i className="ri-arrow-down-s-line"></i>}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            withAsterisk
            label="Parity"
            placeholder="Parity"
            searchable
            data={['None', 'Odd', 'Even']}
            size="md"
            radius="md"
            {...form.getInputProps('parity')}
          />
        </Col>
        <Col>
          <Select
            rightSection={<i className="ri-arrow-down-s-line"></i>}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            withAsterisk
            label="COM"
            placeholder="COM"
            searchable
            data={['COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7']}
            size="md"
            radius="md"
            {...form.getInputProps('com')}
          />
        </Col>
        <Col>
          <ButtonWB size="md" type="submit" style={{ width: '100%' }} disabled={loading}>
            {loading ? <Loader color="#fff" variant="bars" size="sm" /> : 'SIMPAN'}
          </ButtonWB>
        </Col>
      </Grid>
    </form>
  )
}

PortSettingContent.propTypes = {
  data: PropTypes.any,
  drawerVisible: PropTypes.func
}
