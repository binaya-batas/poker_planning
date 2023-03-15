import React from 'react'

import StoryPointsCard from './StoryPointsCard';

const storyPoints = [0, 1, 2, 3, 5, 8, 13, 21, 40, 100, '?'];

const StoryPointsList = () => {
  return (
    <div className='storypoint-list'>
        {
            storyPoints.map(storyPoint => <StoryPointsCard number={storyPoint} />)
        }
    </div>
  )
}

export default StoryPointsList