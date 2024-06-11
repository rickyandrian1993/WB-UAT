import { Divider, Loader, Modal } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import { ColGrid, FormBox, ScaleGrid } from '../../assets/style/styled'
import { ButtonWB, ScaleDisplay } from '../../components'
import { initialValues } from '../../constants'
import { allTrue, disableGenerator } from '../../helpers/disableList'
import submiter from '../../helpers/submiter'
import { getStore } from '../../helpers/utility'
import useDropdown from '../../hooks/useDropdown'
import {
  MillYieldsController,
  NFCReaderController,
  SupplierController,
  TimbanganController,
  VehicleCdController,
  VendorController
} from '../../services'
import { DataTambahan, DataUmum, Grading, HeaderForm, Kualitas, Rekapitulasi } from './Sections'

const Commodity = () => {
  const form = useForm(initialValues)
  const { commodity, customer } = useDropdown()
  const { user } = getStore('accountInfo')
  const { vendor } = VendorController()
  const { readNFC } = NFCReaderController()
  const { getTimbanganData } = TimbanganController()
  const { insertData, updateData } = MillYieldsController()
  const { insertVehicleCd } = VehicleCdController()
  const { insertSupplierList } = SupplierController()
  const { getScaleHistory } = MillYieldsController()
  const [opened, setOpened] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingNfc, setLoadingNfc] = useState(false)
  const [readTimbanganLoading, setReadTimbanganLoading] = useState(false)
  const [isFirst, setIsFirst] = useState(false)
  const [disableList, setDisableList] = useState(allTrue)
  const [newHistory, setNewHistory] = useState([])
  const [history, setHistory] = useState([])
  const [newSupplier, setNewSupplier] = useState([])
  const [timbangan, setTimbangan] = useState(0)

  useEffect(() => {
    getScaleHistory({}, setLoading, (res) => {
      const temp = []
      res?.forEach((data) =>
        temp.push({ value: data.pcc_vehicle_cd, label: data.pcc_vehicle_cd, data })
      )
      setHistory(temp)
    })
  }, [getScaleHistory])

  const readTimbangan = () => {
    setTimbangan(0)
    setOpened(true)
    getTimbanganData(setReadTimbanganLoading, (res) => {
      setTimbangan(res)
      if (isFirst) form.setFieldValue('first_w', res)
      else {
        const { first_w, total_bunch } = form.values
        let netto_w = Math.abs(+first_w - res)
        let bjr = total_bunch === 0 ? 0 : (netto_w / total_bunch).toFixed(2)
        form.setValues((prev) => ({
          ...prev,
          after_cut: netto_w,
          bjr,
          cut: 0,
          fresh_fruit: 0,
          fresh_fruit_kg: 0,
          garbage: 0,
          garbage_kg: 0,
          grading_brondolan: 0,
          grading_brondolan_kg: 0,
          janjang_kosong: 0,
          janjang_kosong_kg: 0,
          long_stalk: 0,
          long_stalk_kg: 0,
          netto_w,
          overripe_brondolan: 0,
          overripe_brondolan_kg: 0,
          overripe_fruit: 0,
          overripe_fruit_kg: 0,
          restan_overnight: 0,
          restan_overnight_kg: 0,
          sand_fruit: 0,
          sand_fruit_kg: 0,
          second_w: res,
          water: 0,
          water_kg: 0,
          young_fruit: 0,
          young_fruit_kg: 0
        }))
        setDisableList(
          disableGenerator(form.values.comodity_nm, form.values.mt_cmdity_catgds_cd, isFirst, false)
        )
      }
    })
  }

  const nfcReader = () => readNFC(isFirst ? false : true, setLoadingNfc, form, customer)

  const submitHandler = (values) => {
    const { firstWeightPayload, secondWeightPayload } = submiter(values)
    if (form.validate().hasErrors) return
    if (newHistory === form.values.pcc_vehicle_cd)
      insertVehicleCd({ cd: newHistory, created_by: user.nm }, setLoading)
    if (newSupplier === form.values.supplier && isFirst)
      insertSupplierList({ name: newSupplier, created_by: user.nm }, setLoading)
    if (isFirst)
      insertData(firstWeightPayload(), setLoading, (res) => {
        if (res.isError === true || res.isError === 'Y') return

        form.reset()
        getScaleHistory({}, setLoading, (res) => {
          const temp = []
          res?.forEach((data) =>
            temp.push({ value: data.pcc_vehicle_cd, label: data.pcc_vehicle_cd, data })
          )
          setHistory(temp)
        })
      })
    else updateData(secondWeightPayload(), setLoading)
  }

  return (
    <>
      <Modal opened={opened} onClose={() => {}} withCloseButton={false} centered>
        <div style={{ display: 'grid', placeItems: 'center', fontSize: '4rem', fontWeight: '700' }}>
          {timbangan ? (
            <span style={{ color: '#363636' }}>{timbangan} KG</span>
          ) : (
            <Loader color="#000" variant="oval" />
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            marginTop: '20px'
          }}
        >
          <ButtonWB
            fullWidth
            color="green"
            size="sm"
            leftIcon={<i className="ri-check-line" />}
            onClick={() => setOpened(false)}
          >
            OK
          </ButtonWB>
          <ButtonWB
            fullWidth
            variant="outline"
            size="sm"
            leftIcon={<i className="ri-truck-line" />}
            onClick={readTimbangan}
            disabled={readTimbanganLoading}
          >
            {readTimbanganLoading ? <Loader color="#fff" variant="bars" /> : 'TIMBANG ULANG'}
          </ButtonWB>
        </div>
      </Modal>

      <FormBox onSubmit={form.onSubmit(submitHandler)}>
        <ScaleGrid gutter={'md'} justify="space-between" align="start">
          <ColGrid span={12}>
            <HeaderForm
              form={form}
              customer={customer}
              loading={loading}
              setLoading={setLoading}
              setIsFirst={setIsFirst}
              setDisableList={setDisableList}
              setNewHistory={setNewHistory}
              history={history}
            />
          </ColGrid>
          <ColGrid span={5}>
            <DataUmum
              commodity={commodity}
              form={form}
              customer={customer}
              vendor={vendor}
              loading={loading}
              setDisableList={setDisableList}
              isFirst={isFirst}
              setNewSupplier={setNewSupplier}
              setIsFirst={setIsFirst}
              disableList={disableList}
            />
            <ScaleGrid>
              <Divider />
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
            </ScaleGrid>
          </ColGrid>
          <ColGrid span={7} leftdivider="true">
            <ScaleGrid>
              <Divider label="Data Timbangan" />
              <ScaleDisplay type="scale-out" form={form} />
              <ColGrid span={12}>
                <Grading form={form} disableList={disableList} />
              </ColGrid>
              <ColGrid span={12}>
                <Kualitas form={form} loading={loading} disableList={disableList} />
              </ColGrid>
              <ColGrid span={12}>
                <DataTambahan form={form} loading={loading} disableList={disableList} />
              </ColGrid>
            </ScaleGrid>
          </ColGrid>
        </ScaleGrid>
      </FormBox>
      <Rekapitulasi loading={loading} />
    </>
  )
}

export default Commodity
