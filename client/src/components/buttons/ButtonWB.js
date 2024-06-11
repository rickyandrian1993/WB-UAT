import React from 'react'
import PropTypes from 'prop-types'
import { StyleButton } from './styledButtonWB'

export default function ButtonWB(props) {
  const { size, children = '', ...rest } = props

  return (
    <StyleButton size={size} radius="md" {...rest}>
      {children}
    </StyleButton>
  )
}

ButtonWB.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  children: PropTypes.any
}
