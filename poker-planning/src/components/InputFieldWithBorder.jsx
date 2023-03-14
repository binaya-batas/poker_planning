import React from 'react'

const InputFieldWithBorder = ({...rest}) => {
  return (
    <div className='inputFieldWithBorder'>
        <label for="">{...rest.placeholder}</label>
        <input {...rest} />
    </div>
  )
}

export default InputFieldWithBorder