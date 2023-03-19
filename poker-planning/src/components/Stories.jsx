import React from 'react';
import { AiOutlineDelete, AiOutlineStop } from "react-icons/ai";
import { BsSkipStartCircle } from "react-icons/bs";

import useSession from '../hooks/useSession';

const Stories = ({ title, id, deleteStatus, sessionId, currentStory, setCurrentStory }) => {

    const { deleteStory, updateStoryStatus, getStoryByActiveStatus } = useSession();

    const handleStartClick = () => {
        let status = 'PENDING';
        updateStoryStatus(id, status);
        getStoryByActiveStatus(sessionId);
    }

    const handleStopClick = () => {
        let status = 'FINISHED';
        updateStoryStatus(id, status);
        getStoryByActiveStatus(sessionId);
    }

    return (
        <div className='member'>
            <div className="member__title">{`${title}`}</div>
            <div className="actions">
                <div className="members__start" onClick={deleteStatus && handleStartClick}><BsSkipStartCircle  style={{color: '#0275d8'}}/></div>
                <div className="members__stop" onClick={deleteStatus && handleStopClick}><AiOutlineStop style={{color: 'red'}}/></div>
                <div className="member__delete">{deleteStatus && <AiOutlineDelete onClick={() => deleteStory(id)} />}</div>
            </div>
        </div>
    )
}

export default Stories;