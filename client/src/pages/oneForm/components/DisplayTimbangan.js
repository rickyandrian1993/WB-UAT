import { Text } from '@mantine/core'
import React from 'react'
import { ColGrid } from '../../../assets/style/styled'

const DisplayTimbangan = (props) => {
  const { form, type } = props

  return (
    <>
      <ColGrid span={4}>
        <div className="scale-display">
          <Text fz="sm" fw={500}>
            Timbangan Pertama
          </Text>
          <Text fz={24} fw={500}>
            {parseInt(form?.values?.first_w) || 0}
          </Text>
        </div>
      </ColGrid>
      {type !== 'scale-in' ? (
        <>
          <ColGrid span={4}>
            <div className="scale-display">
              <Text fz="sm" fw={500}>
                Timbangan Kedua
              </Text>
              <Text fz={24} fw={500}>
                {parseInt(form?.values?.second_w) || 0}
              </Text>
            </div>
          </ColGrid>
          <ColGrid span={4}>
            <div className="scale-display">
              <Text fz="sm" fw={500}>
                Netto
              </Text>
              <Text fz={24} fw={500}>
                {parseInt(form?.values?.netto_w) || 0}
              </Text>
            </div>
          </ColGrid>
          {type !== 'scale-out-cpo' ? (
            <>
              <ColGrid span={4}>
                <div className="scale-display">
                  <Text fz="sm" fw={500}>
                    Potongan
                  </Text>
                  <Text fz={24} fw={500}>
                    {parseInt(form?.values?.cut) || 0}
                  </Text>
                </div>
              </ColGrid>
              <ColGrid span={4}>
                <div className="scale-display">
                  <Text fz="sm" fw={500}>
                    Setelah Potongan
                  </Text>
                  <Text fz={24} fw={500}>
                    {parseInt(form?.values?.after_cut) || 0}
                  </Text>
                </div>
              </ColGrid>
              <ColGrid span={4}>
                <div className="scale-display">
                  <Text fz="sm" fw={500}>
                    Berat Janjang Rata-Rata
                  </Text>
                  <Text fz={24} fw={500}>
                    {parseInt(form?.values?.bjr) || 0}
                  </Text>
                </div>
              </ColGrid>
            </>
          ) : null}
        </>
      ) : null}
    </>
  )
}

export default DisplayTimbangan
