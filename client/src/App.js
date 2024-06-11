import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Authenticate } from './routes'
import { Login } from './pages'
import { GlobalStyledComponent } from './assets/style/styled'
import AppLayout from './layouts/AppLayout'

export default function App() {
  return (
    <GlobalStyledComponent>
      <HashRouter>
        <React.Suspense>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Authenticate />}>
              <Route path="*" element={<AppLayout />} />
            </Route>
          </Routes>
        </React.Suspense>
      </HashRouter>
    </GlobalStyledComponent>
  )
}
