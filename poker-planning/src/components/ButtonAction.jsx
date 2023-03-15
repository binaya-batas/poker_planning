import React from 'react'

const ButtonAction = ({text, ...rest}) => {
    return (
        <button className='button__action' {...rest}>
            {text}
        </button>
      )
}

export default ButtonAction