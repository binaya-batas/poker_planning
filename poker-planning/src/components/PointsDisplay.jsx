import React from 'react'

const PointsDisplay = ({ points }) => {
  console.log(points);
  return (
    <div className='points-display'>
        <table class="table">
        <thead>
            <tr>
            <th class="table__header-name">Name</th>
            <th class="table__header-story">Story</th>
            <th class="table__header-points">Points</th>
            </tr>
        </thead>
        <tbody>
            {
                points.map((point) => (
                    <tr>
                    <td class="table__cell-name">{point.name}</td>
                    <td class="table__cell-story">{point.Story}</td>
                    <td class="table__cell-points">{point.Points}</td>
                    </tr>
                ))
            }
        </tbody>
</table>
    </div>
  )
}

export default PointsDisplay