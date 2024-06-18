import { Divider, Flex } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useRef, useState } from 'react'
import { ColGrid, FormBox, ScaleGrid } from '../../assets/style/styled'
import { initialValues } from '../../constants'
import {
  Additional,
  ButtonActions,
  DataUmum,
  DisplayTimbangan,
  FilterData,
  Grading,
  HeaderInput,
  Quality
} from './components'

const Editor = () => {
  const form = useForm(initialValues)
  const [editingData, setEditingData] = useState({})

  const searchRef = useRef(null)

  const searchHandler = () => {
    setEditingData({})
    console.log('search', searchRef.current.value)
  }

  return (
    <ScaleGrid align="center">
      <ColGrid>
        <FilterData searchRef={searchRef} searchHandler={searchHandler} />
      </ColGrid>
      <ColGrid>
        <FormBox>
          {editingData !== null ? (
            <ScaleGrid gutter={'md'} justify="space-between" align="start">
              <ColGrid span={12}>
                <HeaderInput form={form} />
              </ColGrid>
              <ColGrid span={5}>
                <DataUmum form={form} />
                <ScaleGrid>
                  <Divider />
                  <ButtonActions />
                </ScaleGrid>
              </ColGrid>
              <ColGrid span={7} leftdivider="true">
                <ScaleGrid>
                  <Divider label="Data Timbangan" />
                  <DisplayTimbangan form={form} />
                  <ColGrid span={12}>
                    <Grading form={form} />
                  </ColGrid>
                  <ColGrid span={12}>
                    <Quality form={form} />
                  </ColGrid>
                  <ColGrid span={12}>
                    <Additional form={form} />
                  </ColGrid>
                </ScaleGrid>
              </ColGrid>
            </ScaleGrid>
          ) : (
            <Flex justify={'center'} align={'center'}>
              <div>Data tidak ditemukan</div>
            </Flex>
          )}
        </FormBox>
      </ColGrid>
    </ScaleGrid>
  )
}

export default Editor
