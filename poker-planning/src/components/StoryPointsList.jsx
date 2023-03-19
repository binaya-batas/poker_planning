import React, { useState } from 'react'

import StoryPointsCard from './StoryPointsCard';

const storyPoints = [0, 1, 2, 3, 5, 8, 13, 21, 40, 100, '?'];

const StoryPointsList = ({ currentStory, user, setStoryPoint }) => {

  const handleStoryPointCard = (storyPoint) => {
    setStoryPoint({
      storyId: currentStory.id,
      userId: user.id,
      storyPoint: storyPoint
    });
  }

  return (
    <div className='storypoint-list'>
        {
            storyPoints.map(storyPoint => <StoryPointsCard number={storyPoint} onClick={() => handleStoryPointCard(storyPoint)}/>)
        }
    </div>
  )
}

export default StoryPointsList