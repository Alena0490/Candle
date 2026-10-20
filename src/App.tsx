import './App.css'

const App = () => {
  return (
    <div className="candle-wrap">
      <div className="candle-stand">  
        <div className="candle lit">
          <div className="thread"></div>
          <div className="glow"></div>
          <div className="blinking-glow" />
          <div className="flame"></div>
        </div>
        <div className="plate"></div>
      </div>
    </div>
  )
}

export default App