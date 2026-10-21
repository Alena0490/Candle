import { useMemo, type CSSProperties } from 'react'
import './Smoke.css'

const COUNT = 16

const Smoke = () => {
    const puffs = useMemo(
        () =>
            Array.from({ length: COUNT }, (_, i) => ({
            i,
            drift: (Math.random() - 0.5) * 3,
            size: 0.8 + Math.random() * 0.5, 
            })),
        []
    )

  return (
    <div className='smoke' aria-hidden={true}>
        <svg width="0" height="0" style={{ position: 'absolute' }}>
            <filter id="smoke-filter">
                <feTurbulence type="fractalNoise" baseFrequency="0.02 0.06" numOctaves={3} />
                <feDisplacementMap in="SourceGraphic" scale={33} xChannelSelector="R" yChannelSelector="G" />
            </filter>
        </svg>
        {puffs.map(p => (
            <div
                className="smoke-element"
                key={p.i}
                style={{
                '--i': p.i,
                '--drift': `${p.drift}rem`,
                '--size': p.size,
                } as CSSProperties}
            />
        ))}
    </div>
  )
}

export default Smoke
