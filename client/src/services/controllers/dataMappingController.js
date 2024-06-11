import { useCallback } from 'react'
import { ToastNotification } from '../../components'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'

export default function DataMappingController() {
  const mapData = useCallback((payload, form) => {
    ApiService.jsonRequest(endpoints.mappingData, { ...payload }, ({ isError, data, message }) => {
      if (isError === true || isError === 'Y') {
        ToastNotification({
          title: 'Kesalahan',
          message: message,
          isError: isError
        })
      } else {
        Object.keys(data).map((items) => {
          if (items === 'estate') form.setFieldValue('supplier', data[items].nm)
          if (data[items].nm) {
            let data_key = `${items}_nm`
            form.setFieldValue(data_key, data[items].nm)
          } else {
            const child = data[items]
            Object.keys(child).map((items2, i) => {
              if (child[items2].nm) {
                let loader_key = `loader_nm${i === 0 ? '' : `_${i + 1}`}`
                form.setFieldValue(loader_key, child[items2].nm)
              } else if (child[items2].subblock_cd) {
                let subblock_key = `block_nm${i === 0 ? '' : i + 1}`
                let estate_level_key = `pcc_estate_level_cd${i === 0 ? '' : i + 1}`
                form.setFieldValue(subblock_key, child[items2].subblock_cd)
                form.setFieldValue(estate_level_key, child[items2].cd)
                if (i === 0) form.setFieldValue('afdeling_nm', child[items2].section_cd)
              }
              return ''
            })
          }
          return ''
        })
      }
    })
  }, [])
  return { mapData }
}
