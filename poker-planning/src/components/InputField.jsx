import React from 'react'

const InputField = ({ ...rest }) => {
  return (
    <div className='inputField'>
        <input {...rest} />
    </div>
  )
}

export default InputField