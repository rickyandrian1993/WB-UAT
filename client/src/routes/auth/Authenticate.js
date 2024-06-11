import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { removeStore } from '../../helpers/utility'

export default function AuthenticatePage() {
  const location = useLocation()

  const isLoggedIn = () => {
    let isLoggedIn = null

    if (localStorage.getItem('isLogin') !== undefined) {
      isLoggedIn = localStorage.getItem('isLogin')
    } else {
      localStorage.removeItem('isLogin')
      removeStore('userAccount')
    }
    return isLoggedIn
  }

  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
}
