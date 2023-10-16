import React from 'react'
import PropTypes from 'prop-types'

function Spacer({size = 10}) {
  return(
    <div style={{height: `${size}px`}}></div>
  )
}

Spacer.propTypes = {
  size: PropTypes.number,
}

export default Spacer