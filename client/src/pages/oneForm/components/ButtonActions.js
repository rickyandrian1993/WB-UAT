import { Loader } from '@mantine/core'
import React from 'react'
import { ColGrid } from '../../../assets/style/styled'
import { ButtonWB } from '../../../components'
import { allTrue } from '../../../helpers/disableList'

const ButtonActions = (props) => {
  const {
    disableList,
    form,
    loading,
    loadingNfc,
    nfcReader,
    readTimbangan,
    readTimbanganLoading,
    setDisableList
  } = props

  return (
    <>
      <ColGrid span={6}>
        <ButtonWB
          fullWidth
          variant="outline"
          size="sm"
          color="red"
          leftIcon={<i className="ri-format-clear" />}
          disabled={loading}
          onClick={() => {
            form.reset()
            setDisableList(allTrue)
          }}
        >
          BERSIHKAN
        </ButtonWB>
      </ColGrid>
      <ColGrid span={6}>
        <ButtonWB
          fullWidth
          variant="outline"
          size="sm"
          leftIcon={<i className="ri-sim-card-2-line" />}
          onClick={nfcReader}
          disabled={readTimbanganLoading || disableList.nfc_button || loading || loadingNfc}
        >
          {loadingNfc ? <Loader variant="bars" color="#fff" /> : 'NFC'}
        </ButtonWB>
      </ColGrid>
      <ColGrid span={6}>
        <ButtonWB
          fullWidth
          variant="outline"
          size="sm"
          leftIcon={<i className="ri-truck-line" />}
          onClick={readTimbangan}
          disabled={loading || readTimbanganLoading}
        >
          {readTimbanganLoading ? <Loader color="#fff" variant="bars" /> : 'TIMBANG'}
        </ButtonWB>
      </ColGrid>
      <ColGrid span={6}>
        <ButtonWB
          fullWidth
          variant="outline"
          color="green"
          size="sm"
          disabled={loading}
          type="submit"
          leftIcon={<i className="ri-save-line" />}
        >
          SIMPAN
        </ButtonWB>
      </ColGrid>
    </>
  )
}

export default ButtonActions
