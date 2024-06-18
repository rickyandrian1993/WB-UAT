import React from 'react'
import { ColGrid } from '../../../assets/style/styled'
import { ButtonWB } from '../../../components'

const ButtonActions = () => {
  return (
    <>
      <ColGrid span={6}>
        <ButtonWB
          fullWidth
          variant="outline"
          size="sm"
          color="red"
          leftIcon={<i className="ri-format-clear" />}
        >
          Batal
        </ButtonWB>
      </ColGrid>
      <ColGrid span={6}>
        <ButtonWB
          fullWidth
          variant="outline"
          color="green"
          size="sm"
          type="button"
          leftIcon={<i className="ri-save-line" />}
        >
          SIMPAN
        </ButtonWB>
      </ColGrid>
    </>
  )
}

export default ButtonActions
