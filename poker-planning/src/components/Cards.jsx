import React from 'react'

const Cards = ({ number }) => {
  return (
    <div className='card'>
        <p className='card__number'>{number}</p>
    </div>
  )
}

export default Cards