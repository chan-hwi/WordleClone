import React from 'react'

const colorArray = ['white', '#787878', '#DBA800', '#5CB85C'];

function Word({ char, status }) {
    return (
    <div style={{ width: '48px', height: '48px', fontSize: '32px', fontWeight: 'bold', border: `${!status ? "1px solid lightgray" : "none"}`,
                    cursor: 'default', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    backgroundColor: `${!status ? 'white' : colorArray[status]}`,
                    color: `${!status ? 'black' : 'white'}`
                }}>{char}</div>
    )
}

export default Word