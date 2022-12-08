import Key from './Key';

const keys = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
              ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],    
              ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '← ']];

function Keyboard({ keyStatus, onSubmit, onType, onErase, handleSubmit }) {
    return (
        <div>
            {keys.map((row, index) => 
            <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
                {row.map(key => <Key key={key} char={key} status={keyStatus[key] || 0} 
                    onclick={key.length === 1 ? () => onType(key) : (key === 'ENTER' ? handleSubmit : onErase)}
                />)}
            </div>)}
        </div>
    )
}

export default Keyboard