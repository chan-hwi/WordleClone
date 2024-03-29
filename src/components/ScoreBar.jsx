import React from 'react'

function ScoreBar({ count, ratio, active, show }) {
  return (
    <div className={show ? 'slide-expand' : ''} style={{ width: `${ratio}%`, display: 'flex', fontWeight: 'bold',
                  justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: `${active ? '#5CB85C' : '#787878'}`}}>
        {count}
    </div>
  )
}

export default ScoreBar;