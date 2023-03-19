import React from 'react';
import { useNavigate } from 'react-router-dom';

import useSession from '../hooks/useSession'

const Navbar = ({ sessionId, moderator }) => {
    const { endSession } = useSession();
    const navigate = useNavigate();

    const handleEndSession = (event) => {
        event.preventDefault();
        endSession(sessionId);
        sessionStorage.clear();
        navigate('/session');
    }

    const handleHistory = () => {
        navigate('/session/history');
    }

    return (
        <nav className='navbar'>
            <div className="navbar__logo">Poker Planning</div>
            <div className="navbar__action">
                <button className="navbar__action__endroom" onClick={handleEndSession}>End Session</button>
                <button className="navbar__action__history" onClick={handleHistory}>History</button>
            </div>
        </nav>
    )
}

export default Navbar