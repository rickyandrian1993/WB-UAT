import React, { useState } from 'react'
import { Col, Grid, Loader, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { ButtonWB } from '../../index'
import PropTypes from 'prop-types'
import { MillController } from '../../../services'

export default function MillSettingContent({ data }) {
  const { updateMillUser } = MillController()
  const [loading, setLoading] = useState(false)
  const form = useForm({
    initialValues: {
      mill: '',
      kop: ''
    },
    validate: (values) => {
      return {
        mill: values.mill === '' || values.mill === null ? 'Mill tidak boleh kosong.' : null,
        kop: values.kop === '' || values.kop === null ? 'KOP surat tidak boleh kosong.' : null
      }
    }
  })

  const millSubmitHandle = (values) => {
    if (form.validate().hasErrors) return

    const millSelected = data.find((item) => item.value === values.mill)
    updateMillUser({ ...millSelected.data, kop: values.kop }, setLoading)
  }

  return (
    <form onSubmit={form.onSubmit(millSubmitHandle)}>
      <Grid sx={{ '.mantine-Select-root': { position: 'relative' } }}>
        <Col>
          <Select
            rightSection={<i className="ri-arrow-down-s-line"></i>}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            withAsterisk
            label="Mill"
            placeholder="Mill"
            searchable
            data={data}
            radius="md"
            size="md"
            nothingFound="Tidak ada data."
            {...form.getInputProps('mill')}
            onChange={(e) => {
              const millSelected = data.find((item) => item.value === e)
              form.setFieldValue('mill', millSelected.label)
              form.setFieldValue('kop', millSelected.label)
              form.getInputProps('mill').onChange(e)
            }}
          />
        </Col>
        <Col>
          <TextInput
            size="md"
            radius="md"
            withAsterisk
            label="Default KOP Surat"
            placeholder="KOP Surat"
            {...form.getInputProps('kop')}
          />
        </Col>
        <Col>
          <ButtonWB type="submit" size="md" style={{ width: '100%' }} disabled={loading}>
            {loading ? <Loader color="#fff" variant="bars" size="sm" /> : 'SIMPAN'}
          </ButtonWB>
        </Col>
      </Grid>
    </form>
  )
}

MillSettingContent.propTypes = {
  data: PropTypes.any
}
