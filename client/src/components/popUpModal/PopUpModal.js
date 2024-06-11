import React from 'react'
import PropTypes from 'prop-types'
import { ModalWb } from './styledPopUpModal'

export default function PopUpModal({ title, state, stateCb, children }) {
  return (
    <ModalWb
      opened={state}
      onClose={() => null}
      transition="fade"
      centered
      withCloseButton={false}
      title={title}
    >
      {children}
    </ModalWb>
  )
}

PopUpModal.propTypes = {
  title: PropTypes.string,
  state: PropTypes.bool,
  stateCb: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node])
}
