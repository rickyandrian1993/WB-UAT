import { Divider, NumberInput, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { ColGrid, FormGroup, ScaleGrid } from '../../../assets/style/styled'

const defaultCutWeight = {
  fresh_fruit_kg: 0,
  garbage_kg: 0,
  grading_brondolan_kg: 0,
  janjang_kosong_kg: 0,
  long_stalk_kg: 0,
  restan_overnight_kg: 0,
  overripe_brondolan_kg: 0,
  overripe_fruit_kg: 0,
  sand_fruit_kg: 0,
  young_fruit_kg: 0,
  water_kg: 0
}

const Grading = ({ form }) => {
  const [cutWeight, setCutWeight] = useState(defaultCutWeight)

  return (
    <ScaleGrid>
      <Divider label="Detail Grading" />
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Buah Mentah"
            placeholder="0"
            rightSection="Tdn"
            // disabled={disableList.fresh_fruit}
            {...form.getInputProps('fresh_fruit')}
            // onChange={(e) => handleCalculateInput(e, 'fresh_fruit')}
          />
          <TextInput placeholder="0" disabled rightSection="Kg" value={cutWeight.fresh_fruit_kg} />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Buah Busuk"
            placeholder="0"
            rightSection="Tdn"
            // disabled={disableList.overripe_fruit}
            {...form.getInputProps('overripe_fruit')}
            // onChange={(e) => handleCalculateInput(e, 'overripe_fruit')}
          />
          <TextInput
            placeholder="0"
            disabled
            rightSection="Kg"
            value={cutWeight.overripe_fruit_kg}
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Buah Muda"
            placeholder="0"
            rightSection="Tdn"
            // disabled={disableList.young_fruit}
            {...form.getInputProps('young_fruit')}
            // onChange={(e) => handleCalculateInput(e, 'young_fruit')}
          />
          <TextInput placeholder="0" disabled rightSection="Kg" value={cutWeight.young_fruit_kg} />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            name="sand_fruit"
            // disabled={disableList.sand_fruit}
            placeholder="0"
            label="Buah Pasir"
            hideControls
            rightSection="tdn"
            {...form.getInputProps('sand_fruit')}
            // onChange={(e) => handleCalculateInput(e, 'sand_fruit')}
          />
          <TextInput placeholder="0" disabled rightSection="Kg" value={cutWeight.sand_fruit_kg} />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Tangkai Panjang"
            placeholder="0"
            rightSection="Tdn"
            // disabled={disableList.long_stalk}
            {...form.getInputProps('long_stalk')}
            // onChange={(e) => handleCalculateInput(e, 'long_stalk')}
          />
          <TextInput placeholder="0" disabled rightSection="Kg" value={cutWeight.long_stalk_kg} />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Janjang Kosong"
            placeholder="0"
            rightSection="Tdn"
            // disabled={disableList.janjang_kosong}
            {...form.getInputProps('janjang_kosong')}
            // onChange={(e) => handleCalculateInput(e, 'janjang_kosong')}
          />
          <TextInput
            placeholder="0"
            disabled
            rightSection="Kg"
            value={cutWeight.janjang_kosong_kg}
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            name="water"
            // disabled={disableList.water}
            label="TBS Berair"
            hideControls
            precision={1}
            rightSection="%"
            decimalSeparator="."
            max={100}
            {...form.getInputProps('water')}
            // onChange={(e) => handleCalculateInput(e, 'water')}
          />
          <TextInput placeholder="0" disabled rightSection="Kg" value={cutWeight.water_kg} />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Brondolan"
            placeholder="0"
            precision={1}
            rightSection="%"
            decimalSeparator="."
            max={100}
            // disabled={disableList.grading_brondolan}
            {...form.getInputProps('grading_brondolan')}
            // onChange={(e) => handleCalculateInput(e, 'grading_brondolan')}
          />
          <TextInput
            placeholder="0"
            disabled
            rightSection="Kg"
            value={cutWeight.grading_brondolan_kg}
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Brondolan Busuk"
            placeholder="0"
            precision={1}
            rightSection="%"
            decimalSeparator="."
            max={100}
            // disabled={disableList.overripe_brondolan}
            {...form.getInputProps('overripe_brondolan')}
            // onChange={(e) => handleCalculateInput(e, 'overripe_brondolan')}
          />
          <TextInput
            placeholder="0"
            disabled
            rightSection="Kg"
            value={cutWeight.overripe_brondolan_kg}
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Overnight/Restan"
            placeholder="0"
            precision={1}
            rightSection="%"
            decimalSeparator="."
            max={100}
            // disabled={disableList.restan_overnight}
            {...form.getInputProps('restan_overnight')}
            // onChange={(e) => handleCalculateInput(e, 'restan_overnight')}
          />
          <TextInput
            placeholder="0"
            disabled
            rightSection="Kg"
            value={cutWeight.restan_overnight_kg}
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Sampah"
            placeholder="0"
            precision={1}
            rightSection="%"
            decimalSeparator="."
            min={0}
            max={100}
            // disabled={disableList.garbage}
            {...form.getInputProps('garbage')}
            // onChange={(e) => handleCalculateInput(e, 'garbage')}
          />
          <TextInput placeholder="0" disabled rightSection="Kg" value={cutWeight.garbage_kg} />
        </FormGroup>
      </ColGrid>
    </ScaleGrid>
  )
}

export default Grading
