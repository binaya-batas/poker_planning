import React from 'react'

const StoryPointsCard = ({ number, onClick }) => {
  return (
    <div className='card' onClick={onClick}>
        <p className='card__number'>{number}</p>
    </div>
  )
}

export default StoryPointsCard;