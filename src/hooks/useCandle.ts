import { useEffect, useReducer } from 'react'

export const BURN_TIME_MS = 4 * 60 * 60 * 1000   // 4 hours
const SPEED = 1  //  240 → 1 minute
const STORAGE_KEY = 'candle-state'

type CandleState = {
  isLit: boolean
  burnedMs: number
  smokeId: number
  candleId: number 
}   

type CandleAction =
  | { type: 'TOGGLE' }
  | { type: 'TICK'; deltaMs: number }
  | { type: 'RESET' }

const initialState: CandleState = { isLit: true, burnedMs: 0, smokeId: 0, candleId: 0 }

function candleReducer(state: CandleState, action: CandleAction): CandleState {
  switch (action.type) {
    case 'TOGGLE': {
      if (state.isLit) {
        return { ...state, isLit: false, smokeId: state.smokeId + 1 }
      }
      if (state.burnedMs >= BURN_TIME_MS) return state   
      return { ...state, isLit: true }
    }

    case 'TICK': {
      if (!state.isLit) return state
      const burnedMs = Math.min(BURN_TIME_MS, state.burnedMs + action.deltaMs * SPEED)
      if (burnedMs >= BURN_TIME_MS) {
        return { ...state, burnedMs, isLit: false, smokeId: state.smokeId + 1 }
      }
      return { ...state, burnedMs }
    }

    case 'RESET':
      return { ...initialState, isLit: false, candleId: state.candleId + 1  }

    default:
      return state
  }
}

  const loadState = (fallback: CandleState): CandleState => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === null) return fallback

      const data = JSON.parse(saved)        
      if (!data.isLit) return data

      const elapsed = Date.now() - data.savedAt   
      const burnedMs = Math.min(BURN_TIME_MS, data.burnedMs + elapsed * SPEED)

      if (burnedMs >= BURN_TIME_MS) {
        return { ...data, burnedMs, isLit: false } 
      }
      return { ...data, burnedMs }            
    } catch {
      return fallback
    }
  }

export function useCandle() {
  const [state, dispatch] = useReducer(candleReducer, initialState, loadState)

  useEffect(() => {
    if (!state.isLit) return

    let last = performance.now()
    const id = setInterval(() => {
      const now = performance.now()
      dispatch({ type: 'TICK', deltaMs: now - last })
      last = now
    }, 1000)

    return () => clearInterval(id)
  }, [state.isLit])

  useEffect ( () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...state, savedAt: Date.now() })
    )
  }, [state])

  const progress = 1 - state.burnedMs / BURN_TIME_MS   // 1 = nová, 0 = dohořelá

  return {
    ...state,
    progress,
    isBurnedOut: progress <= 0,
    toggle: () => dispatch({ type: 'TOGGLE' }),
    reset: () => dispatch({ type: 'RESET' }),
  }
}