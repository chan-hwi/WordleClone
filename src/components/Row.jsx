import React from 'react'
import Word from './Word';

function Row({ len, word, status, shake, setShake }) {
  return (
    <div className={shake ? 'shake' : ''} style={{ display: 'flex', gap: '8px' }} onAnimationEnd={() => setShake(false)}>
        {[...Array(len).keys()].map(index => 
        <Word 
          key={index} char={index >= word.length ? " " : word[index]} 
          status={!status ? 0 : status[index]}
        />)}
    </div>
  )
}

export default Row