import React, { useEffect } from 'react'

import useSession from '../hooks/useSession';

const History = () => {
  const { getSessionHistory, history } = useSession();

  useEffect(() => {
    getSessionHistory(14);
  }, [])

  return (
    <div className='container'>
      <div className="">Session History</div>
      
      <div class="session-history">
        <table class="session-history__table">
          <thead class="session-history__header">
            <tr class="session-history__row">
              <th class="session-history__cell session-history__cell--date">Date</th>
              <th class="session-history__cell session-history__cell--time">Start time</th>
              <th class="session-history__cell session-history__cell--duration">Actions</th>
            </tr>
          </thead>
          <tbody class="session-history__body">
            {
              history && history.map((session) => (
                <tr class="session-history__row">
                  <td class="session-history__cell session-history__cell--date">{session.name}</td>
                  <td class="session-history__cell session-history__cell--time">{session.created_at}</td>
                  <td class="session-history__cell session-history__cell--duration"></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default History