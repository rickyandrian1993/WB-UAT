import { Divider } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import { ColGrid, FormBox, ScaleGrid } from '../../assets/style/styled'
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
import { ButtonActions, DisplayTimbangan, ModalTimbangan } from './components'

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
      <ModalTimbangan
        isOpen={opened}
        setIsOpen={() => setOpened(false)}
        weight={timbangan}
        loading={readTimbanganLoading}
        readWeight={readTimbangan}
      />

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
              <ButtonActions
                disableList={disableList}
                form={form}
                loading={loading}
                loadingNfc={loadingNfc}
                nfcReader={nfcReader}
                readTimbangan={readTimbangan}
                readTimbanganLoading={readTimbanganLoading}
                setDisableList={setDisableList}
              />
            </ScaleGrid>
          </ColGrid>
          <ColGrid span={7} leftdivider="true">
            <ScaleGrid>
              <Divider label="Data Timbangan" />
              <DisplayTimbangan form={form} type={'scale-out'} />
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
