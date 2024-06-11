import React from 'react'
import { LoadingOverlay } from '@mantine/core'
import PropTypes from 'prop-types'

export default function Loading({ visible }) {
  return (
    <LoadingOverlay
      visible={visible}
      overlayBlur={2}
      loaderProps={{ size: 'sm', color: '#fff', variant: 'oval' }}
      overlayOpacity={0.3}
      overlayColor="#c5c5c5"
    />
  )
}

Loading.propTypes = {
  visible: PropTypes.bool
}
