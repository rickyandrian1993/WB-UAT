import { Button, TextInput } from '@mantine/core'
import React from 'react'
import { ColGrid, ReportHeader, ScaleGrid } from '../../../assets/style/styled'

const FilterData = ({ searchRef, searchHandler }) => {
  return (
    <ReportHeader>
      <ScaleGrid align="center" justify={'space-between'}>
        <ColGrid span={6}>
          <ScaleGrid>
            <ColGrid span={4}>
              <TextInput ref={searchRef} label="Search Ticket Number" placeholder="Ticket Number" />
            </ColGrid>
            <ColGrid span={4}>
              <Button onClick={searchHandler} leftIcon={<i className="ri-file-search-line"></i>}>
                Search
              </Button>
            </ColGrid>
          </ScaleGrid>
        </ColGrid>
      </ScaleGrid>
    </ReportHeader>
  )
}

export default FilterData
