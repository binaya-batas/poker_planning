import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import Button from '../components/Button'
import AddStoryPoints from '../components/AddStoryPoints'
import MemberList from '../components/MemberList'
import StoryPointsList from '../components/StoryPointsList'

import useStoryPoint from '../hooks/useStoryPoint';
import useSession from '../hooks/useSession';
import StoriesList from '../components/StoriesList'
import Navbar from '../components/Navbar'
import PointsDisplay from '../components/PointsDisplay'

const Dashboard = () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    const { addStoryPoint, getStoryPoints, points } = useStoryPoint();
    const { getSessionMembers, getSessionUserStories, getStoryByActiveStatus, members, stories, currentStory } = useSession();
    const { id } = useParams();
    const loggedIn = JSON.parse(sessionStorage.getItem("loggedIn"));
    
    const [storyPoint, setStoryPoint] = useState({
        storyId: '',
        userId: '',
        storyPoint: ''
      });

    useEffect(() => {
        getStoryPoints(id);

        setInterval(() => {
            getSessionMembers(id);
        }, 10000)
    }, [])
    
    useEffect(() => {
        getSessionMembers(id);

        setInterval(() => {
            getSessionMembers(id);
        }, 10000)
    }, [])

    console.log(members);

    useEffect(() => {
        getSessionUserStories(id);

        setInterval(() => {
            getSessionUserStories(id);
        }, 10000)
    }, [])

    useEffect(() => {
        getStoryByActiveStatus(id);

        setInterval(() => {
            getStoryByActiveStatus(id);
        }, 10000)
    }, [])
    
    const handleVoteClick = (event) => {
        event.preventDefault();
        addStoryPoint(storyPoint);
    }

    const revealStoryPoints = () => {

    }

    //since moderator is always at 0 index of members list.
    let moderator = members[0];

    return (
        <>
        {
            loggedIn ?
            <>
            <Navbar sessionId={id} moderator={moderator}/>
            <div className="container">
                <div className='dashboard'>
                    {/* <StoriesList stories={stories} deleteStatus={user.id === moderator?.id ? true : false} currentStory={setCurrentStory} /> */}
                    <StoriesList stories={stories} deleteStatus={user.id === moderator?.id ? true : false} sessionId={id} />
                    <section className="dashboard__vote">
                        <div className="dashboard__vote__title">Click to vote</div>
                            <div className="dashboard__userstory">
                                <div className="dashboard__userstory__title">{currentStory?.story_title}</div> 
                                <div className="dashboard__userstory__description">{currentStory?.story_description}</div>
                            </div>
                        <StoryPointsList currentStory={currentStory} user={user} setStoryPoint={setStoryPoint} />
                        <div className="dashboard__vote__button">
                            <Button text="Vote" onClick={handleVoteClick}>Vote</Button>
                        </div>
                    </section>
                    <MemberList members={members} />
                    {
                        // Displays add storypoints form only if the user.id is equal to moderator id
                        user.id === moderator?.id &&
                        <section className="dashboard__storypoints">
                            <div className="dashboard__storypoints__title">Add Storypoints</div>
                            <AddStoryPoints id={id} />
                        </section>
                    }
                    {
                        user.id === moderator?.id &&
                        <Button text="Reveal Story Points" onClick={revealStoryPoints} />
                    }
                    {
                        user.id === moderator?.id &&
                        <PointsDisplay points={points} />
                    }
                </div>
            </div>
            </>
            :
            <Navigate to="/login" />
        }
        </>
    )
}

export default Dashboard