import { Divider, NumberInput } from '@mantine/core'
import React from 'react'
import { ColGrid, ScaleGrid } from '../../../assets/style/styled'

const Quality = ({ form }) => {
  return (
    <ScaleGrid>
      <Divider label="Kualitas" />
      <ColGrid span="auto">
        <NumberInput
          decimalSeparator="."
          precision={2}
          min={0}
          max={100}
          icon="%"
          label="FFA"
          hideControls
          //  disabled={disableList.ffa}
          {...form.getInputProps('ffa')}
        />
      </ColGrid>
      <ColGrid span="auto">
        <NumberInput
          decimalSeparator="."
          precision={2}
          min={0}
          max={100}
          icon="%"
          label="Moist"
          hideControls
          //  disabled={disableList.moist}
          {...form.getInputProps('moist')}
        />
      </ColGrid>
      <ColGrid span="auto">
        <NumberInput
          decimalSeparator="."
          precision={2}
          min={0}
          max={100}
          icon="%"
          label="PV"
          hideControls
          //  disabled={disableList.pv}
          {...form.getInputProps('pv')}
        />
      </ColGrid>
      <ColGrid span="auto">
        <NumberInput
          precision={3}
          min={0}
          label="Dirt"
          icon="%"
          hideControls
          //  disabled={disableList.dirt}
          {...form.getInputProps('dirt')}
        />
      </ColGrid>
      <ColGrid span="auto">
        <NumberInput
          precision={3}
          min={0}
          label="Dobi"
          hideControls
          //  disabled={disableList.dobi}
          {...form.getInputProps('dobi')}
        />
      </ColGrid>
    </ScaleGrid>
  )
}

export default Quality
