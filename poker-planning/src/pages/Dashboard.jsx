import React, { useState } from 'react'

import Button from '../components/Button'
import AddStoryPoints from '../components/AddStoryPoints'
import MemberList from '../components/MemberList'
import StoryPointsList from '../components/StoryPointsList'

let members = [
    {
        name: 'Binaya Batas',
        role: 'Moderator'
    },
    {
        name: 'Kenish Dahal',
        role: 'Member'
    }
]

const Dashboard = () => {
    const [showAddStories, setShowAddStories] = useState(false);

    return (
        <div className="container">
            <div className='dashboard'>
                <MemberList members={members} />
                <div className="dashboard__vote">
                    <div className="dashboard__vote__title">Click to vote</div>
                    <StoryPointsList />
                </div>
                <div className="dashboard__storypoints">
                    <div className="dashboard__storypoints__title">Add Storypoints</div>
                    <AddStoryPoints />
                </div>
            </div>
        </div>
    )
}

export default Dashboard