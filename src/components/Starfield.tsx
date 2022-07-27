import { useCallback, useEffect } from "react"

import { starfield } from "~mb/animation/starfield"

export function Starfield(): JSX.Element {

  const initCallback = useCallback(() => {
    starfield()
  }, [])

  useEffect(() => {
    initCallback();
  }, [initCallback]);

  return (
    <div id="starfield" className="absolute inset-0">
      <canvas id="starfield-canvas" />
    </div>
  )
}
