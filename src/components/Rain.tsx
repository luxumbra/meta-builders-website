import { useCallback, useEffect } from 'react'

import { rain } from '~mb/animation/rain'
import { useDarkMode } from '~mb/lib/hooks'

export function Rain({
  blur,
  masked,
  effectOpacity,
  z
}: {
  blur?: boolean
  masked?: boolean
  effectOpacity?: string
  z?: number
}): JSX.Element {
  const prefersReductedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
  const { isDarkMode } = useDarkMode()
  const initCallback = useCallback(() => {
    rain(isDarkMode, prefersReductedMotion)
  }, [isDarkMode, prefersReductedMotion])

  useEffect(() => {
    initCallback()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    rain(isDarkMode, prefersReductedMotion)
  }, [isDarkMode, prefersReductedMotion])

  return (
    <div
      data-id='rain'
      className={`rain pointer-events-none fixed inset-0 z-0 h-full w-full opacity-50 motion-reduce:hidden opacity-${
        effectOpacity ?? '50'
      }`}
    >
      {blur ? (
        <div className='pointer-events-none absolute inset-0 z-10 h-full w-full bg-white bg-opacity-20 backdrop-blur-md dark:bg-glass-primary-900 dark:bg-opacity-100 dark:backdrop-blur-md' />
      ) : undefined}

      <div
        className={`pointer-events-none absolute inset-0 h-full w-full ${
          z ? z + 5 : 5
        }`}
        style={{ boxShadow: '0 0 250px 100px black inset' }}
      />

      <canvas
        data-id='rain-canvas'
        className={`rain-canvas absolute ${
          !masked ? 'z-0' : 'z-10'
        } pointer-events-none opacity-50`}
      />
    </div>
  )
}

Rain.defaultProps = {
  blur: false,
  masked: true,
  effectOpacity: 50,
  z: 0
}
