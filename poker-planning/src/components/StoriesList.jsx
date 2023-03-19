import React, { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

import Stories from './Stories';


const StoriesList = ({ stories, deleteStatus, currentStory, sessionId }) => {
    const [showStories, setShowStories] = useState(false)

    const handleClickHeading = () => {
        setShowStories(!showStories);
    }

    return (
        <section className='member-list'>
            <div className="member-list__header">
                <div className="member-list__title">User Stories</div>
                <div className='member-list__dropdown' onClick={handleClickHeading}>{showStories ? <IoMdArrowDropup /> : <IoMdArrowDropdown />} </div>
            </div>
            {showStories &&
                 stories?.map((story, index) => (
                    <Stories
                     key={`${story.storyTitle}${index}`}
                     id={story.id}
                     title={story.story_title} 
                     description={story.story_description} 
                     deleteStatus={deleteStatus}
                     currentStory={currentStory}
                     sessionId={sessionId} 
                    />
                ))
            }
        </section>
    )
}

export default StoriesList;