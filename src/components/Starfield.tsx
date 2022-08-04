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
    <div id="starfield" className="absolute hidden lg:block inset-0 bg-gradient-to-bl from-slate-900 to-slate-600 z-0 opacity-50">
      <canvas id="starfield-canvas" />
    </div>
  )
}
