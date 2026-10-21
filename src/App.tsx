import type { CSSProperties } from 'react'
import { useCandle } from './hooks/useCandle'
import Buttons from './components/Buttons'  
import Smoke from './components/Smoke'
import Drips from './components/Drips'
import './App.css'

const App = () => {
  const { isLit, progress, isBurnedOut, toggle, reset, smokeId, candleId  } = useCandle()


  return (
    <div className="candle-wrap">
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
      />
    </div>
  )
}

export default App