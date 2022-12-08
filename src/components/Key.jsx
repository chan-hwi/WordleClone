import React from 'react'

const colorArray = ['lightgray', '#787878', '#DBA800', '#5CB85C'];

function Key({ char, status, onclick, onKeyDown }) {
  return (
    <button style={{ 
        width: `${char.length > 1 ? '75px' : '45px'}`, height: '60px', color: `${!status ? 'black' : 'white'}`, fontWeight: 'bold', 
        backgroundColor:`${colorArray[status]}`, display: 'flex', justifyContent: 'center', alignItems: 'center',
        borderRadius: '6px', border: 'none', cursor: 'pointer' }}
        onClick={onclick}
    >
        {char}
    </button>
  )
}

export default Key