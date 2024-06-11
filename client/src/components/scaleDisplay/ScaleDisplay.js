import React from 'react'
import PropTypes from 'prop-types'
import { ColGrid } from '../../assets/style/styled'
import { Text } from '@mantine/core'

export default function ScaleDisplay({ type, spanSize = 4, form }) {
  return (
    <>
      <ColGrid span={spanSize}>
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

ScaleDisplay.propTypes = {
  type: PropTypes.oneOf(['scale-in', 'scale-out', 'scale-out-cpo']),
  form: PropTypes.object,
  spanSize: PropTypes.number
}
