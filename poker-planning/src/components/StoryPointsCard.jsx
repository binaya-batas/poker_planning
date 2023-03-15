import React from 'react'

const StoryPointsCard = ({ number }) => {
  return (
    <div className='card'>
        <p className='card__number'>{number}</p>
    </div>
  )
}

export default StoryPointsCard;