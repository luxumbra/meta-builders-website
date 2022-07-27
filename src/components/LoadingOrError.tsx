import type { ReactElement } from 'react'

import '~mb/styles/loader.css'

export function LoadingGrid(): ReactElement {
  return (
    <div className='lds-grid'>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export function LoadingRipple(): ReactElement {
  return (
    <div className='lds-ripple'>
      <div />
      <div />
    </div>
  )
}
type Properties = {
  error?: Error
  isInline?: boolean
}
export default function LoadingOrError({ error, isInline }: Properties): ReactElement {

  if (isInline) {
    return (
      <div className='leadIn relative flex h-auto w-full items-center justify-center bg-transparent'>
        {error ? (
          <p className='text-inherit text-red-500'>error.message</p>
        ) : (
          <div className='flex flex-col flex-wrap items-center gap-3'>
            <LoadingGrid />
            <p className='text-inherit font-bold text-teal-500 dark:text-teal-500'>
              Loading...<span className="gradient-text">🐌</span>
            </p>
          </div>
        )}
      </div>
    )
  }
  return (
    <div className='fixed top-0 left-0 z-[1000] flex h-screen w-full items-center justify-center bg-slate-200 bg-gradient-to-bl dark:from-slate-700 dark:to-slate-900'>
      {error ? (
        <div className='flex flex-col flex-wrap items-center gap-3'>
          <p className='text-6xl font-bold'>error.message</p>
        </div>
      ) : (
        <div className='flex flex-col flex-wrap items-center gap-3'>
          <LoadingGrid />
          <p className='text-6xl font-bold text-teal-500 dark:text-teal-500'>
            Loading...<span className="gradient-text transform -scale-[1]">🐌</span>
          </p>
        </div>
      )}
    </div>
  )
}
LoadingOrError.defaultProps = {
  error: undefined,
  isInline: false
}
