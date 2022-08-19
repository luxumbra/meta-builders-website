import { useCallback, useEffect } from "react"

import { rain } from "~mb/animation/rain";

export function Rain(): JSX.Element {

  const initCallback = useCallback(() => {
    rain()

  }, [])

  useEffect(() => {
    initCallback()
    console.log("rain");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="rain" className="fixed inset-0 w-full h-full z-0 opacity-10 motion-reduce:hidden">
      <canvas id="rain-canvas" className="fixed z-0 inset-0"/>
    </div>
  )
}
