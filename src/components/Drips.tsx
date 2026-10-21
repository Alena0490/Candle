import { useMemo, type CSSProperties } from 'react'
import './Drips.css'

const COUNT = 14

const Drips = () => {
    const drips = useMemo (
        () =>
            Array.from({ length: COUNT }, (_, i) => ({
            i,
            x: 8 + (i + Math.random()) * (84 / COUNT),
            start: 0.99 - Math.random() ** 2 * 0.6,
            max: 1 + Math.random() * 3, 
            width: 0.25 + Math.random() * 0.25, 
            })),
        []
    )

  return (
    <div className="drips" aria-hidden={true}>
        {drips.map(d => (
            <div
            className="one-drip"
            key={d.i}
            style={{
                '--x': `${d.x}%`,
                '--start': d.start,
                '--max': `${d.max}rem`,
                '--width': `${d.width}rem`,
            } as CSSProperties}
            />
        ))}
    </div>
  )
}

export default Drips
