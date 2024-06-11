import domToPdf from 'dom-to-pdf'
import PropTypes from 'prop-types'

export default function toPdf(filename, content) {
  const element = document.querySelector(content)
  element.style.margin = '20px'
  const options = {
    filename: `${filename}.pdf`,
    orientation: 'l'
  }

  domToPdf(element, options, () => {})

  element.style.margin = '0'
  return { toPdf }
}

toPdf.propTypes = {
  content: PropTypes.string
}
