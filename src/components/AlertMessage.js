import React from 'react'
import PropTypes from 'prop-types'

const AlertMessage = ({ children }) => <div>{children}</div>
AlertMessage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default AlertMessage
