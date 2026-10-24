import { useState, useEffect, type CSSProperties } from 'react'
import { useCandle } from './hooks/useCandle'
import { formatTime } from './utils/formatTime'
import Buttons from './components/Buttons'  
import Smoke from './components/Smoke'
import Drips from './components/Drips'
import './App.css'

const DEFAULT_CANDLE_COLOR = '#6f99aa'

const App = () => {
  const { 
    isLit, 
    progress, 
    isBurnedOut, 
    toggle, 
    reset, 
    smokeId, 
    candleId, 
    remainingMs, 
    setTimer,
    timerMs,
    selectedPreset,
  } = useCandle()

  const [candleColor, setCandleColor] = useState(
    () => localStorage.getItem('candle-color') ?? DEFAULT_CANDLE_COLOR
  )

  const status = isBurnedOut
  ? 'The candle has burned out.'
  : isLit
    ? 'The candle is lit.'
    : 'The candle is out.'

  useEffect(() => {
    localStorage.setItem('candle-color', candleColor)
  }, [candleColor])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return                  
      if (
        e.target instanceof HTMLElement &&
        e.target.closest('button, input, select, textarea, [contenteditable]')
      ) return

      if (e.code === 'Space') {
        e.preventDefault()  
        toggle()
      }
      if (e.code === 'KeyN' && isBurnedOut) {
        reset()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [toggle, reset, isBurnedOut])


  return (
    <div 
      className="candle-wrap"
      style={{ '--candle-color': candleColor } as CSSProperties}
    >
      <div className="time-info">
        <time className="time-left">{formatTime(remainingMs)}</time>
        {timerMs !== null && (
          <time className="timer">{formatTime(timerMs)}</time>
        )}
      </div>
      <div className='candle-stand'>  
        <div 
          className={`candle ${isLit? 'lit' : ''}`}
          style={{ '--progress': progress } as CSSProperties}
        >
          <div className="thread"></div>
          <div className="glow"></div>
          <div className="blinking-glow" />
          <div className="flame"></div>
          {smokeId > 0 && <Smoke key={smokeId}/> }
          <Drips key={candleId}/>        
        </div>
        <div className="plate"></div>
      </div>
      <Buttons
        isLit={isLit}
        isBurnedOut={isBurnedOut}
        onToggle={toggle}
        onReset={reset}
        onColorChange={setCandleColor}
        candleColor={candleColor}
        isDefaultColor={candleColor === DEFAULT_CANDLE_COLOR}
        onColorReset={() => setCandleColor(DEFAULT_CANDLE_COLOR)}
        onTimerChange={setTimer}
        timerMs={timerMs}
        selectedPreset={selectedPreset}
      />
      <p className="legend">
        {isBurnedOut
          ? 'Press N for a new candle'
          : isLit
            ? 'Press Space to blow out the candle'
            : 'Press Space to light the candle'}
      </p>
      <p className="visually-hidden" aria-live="polite">{status}</p>
    </div>
  )
}

export default App