import React from 'react'
import Row from './Row';

function Board({ len, chance, words, status }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
        {[...Array(chance).keys()].map(index => 
        <Row 
            key={index} status={status.length <= index ? 0 : status[index]} 
            len={len} word={(index >= words.length ? "" : words[index])}
        />)}
    </div>
  )
}

export default Board