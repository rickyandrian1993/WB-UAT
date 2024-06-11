import React from 'react'
import PropTypes from 'prop-types'
import logo from '../../assets/images/Wide.png'
import { LogoStyled } from '../../assets/style/styled'
import { title } from '../../../package.json'

export default function WideLogo({ size }) {
  return (
    <LogoStyled>
      <img src={logo} alt="Wide Agri Logo" />
      <span>
        <strong>{title}</strong>
      </span>
    </LogoStyled>
  )
}

WideLogo.propTypes = {
  size: PropTypes.string
}
