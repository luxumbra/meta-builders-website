/* eslint-disable react/jsx-props-no-spreading */

import { Icon } from '@iconify/react'
import { normalizeProps, useActor } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import type { PropTypes } from '@zag-js/types'
import '~mb/styles/toast.css'

/**
 * Toast component for displaying messages to the user
 */
function Toast({
  actor,
  id
}: {
  actor: toast.Service
  id: string
}): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [state, send] = useActor(actor)
  const toastApi = toast.connect<PropTypes>(state, send, normalizeProps)

  function onToastDismiss(): void {
    toastApi.dismiss()
  }

  return (
    <div
      id={id}
      className='toast pointer-events-auto px-0'
      {...toastApi.rootProps}
    >
      <div className='toast-header z-10 inline-flex items-start justify-between px-5'>
        <h3 className='m-0 font-normal' {...toastApi.titleProps}>
          {toastApi.title}
        </h3>
        <span>
          {toastApi.type === 'loading' ? (
            <Icon icon='mdi:spinner' className='animate-spin' />
          ) : undefined}
        </span>
        <button
          type='button'
          className='group btn btn-link absolute -mr-3 min-h-0 self-start p-0 hover:text-violet-500'
          onClick={onToastDismiss}
        >
          <Icon
            icon='mdi:close'
            className='transition-colors text-lg group-hover:text-violet-500'
          />
          <span className='sr-only'>Dismiss</span>
        </button>
      </div>
      <div className='toast-body px-5'>
        <p {...toastApi.descriptionProps}>{toastApi.description}</p>
      </div>
      <div {...toastApi.progressbarProps} />

      <div className='toast-bg' />
    </div>
  )
}

export default Toast
