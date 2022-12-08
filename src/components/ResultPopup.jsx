import React from 'react'
import ScoreBar from './ScoreBar';

function ResultPopup({ show, setShow, tries, scores, setScores, gameCount, gameOver, answerWord }) {
  if (!show) return null;
  const winCount = Object.entries(scores).reduce((p, [a, b]) => p + b, 0);
  const maxCount = Object.entries(scores).reduce((p, [a, b]) => Math.max(p, b), 0);
  const winRatio = Math.floor(winCount / gameCount * 100);

  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5' }}></div>
        <div style={{ position: 'relative', width: '500px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', 
                      justifyContent: 'center', alignItems: 'center', borderRadius: '8px', zIndex: 1, padding: '8px' }}>
          <header>
            <h1>Game Result</h1>
            <button style={{ position: 'absolute', top: 8, right: 8, width: '32px', height: '32px', outline: 'none', border: 'none',
                             backgroundColor: 'transparent', cursor: 'pointer', color: 'gray', display: 'flex', alignItems: 'center' }} 
                    onClick={() => setShow(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>
          <article style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {gameOver === 1 ? <h3 style={{ marginTop: 0, textAlign: 'center' }}>You Win!</h3>
              : <h3 style={{ marginTop: 0, textAlign: 'center' }}><p style={{ marginTop: 0 }}>You Lose!</p><p style={{ marginTop: 0 }}>The Answer was {answerWord}</p></h3>
              }
            </div>
            <h4 style={{ marginTop: 0, textAlign: 'center' }}>
              Number of tries: {tries}
            </h4>
            <h3>Score Distribution</h3>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', gap: '4px' }}>
              {Object.entries(scores).map(([score, count]) => {
                return <div style={{ display: 'flex', width: '80%' }} key={score}>
                  <div style={{ margin: 0, fontWeight: 'bold', marginRight: '4px' }}>{score}</div>
                  <ScoreBar active={gameOver === 1 && tries === parseInt(score)} count={count} ratio={!maxCount ? 100 : Math.floor(count / maxCount * 100)} />
                </div>
              })}
            </div>
          </article>
          <footer style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
                           width: '100%', marginTop: '16px', marginBottom: '40px  ' }}>
            <h3>Win VS Lose</h3>
            <div style={{ width: '80%', backgroundColor: 'black', display: 'flex', color: 'white', fontWeight: 'bold' }}>
              <div style={{ width: `${winRatio}%`, padding: '12px 0', backgroundColor: '#5CB85C', display: 'flex', justifyContent: 'center' }}>{winCount > 0 && winCount}</div>
              <div style={{ width: `${100 - winRatio}%`, padding: '12px 0', backgroundColor: '#ff4f4f', display: 'flex', justifyContent: 'center' }}>{gameCount > winCount && gameCount - winCount}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '16px', height: '16px', backgroundColor: '#5CB85C' }}></div>
                <div>Win</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '16px', height: '16px', backgroundColor: '#ff4f4f' }}></div>
                <div>Lose</div>
              </div>
            </div>
          </footer>
        </div>
    </div>
  )
}

export default ResultPopup