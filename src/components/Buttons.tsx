import './Buttons.css'

interface ButtonsProps {
  isLit: boolean
  isBurnedOut: boolean
  onToggle: () => void
  onReset: () => void
}

const Buttons = ({isLit, isBurnedOut, onToggle, onReset}:ButtonsProps) => {
  return (
    <div className='button-wrap'>
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
    </div>
  )
}

export default Buttons
