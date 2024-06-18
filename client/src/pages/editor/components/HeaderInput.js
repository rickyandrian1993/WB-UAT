import { TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import React from 'react'
import { ColGrid, FormGroup, ScaleGrid } from '../../../assets/style/styled'

const HeaderInput = ({ form }) => {
  return (
    <ScaleGrid>
      <ColGrid span={4}>
        <ScaleGrid>
          <ColGrid span={6}>
            <TextInput
              disabled
              label="No. Polisi"
              placeholder="No. Polisi"
              {...form.getInputProps('contract')}
            />
          </ColGrid>
          <ColGrid span={6}>
            <TextInput
              disabled
              label="Kontrak"
              placeholder="Kontrak"
              {...form.getInputProps('contract')}
            />
          </ColGrid>
        </ScaleGrid>
      </ColGrid>
      <ColGrid span={8}>
        <ScaleGrid>
          <ColGrid span={6}>
            <FormGroup>
              <TextInput
                label="Nomor DO"
                placeholder="Nomor DO"
                {...form.getInputProps('do_number')}
                className="form-head"
              />
              <DatePicker
                label="Tanggal DO"
                locale="id"
                placeholder="Tanggal DO"
                icon={<i className="ri-calendar-event-line" />}
                {...form.getInputProps('do_date')}
              />
            </FormGroup>
          </ColGrid>
          <ColGrid span={6}>
            <FormGroup>
              <TextInput
                label="Nomor SPB"
                placeholder="Nomor SPB"
                {...form.getInputProps('spb_number')}
                className="form-head"
              />
              <DatePicker
                label="Tanggal SPB"
                locale="id"
                placeholder="Tanggal SPB"
                icon={<i className="ri-calendar-event-line" />}
                {...form.getInputProps('spb_date')}
              />
            </FormGroup>
          </ColGrid>
        </ScaleGrid>
      </ColGrid>
    </ScaleGrid>
  )
}

export default HeaderInput
