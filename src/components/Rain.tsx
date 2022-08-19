import { useCallback, useEffect } from "react"

import { rain } from "~mb/animation/rain";
import { useDarkMode } from "~mb/lib/hooks";


export function Rain({blur, masked}: {blur?: boolean, masked?: boolean}): JSX.Element {

  const { isDarkMode } = useDarkMode()
  const initCallback = useCallback(() => {
    rain(isDarkMode)
    console.log("rain");
  }, [isDarkMode])

  useEffect(() => {
    initCallback()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    rain(isDarkMode)
    console.log("rain darkmode changed");

  } , [isDarkMode])

  return (
    <div data-id="rain" className="rain fixed inset-0 w-full h-full z-0 opacity-100 motion-reduce:hidden">
      {blur ? <div className="absolute inset-0 w-full h-full z-10 bg-white bg-opacity-20 dark:bg-opacity-100 dark:bg-glass-primary-900 backdrop-blur-md dark:backdrop-blur-md" /> : undefined}
      <canvas data-id="rain-canvas" className={`rain-canvas absolute ${!masked ? 'z-0' : 'z-10'} opacity-100`}/>
    </div>
  )
}

Rain.defaultProps = {
  blur: false,
  masked: false
}