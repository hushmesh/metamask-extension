import React from 'react'

const Button = ({ ...buttonProps }) => (
  <button
    className="mesh-button mesh-button-icon"
    { ...buttonProps }
  >
    <img src="images/meshin-icon.svg" width={20} height={20} alt="meshin icon" title="Meshin" />
    <span>mesh in</span>
  </button>
)

export default Button
