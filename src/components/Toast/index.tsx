
/* eslint-disable react/jsx-props-no-spreading */

import { Icon } from "@iconify/react"
import { normalizeProps, useActor } from "@zag-js/react"
import * as toast from '@zag-js/toast'
import type { PropTypes } from '@zag-js/types'

/**
 * Toast component for displaying messages to the user

 */
function Toast({actor, id}: {actor: toast.Service, id: string}): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [state, send] = useActor(actor)
  const toastApi = toast.connect<PropTypes>(state, send, normalizeProps)

  console.log('toastApi', {toastApi});


  function onToastDismiss(): void {
      toastApi.dismiss()
  }

  return (
    <div className="toast relative pointer-events-auto" {...toastApi.rootProps}>
      <div className="toast-header inline-flex items-start justify-between">
        <h3 className="m-0 font-normal" {...toastApi.titleProps}>{toastApi.title}</h3>
        <p>{id}</p>
        <button
          type="button"
          className="group btn btn-link self-start -mr-3 p-0 hover:text-violet-500"
          onClick={onToastDismiss}>
          <Icon icon="mdi:close" className="text-lg group-hover:text-violet-500 transition-colors"/>
          <span className="sr-only">Dismiss</span>
        </button>
      </div>
      <div className="h-1 absolute bottom-0 left-0 right-0" {...toastApi.progressbarProps} />
    </div>
  )
}

export default Toast
