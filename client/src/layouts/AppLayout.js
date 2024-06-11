import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import { Commodity, History, Print, Report, SyncPage } from '../pages'
import NavHeader from './layout/NavHeader'

const AppLayout = () => {
  return (
    <AppShell header={<NavHeader />}>
      <Routes>
        <Route path="/" element={<Commodity />} />
        <Route path="/report" element={<Report />} />
        <Route path="/sync" element={<SyncPage />} />
        <Route path="/print" element={<Print />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </AppShell>
  )
}

export default AppLayout
