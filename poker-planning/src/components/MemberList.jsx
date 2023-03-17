import React, {useEffect, useState} from 'react';
import ButtonAction from './ButtonAction';

import Member from './Member';


const MemberList = ({ members }) => {
    const [showMembers, setShowMembers] = useState(false)

    const handleClickHeading = () => {
        setShowMembers(!showMembers);
    }

    return (
        <div className='member-list'>
            <div className="member-list__header">
                <div className="member-list__title">Members</div>
                <div className='' onClick={handleClickHeading}>{showMembers ? '-' : '+'} </div>
            </div>
            {showMembers &&
                members.map((member, index) => (
                    <Member key={`${member.name}${index}`} name={member.name} />
                ))
            }
        </div>
    )
}

export default MemberList