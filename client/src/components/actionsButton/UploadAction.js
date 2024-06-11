import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ButtonWB from '../buttons/ButtonWB'
import { ReportController } from '../../services'
import { getStore } from '../../helpers/utility'
import moment from 'moment'
import { OverlayContext } from '../../pages/sync/Sync'
import { server_url } from '../../../package.json'
export default function UploadAction({ data }) {
  const { user } = getStore('accountInfo')
  const { mill, mill_detail } = getStore('mill')
  const { uploadData } = ReportController()
  const { setUploadLoading, getUploadList, payload, handleChangeData } = useContext(OverlayContext)

  const uploadHandler = (data) => {
    const estateList = []

    mill_detail.map((item) => estateList.push(item.pcc_estate_cd))

    const payloadUpload = {
      date: moment(data).format('Y-MM-DD'),
      userCd: user.cd,
      estate: estateList,
      millManager: mill.mill_manager,
      url: server_url
    }

    uploadData(payloadUpload, setUploadLoading).then(() =>
      getUploadList(payload, setUploadLoading, handleChangeData)
    )
  }

  return (
    <>
      <ButtonWB
        disabled={parseInt(data.failed) === 0}
        size="sm"
        color="red"
        variant="outline"
        onClick={() => uploadHandler(data.tanggal)}
      >
        Upload
      </ButtonWB>
    </>
  )
}

UploadAction.propTypes = {
  data: PropTypes.object
}
