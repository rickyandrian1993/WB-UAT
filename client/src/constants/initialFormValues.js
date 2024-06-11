const loginForm = {
  initialValues: {
    username: '',
    password: ''
  },
  validate: (values) => {
    return {
      username: values.username.trim().length === 0 ? 'Username tidak boleh kosong.' : null,
      password: values.password.trim().length === 0 ? 'Password tidak boleh kosong.' : null
    }
  }
}

const initialValues = {
  initialValues: {
    afdeling_nm: '',
    after_cut: 0, // Setelah potongan
    bjr: 0,
    block_nm: '',
    block_nm2: '',
    block_nm3: '',
    comodity_nm: '',
    contract: '',
    created_by: '',
    created_dt: '',
    cut: 0, // Potongan
    dirt: 0,
    do_date: null,
    do_number: '',
    dobi: 0,
    driver_nm: '',
    disortasi_worker_cd: '',
    ekspedisi_nm: '',
    estate_nm: '',
    farmer: '',
    ffa: 0,
    first_update: null,
    first_w: 0,
    fresh_fruit: 0, // Buah mentah
    fresh_fruit_kg: 0, // Buah mentah
    garbage: 0, // Sampah
    garbage_kg: 0, // Sampah
    grade_class: '',
    grading_brondolan: 0, // Grading data Brondolan
    grading_brondolan_kg: 0, // Grading data Brondolan
    is_from_tph: 'N',
    is_lefted: 'N',
    janjang_kosong: 0, // Janjang kosong
    janjang_kosong_kg: 0, // Janjang kosong
    loader_nm: '', // Pemuat
    loader_nm_2: '', // Pemuat 2
    loader_nm_3: '', // Pemuat 3
    long_stalk: 0, // Tangkai Panjang
    long_stalk_kg: 0, // Tangkai Panjang
    mill_arrive_dt: '', // Mill
    mill_nm: '', // Mill
    moist: 0,
    mt_cmdity_catgds_cd: '', // Group
    mt_vndr_rent_vhcle_cd: null, // Ekspedisi
    netto_w: 0,
    overripe_brondolan: 0, // Brondolan Busuk
    overripe_brondolan_kg: 0, // Brondolan Busuk
    overripe_fruit: 0, // Buah Busuk
    overripe_fruit_kg: 0, // Buah Busuk
    pcc_customer_cd: null, // Customer
    pcc_estate_cd: '',
    pcc_estate_level_cd: '',
    pcc_estate_level_cd2: '',
    pcc_estate_level_cd3: '',
    pcc_evacuation_activity_cd: '',
    pcc_vehicle_cd: '', // Nomor Kendaraan
    pcc_wrkr_cd_driver: '', // Supir
    pcc_wrkr_cd_loader: '', // Pemuat
    pcc_wrkr_cd_loader_2: '', // Pemuat 2
    pcc_wrkr_cd_loader_3: '', // Pemuat 3
    pv: 0,
    remark1: '', // Catatan
    restan_overnight: 0, // Restan
    restan_overnight_kg: 0, // Restan
    sand_fruit: 0, // Buah Pasir
    sand_fruit_kg: 0, // Buah Pasir
    seal_number: '',
    second_w: 0,
    spb_date: null,
    spb_number: '',
    spb_weight: 0,
    supplier: '',
    total_brondolan: 0,
    total_bunch: 0,
    total_loaded_nfc: '',
    upload_flag: 'N',
    water: 0, // TBS Air
    water_kg: 0, // TBS Air
    weight_gap: 0, // Selisih Berat
    young_fruit: 0, // Buah Muda
    young_fruit_kg: 0 // Buah Muda
  },
  validateInputOnChange: [
    'dirt',
    'do_number',
    'dobi',
    'driver_nm',
    'farmer',
    'fresh_fruit',
    'garbage',
    'grade_class',
    'grading_brondolan',
    'loader_nm',
    'long_stalk',
    'janjang_kosong',
    'overripe_brondolan',
    'overripe_fruit',
    'pcc_vehicle_cd',
    'remark1',
    'restan_overnight',
    'sand_fruit',
    'seal_number',
    'spb_number',
    'spb_weight',
    'supplier',
    'total_bunch',
    'total_brondolan',
    'water',
    'young_fruit'
  ],
  validate: (values) => {
    return {
      dirt: values?.dirt?.toString().length > 5 ? 'Max karakter 5' : null,
      do_number: values.do_number.trim().length > 20 ? 'Max karakter 20' : null,
      dobi: values?.dobi?.toString().length > 5 ? 'Max karakter 5' : null,
      driver_nm:
        values.driver_nm.trim().length === 0
          ? 'Tidak boleh kosong.'
          : values.driver_nm.trim().length > 50
          ? 'Max karakter 50.'
          : null,
      farmer: values.farmer.trim().length > 50 ? 'Max karakter 50' : null,
      fresh_fruit: values.fresh_fruit.toString().length > 5 ? 'Max karakter 5.' : null,
      garbage: values.garbage.toString().length > 5 ? 'Max karakter 5.' : null,
      grade_class: values.grade_class.trim().length > 3 ? 'Max karakter 3' : null,
      grading_brondolan: values.grading_brondolan.toString().length > 5 ? 'Max karakter 5.' : null,
      janjang_kosong: values.janjang_kosong.toString().length > 5 ? 'Max karakter 5.' : null,
      loader_nm: values.loader_nm.trim().length > 50 ? 'Max karakter 50.' : null,
      long_stalk: values.long_stalk.toString().length > 5 ? 'Max karakter 5.' : null,
      mt_vndr_rent_vhcle_cd:
        values.mt_vndr_rent_vhcle_cd === null || values.mt_vndr_rent_vhcle_cd === ''
          ? 'Tidak boleh kosong.'
          : null,
      overripe_brondolan:
        values.overripe_brondolan.toString().length > 5 ? 'Max karakter 5.' : null,
      overripe_fruit: values.overripe_fruit.toString().length > 5 ? 'Max karakter 5.' : null,
      pcc_customer_cd:
        values.pcc_customer_cd === null || values.pcc_customer_cd === ''
          ? 'Tidak boleh kosong.'
          : null,
      pcc_vehicle_cd: values.pcc_vehicle_cd.trim().length === 0 ? 'Tidak boleh kosong.' : null,
      remark1: values.remark1.trim().length > 200 ? 'Max karakter 200' : null,
      restan_overnight: values.restan_overnight.toString().length > 5 ? 'Max karakter 5.' : null,
      sand_fruit: values.sand_fruit.toString().length > 5 ? 'Max karakter 5.' : null,
      seal_number: values.seal_number.trim().length > 50 ? 'Max karakter 50' : null,
      supplier:
        values.supplier.trim().length === 0
          ? 'Tidak boleh kosong.'
          : values.supplier.trim().length > 50
          ? 'Max karakter 50.'
          : null,
      spb_number: values.spb_number.trim().length > 20 ? 'Max karakter 20' : null,
      spb_weight: values?.spb_weight?.toString().length > 5 ? 'Max karakter 5.' : null,
      total_bunch:
        values?.comodity_nm.search('TBS') === 0 || values?.comodity_nm.search('USB') === 0
          ? values?.total_bunch?.toString().length > 5
            ? 'Max karakter 5.'
            : !values.total_bunch
            ? 'Jumlah tandan tidak boleh kosong atau 0.'
            : null
          : null,
      total_brondolan: values?.total_brondolan?.toString().length > 5 ? 'Max karakter 5.' : null,
      water: values.water.toString().length > 5 ? 'Max karakter 5.' : null,
      young_fruit: values.young_fruit.toString().length > 5 ? 'Max karakter 5.' : null
    }
  }
}

export { initialValues, loginForm }
