import React from 'react'

const commoditySubmenu = [
  {
    cd: 'TBS Inti',
    label: 'TBS Inti',
    path: '/tbs-inti',
    icon: (
      <>
        <i className="ri-leaf-line" />
      </>
    ),
    rightIcon: ''
  },
  {
    cd: 'TBS Plasma',
    label: 'TBS Plasma',
    path: '/tbs-plasma',
    icon: (
      <>
        <i className="ri-leaf-line" />
      </>
    ),
    rightIcon: ''
  },
  {
    cd: 'TBS Luar',
    label: 'TBS Luar',
    path: '/tbs-luar',
    icon: (
      <>
        <i className="ri-leaf-line" />
      </>
    ),
    rightIcon: ''
  },
  {
    cd: 'CPO',
    label: 'CPO',
    path: '/CPO',
    icon: (
      <>
        <i className="ri-leaf-line" />
      </>
    ),
    rightIcon: ''
  },
  {
    cd: 'PKO',
    label: 'PKO',
    path: '/PKO',
    icon: (
      <>
        <i className="ri-leaf-line" />
      </>
    ),
    rightIcon: ''
  }
]

const nonCommoditySubmenu = [
  {
    cd: 'SOLID',
    label: 'Solid',
    path: '/solid',
    icon: (
      <>
        <i className="ri-leaf-line" />
      </>
    ),
    rightIcon: ''
  },
  {
    cd: 'SOLAR',
    label: 'Solar',
    path: '/solar',
    icon: (
      <>
        <i className="ri-leaf-line" />
      </>
    ),
    rightIcon: ''
  },
  {
    cd: 'TANKOS',
    label: 'Tankos',
    path: '/tankos',
    icon: (
      <>
        <i className="ri-leaf-line" />
      </>
    ),
    rightIcon: ''
  },
  {
    cd: 'OTHERS',
    label: 'Lain-Lain',
    path: '/others',
    icon: (
      <>
        <i className="ri-leaf-line" />
      </>
    ),
    rightIcon: ''
  }
]
const menu = [
  {
    label: 'Commodity',
    path: '/home',
    icon: (
      <>
        <i className="ri-scales-fill" />
      </>
    ),
    rightIcon: '',
    child: commoditySubmenu
  },
  {
    label: 'Non Commodity',
    path: '/non-commodity',
    icon: (
      <>
        <i className="ri-truck-line" />
      </>
    ),
    rightIcon: '',
    child: nonCommoditySubmenu
  },
  {
    label: 'Laporan',
    path: '/report',
    icon: (
      <>
        <i className="ri-survey-line" />
      </>
    ),
    rightIcon: '',
    child: false
  },
  {
    label: 'Upload',
    path: '/sync',
    icon: (
      <>
        <i className="ri-refresh-line"></i>
      </>
    ),
    rightIcon: '',
    child: false
  }
]

export { menu, commoditySubmenu, nonCommoditySubmenu }
