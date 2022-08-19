import { useCallback, useEffect } from "react"

import { rain } from "~mb/animation/rain";

export function Rain({blur}: {blur?: boolean}): JSX.Element {

  const initCallback = useCallback(() => {
    rain()

  }, [])

  useEffect(() => {
    initCallback()
    console.log("rain");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="rain" className="fixed inset-0 w-full h-full z-0 opacity-100 motion-reduce:hidden">
      {blur ? <div className="fixed inset-0 w-full h-full z-10 bg-blend-overlay bg-glass-primary-800 backdrop-blur-lg" /> : undefined}
      <canvas id="rain-canvas" className="fixed z-0 inset-0"/>
    </div>
  )
}

Rain.defaultProps = {
  blur: false
}