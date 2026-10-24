import './Buttons.css'

interface ButtonsProps {
    isLit: boolean
    isBurnedOut: boolean
    candleColor: string
    onToggle: () => void
    onReset: () => void
    onColorChange: (color: string) => void
    isDefaultColor: boolean
    onColorReset: () => void
    onTimerChange: (ms: number | null) => void
    timerMs: number | null
    selectedPreset: number | null
}

const PRESETS = [5, 15, 25, 45]   // minutes

const Buttons = ({
    isLit, 
    isBurnedOut, 
    candleColor, 
    onToggle, 
    onReset, 
    onColorChange,
    isDefaultColor,
    onColorReset,
    onTimerChange,
    selectedPreset,
}:ButtonsProps) => {
  return (
    <div className='button-wrap'>
        <span className="button-group-label top">Burn timer</span>
        <div 
            className="button-row top"
            role="group"
            aria-label="Candle timer"
        >
            {PRESETS.map(min => (
            <button 
                key={min} 
                onClick={() => onTimerChange(min * 60_000)}
                aria-pressed={selectedPreset === min}
                aria-label={`${min} minute timer`}
            >
                {min} min
            </button>
            ))}
            <button 
                onClick={() => onTimerChange(null)}
                aria-pressed={selectedPreset === null}
                aria-label="Turn off timer"
            >Off</button>
        </div>
        <span className="button-group-label">Candle controls</span>
        <div 
            className="button-row"
            role="group"
            aria-label="Candle controls"
        >
            <button 
                className='main'
                onClick={onToggle}
                disabled={isBurnedOut}
                aria-label={isLit ? 'Blow out the candle' : 'Light the candle'}
            >
                {isLit ? 'Blow out' : 'Light'}
            </button>

            <button 
                disabled={!isBurnedOut}
                onClick={onReset}
            >
                New Candle
            </button>
            <label className="color-picker" title="Candle color">
            Candle Color
            {/* <span
                className="color-swatch"
                style={{ background: candleColor }}
            /> */}
            <input
                className="visually-hidden"
                type="color"
                value={candleColor}
                onChange={e => onColorChange(e.target.value)}
                aria-label="Candle color"
            />
            </label>

            <button
                className="color-reset"
                disabled={isDefaultColor}
                onClick={onColorReset}
                aria-label="Reset candle color"
                title="Reset color"
            >
                Reset Color
            </button>
        </div>
    </div>
  )
}

export default Buttons
