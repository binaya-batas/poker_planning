import React from 'react'

const Member = ({ name, role }) => {
  return (
    <div className='member'>
        {`${name} (${role})`}
    </div>
  )
}

export default Member;