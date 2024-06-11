import { showNotification } from '@mantine/notifications'
import PropTypes from 'prop-types'

export default function ToastNotification({ title, message, isError, cardError = false }) {
  return showNotification({
    title: title,
    message: message,
    color: isError ? 'red' : 'green',
    autoClose: !cardError
  })
}

ToastNotification.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  isError: PropTypes.bool
}
