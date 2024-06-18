import { Divider, NumberInput, Select, TextInput } from '@mantine/core'
import React from 'react'
import { ColGrid, ScaleGrid } from '../../../assets/style/styled'
import useDropdown from '../../../hooks/useDropdown'
import { VendorController } from '../../../services'

const DataUmum = ({ form }) => {
  const { customer } = useDropdown()
  const { vendor } = VendorController()

  return (
    <ScaleGrid>
      <Divider label="Data Umum" />
      <ColGrid span={6}>
        <ScaleGrid>
          <ColGrid span={12}>
            <TextInput
              label="Komoditi"
              placeholder="Komoditi"
              disabled
              {...form.getInputProps('comodity_nm')}
            />
          </ColGrid>
          <ColGrid span={12}>
            <Select
              rightSection={<i className="ri-arrow-down-s-line"></i>}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              withAsterisk
              label="Customer"
              placeholder="Customer"
              searchable
              data={customer}
              size="sm"
              nothingFound="Tidak ada data."
              {...form.getInputProps('pcc_customer_cd')}
            />
          </ColGrid>
          <ColGrid span={12}>
            <Select
              rightSection={<i className="ri-arrow-down-s-line"></i>}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              withAsterisk
              label="Supplier"
              placeholder="Supplier"
              searchable
              data={[]}
              size="sm"
              nothingFound="Tidak ada data."
              {...form.getInputProps('supplier')}
            />
          </ColGrid>
        </ScaleGrid>
      </ColGrid>
      <ColGrid span={6}>
        <ScaleGrid justify="space-around" align="center">
          <ColGrid span={12}>
            <TextInput label="Petani" placeholder="Petani" {...form.getInputProps('farmer')} />
          </ColGrid>
          <ColGrid span={12}>
            <NumberInput
              min={0}
              label="Jumlah Tandan"
              placeholder="Jumlah Tandan"
              disabled
              {...form.getInputProps('total_bunch')}
            />
          </ColGrid>
          <ColGrid span={12}>
            <NumberInput
              min={0}
              label="Brondolan"
              placeholder="Brondolan"
              rightSection="Kg"
              disabled
              {...form.getInputProps('total_brondolan')}
            />
          </ColGrid>
        </ScaleGrid>
      </ColGrid>
      <Divider />
      <ColGrid span={6}>
        <ScaleGrid>
          <ColGrid span={12}>
            <TextInput
              withAsterisk
              label="Supir"
              placeholder="Supir"
              // disabled={disableList.driver_nm}
              {...form.getInputProps('driver_nm')}
            />
          </ColGrid>
          <ColGrid span={12}>
            <TextInput
              label="Estate"
              placeholder="Estate"
              disabled
              {...form.getInputProps('estate_nm')}
            />
          </ColGrid>
          <ColGrid span={12}>
            <TextInput
              label="Afdeling"
              placeholder="Afdeling"
              disabled
              {...form.getInputProps('afdeling_nm')}
            />
          </ColGrid>
          <ColGrid span={12}>
            <TextInput
              label="Sub Block"
              placeholder="Sub Block"
              disabled
              {...form.getInputProps('block_nm')}
            />
          </ColGrid>
        </ScaleGrid>
      </ColGrid>
      <ColGrid span={6}>
        <ScaleGrid>
          <ColGrid span={12}>
            <Select
              rightSection={<i className="ri-arrow-down-s-line"></i>}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              withAsterisk
              label="Ekspedisi"
              placeholder="Ekspedisi"
              searchable
              data={vendor}
              size="sm"
              nothingFound="Tidak ada data."
              {...form.getInputProps('mt_vndr_rent_vhcle_cd')}
              onChange={(e) => {
                const selectedVendor = vendor.find((item) => item.value === e)
                form.setFieldValue('ekspedisi_nm', selectedVendor.label)
                form.getInputProps('mt_vndr_rent_vhcle_cd').onChange(e)
              }}
            />
          </ColGrid>
          <ColGrid span={12}>
            <TextInput
              label="Pemuat 1"
              placeholder="Pemuat 1"
              disabled
              {...form.getInputProps('loader_nm')}
            />
          </ColGrid>
          <ColGrid span={12}>
            <TextInput
              label="Pemuat 2"
              placeholder="Pemuat 2"
              disabled
              {...form.getInputProps('loader_nm_2')}
            />
          </ColGrid>
          <ColGrid span={12}>
            <TextInput
              label="Pemuat 3"
              placeholder="Pemuat 3"
              disabled
              {...form.getInputProps('loader_nm_3')}
            />
          </ColGrid>
        </ScaleGrid>
      </ColGrid>
    </ScaleGrid>
  )
}

export default DataUmum
