import React from 'react'

const Button = ({ text, ...rest }) => {
  return (
    <button className='button' {...rest}>
        {text}
    </button>
  )
}

export default Button