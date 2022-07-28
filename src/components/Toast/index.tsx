
/* eslint-disable react/jsx-props-no-spreading */

import { Icon } from "@iconify/react"
import { normalizeProps, useActor } from "@zag-js/react"
import * as toast from '@zag-js/toast'
import type { PropTypes } from '@zag-js/types'
// 1. Create the single toast
function Toast({actor}: {actor: toast.Service}): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [state, send] = useActor(actor)
  const toastApi = toast.connect<PropTypes>(state, send, normalizeProps)

  function onToastDismiss(): void {
    toastApi.dismiss()
  }

  return (
    <div className="toast pointer-events-auto" {...toastApi.rootProps}>
      <div className="toast-header inline-flex items-center justify-between">
        <h3 className="m-0" {...toastApi.titleProps}>{toastApi.title}</h3>
        {/* <p>{toastApi.description}</p> */}
        <button type="button" className="btn btn-link" onClick={onToastDismiss}>
          <Icon icon="mdi:close" className="text-lg"/>
          <span className="sr-only">Dismiss</span>
        </button>
      </div>
      <div {...toastApi.progressbarProps} />
    </div>
  )
}

export default Toast
