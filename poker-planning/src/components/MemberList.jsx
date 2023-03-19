import React, { useState} from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

import ButtonAction from './ButtonAction';

import Member from './Member';


const MemberList = ({ members }) => {
    const [showMembers, setShowMembers] = useState(false)

    const handleClickHeading = () => {
        setShowMembers(!showMembers);
    }

    return (
        <section className='member-list'>
            <div className="member-list__header">
                <div className="member-list__title">Members</div>
                <div className='member-list__dropdown' onClick={handleClickHeading}>{showMembers ? <IoMdArrowDropup /> : <IoMdArrowDropdown />} </div>
            </div>
            {showMembers &&
                 members?.map((member, index) => (
                    <Member key={`${member.name}${index}`} name={member.name}/>
                ))
            }
        </section>
    )
}

export default MemberList