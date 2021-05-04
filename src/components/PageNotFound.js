import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const PageNotFound = ({ messageText, buttonText }) => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-center">
      <div>{messageText}</div>
      <div>
        <Link to="/">
          <button className="button">{buttonText}</button>
        </Link>
      </div>
    </div>
  </div>
)

PageNotFound.propTypes = {
  messageText: PropTypes.string,
  buttonText: PropTypes.string,
}

PageNotFound.defaultProps = {
  messageText: 'Page not found',
  buttonText: 'Go to home',
}

export default PageNotFound
