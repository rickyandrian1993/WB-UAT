import React, { useEffect, useState } from 'react'
import { Clock } from '../../components'
import { NavGrid, NavCol } from '../styledLayout'
import { useLocation } from 'react-router-dom'
import { findLabelPath, getStore } from '../../helpers/utility'
import { Divider } from '@mantine/core'

const Top = () => {
  const mill = getStore('mill')
  const { pathname } = useLocation()
  const [title, setTitle] = useState('')

  useEffect(() => {
    setTitle(findLabelPath(pathname)?.label)
  }, [pathname])

  return (
    <NavGrid align="stretch">
      <NavCol span="content">{title}</NavCol>

      <NavCol span="content">Wide Agri - Weigh Bridge System</NavCol>
      <NavCol span="content">
        <NavGrid>
          <NavCol span="content">{mill?.mill.nm}</NavCol>
          <Divider orientation="vertical" />
          <NavCol span="content">
            <Clock />
          </NavCol>
        </NavGrid>
      </NavCol>
    </NavGrid>
  )
}
export default Top
