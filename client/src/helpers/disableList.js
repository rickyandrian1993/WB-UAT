export const allTrue = {
  name: 'alltrue',
  after_cut: true,
  afdeling_nm: true,
  bjr: true,
  block_nm: true,
  block_nm2: true,
  block_nm3: true,
  comodity_nm: false,
  contract: true,
  created_by: true,
  created_dt: true,
  cut: true,
  dirt: true,
  do_date: true,
  do_number: true,
  dobi: true,
  driver_nm: true,
  disortasi_worker_cd: true,
  ekspedisi_nm: true,
  estate_nm: true,
  farmer: true,
  ffa: true,
  first_update: true,
  first_w: true,
  fresh_fruit: true,
  fresh_fruit_kg: true,
  garbage: true,
  garbage_kg: true,
  grade_class: true,
  grading_brondolan: true,
  grading_brondolan_kg: true,
  is_from_tph: true,
  is_lefted: true,
  janjang_kosong: true,
  janjang_kosong_kg: true,
  loader_nm: true,
  loader_nm_2: true,
  loader_nm_3: true,
  long_stalk: true,
  long_stalk_kg: true,
  mill_arrive_dt: true,
  mill_nm: true,
  moist: true,
  mt_vndr_rent_vhcle_cd: true,
  netto_w: true,
  overripe_brondolan: true,
  overripe_brondolan_kg: true,
  overripe_fruit: true,
  overripe_fruit_kg: true,
  pcc_customer_cd: true,
  pcc_mill_cd: true,
  pcc_estate_cd: true,
  pcc_estate_level_cd: true,
  pcc_estate_level_cd2: true,
  pcc_estate_level_cd3: true,
  pcc_evacuation_activity_cd: true,
  pcc_vehicle_cd: true,
  pcc_wrkr_cd_driver: true,
  pcc_wrkr_cd_loader: true,
  pcc_wrkr_cd_loader_2: true,
  pcc_wrkr_cd_loader_3: true,
  pv: true,
  restan_overnight: true,
  restan_overnight_kg: true,
  sand_fruit: true,
  sand_fruit_kg: true,
  seal_number: true,
  second_w: true,
  spb_date: true,
  spb_number: true,
  spb_weight: true,
  supplier: true,
  total_brondolan: true,
  total_bunch: true,
  total_loaded_nfc: true,
  updated_dt: true,
  updated_by: true,
  upload_flag: true,
  weight_gap: true,
  water: true,
  water_kg: true,
  wb_arrive_dt: true,
  wb_created_by: true,
  wb_created_dt: true,
  young_fruit: true,
  young_fruit_kg: true,
  // Button
  nfc_button: true
}

export const disableNonCommodity = {
  ...allTrue,
  name: 'disableNonCommodity',
  contract: false,
  do_date: false,
  do_number: false,
  driver_nm: false,
  first_w: false,
  loader_nm: false,
  mt_vndr_rent_vhcle_cd: false,
  netto_w: false,
  pcc_customer_cd: false,
  pcc_vehicle_cd: false,
  second_w: false,
  spb_date: false,
  spb_number: false,
  supplier: false
}

export const disableCommodity = {
  ...allTrue,
  name: 'disableCommodity',
  driver_nm: false,
  loader_nm: true,
  mt_vndr_rent_vhcle_cd: false,
  pcc_customer_cd: false,
  pcc_vehicle_cd: false,
  supplier: false
}

export const disableTbsInti = {
  ...allTrue,
  name: 'disableTbsInti',
  mt_vndr_rent_vhcle_cd: false,
  pcc_customer_cd: false,
  supplier: false,
  nfc_button: false
}

export const disableTbsLain = {
  ...allTrue,
  name: 'disableTbsLain',
  driver_nm: false,
  farmer: false,
  mt_vndr_rent_vhcle_cd: false,
  pcc_customer_cd: false,
  supplier: false,
  total_brondolan: false,
  total_bunch: false
}

const enableGrading = {
  fresh_fruit: false,
  garbage: false,
  grading_brondolan: false,
  janjang_kosong: false,
  long_stalk: false,
  overripe_brondolan: false,
  overripe_fruit: false,
  restan_overnight: false,
  sand_fruit: false,
  young_fruit: false,
  water: false
}

const enableKualitas = {
  dirt: false,
  dobi: false,
  ffa: false,
  moist: false,
  pv: false
}

export const findDisableList = (key, isFirst, nfc = true) => {
  switch (key) {
    case 'TBS Inti':
    case 'Brondolan':
      return {
        ...disableTbsInti,
        ...(!isFirst && !nfc ? { ...allTrue, ...enableGrading } : null),
        nfc_button: false,
        grade_class: false,
        spb_weight: false,
        comodity_nm: !isFirst
      }
    case 'TBS Plasma':
    case 'USB':
    case 'TBS Luar':
      return {
        ...disableTbsLain,
        ...(!isFirst && !nfc ? { ...allTrue, ...enableGrading } : null),
        grade_class: false,
        spb_weight: false,
        total_brondolan: !isFirst,
        total_bunch: !isFirst,
        comodity_nm: !isFirst
      }
    case 'CPO':
    case 'Kernel':
    case 'CPKO':
    case 'CPKE':
    case 'RBDPO':
    case 'OLEINS':
    case 'Stearin':
    case 'PFAD':
      return {
        ...disableCommodity,
        ...(!isFirst
          ? {
              ...allTrue,
              ...enableKualitas
            }
          : null),
        grade_class: false,
        seal_number: false,
        comodity_nm: !isFirst
      }
    case 'Solar':
    case 'Solid':
    case 'Jangkos':
    case 'Cangkang':
    case 'Cautic Soda':
    case 'Calcium Carbonate':
    case 'Besi Bekas':
    case 'Pupuk':
    case 'Others':
      return {
        ...disableNonCommodity,
        ...(!isFirst ? { ...allTrue } : null),
        comodity_nm: !isFirst,
        loader_nm: true
      }
    default:
      return allTrue
  }
}

export const disableGenerator = (commodity, group, isFirst, nfc = true) => {
  switch (group) {
    case 'TBS':
      if (commodity === 'TBS Inti' || commodity === 'Brondolan')
        return {
          ...disableTbsInti,
          ...(!isFirst && !nfc ? { ...allTrue, ...enableGrading } : null),
          nfc_button: false,
          grade_class: false,
          spb_weight: false,
          comodity_nm: !isFirst
        }
      else
        return {
          ...disableTbsLain,
          ...(!isFirst && !nfc ? { ...allTrue, ...enableGrading } : null),
          grade_class: false,
          spb_weight: false,
          total_brondolan: !isFirst,
          total_bunch: !isFirst,
          comodity_nm: !isFirst
        }
    case 'NC':
      return {
        ...disableNonCommodity,
        ...(!isFirst ? { ...allTrue } : null),
        comodity_nm: !isFirst,
        loader_nm: true
      }
    case 'CPC':
      return {
        ...disableCommodity,
        ...(!isFirst
          ? {
              ...allTrue,
              ...enableKualitas
            }
          : null),
        grade_class: false,
        seal_number: false,
        comodity_nm: !isFirst
      }
    default:
      return allTrue
  }
}
