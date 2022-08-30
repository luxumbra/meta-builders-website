import { useCallback, useEffect } from "react"

import { rain } from "~mb/animation/rain";
import { useDarkMode } from "~mb/lib/hooks";


export function Rain({
  blur,
  masked,
  effectOpacity,
  z,
}: {
  blur?: boolean;
  masked?: boolean;
  effectOpacity?: string;
  z?: number;
}): JSX.Element {

  const { isDarkMode } = useDarkMode()
  const initCallback = useCallback(() => {
    rain(isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    initCallback()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    rain(isDarkMode)
  } , [isDarkMode])

  return (
    <div data-id="rain" className={`rain fixed inset-0 w-full h-full z-0 opacity-50 motion-reduce:hidden pointer-events-none opacity-${effectOpacity ?? '50' }`}>
      {blur ? <div className="absolute inset-0 w-full h-full z-10 bg-white bg-opacity-20 dark:bg-opacity-100 dark:bg-glass-primary-900 backdrop-blur-md dark:backdrop-blur-md pointer-events-none" /> : undefined}

      <div
          className={`absolute inset-0 w-full h-full pointer-events-none ${z ? z + 5 : 5}`}
          style={{boxShadow: '0 0 250px 100px black inset'}}
        />

      <canvas data-id="rain-canvas" className={`rain-canvas absolute ${!masked ? 'z-0' : 'z-10'} opacity-50 pointer-events-none`}/>
    </div>
  )
}

Rain.defaultProps = {
  blur: false,
  masked: true,
  effectOpacity: 50,
  z: 0
}