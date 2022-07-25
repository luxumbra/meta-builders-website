/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable react/jsx-props-no-spreading */
import { normalizeProps } from "@zag-js/react"
import * as toast from '@zag-js/toast'
import type { PropTypes } from '@zag-js/types'

// 1. Create the single toast
function Toast(properties: any): JSX.Element {
  const { toast: toastProperties } = properties
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const api = toast.connect<PropTypes>(toastProperties.state, toastProperties.send, normalizeProps)

  return (
    <div {...api.rootProps}>
      <h3 {...api.titleProps}>{api.title}</h3>
      <p>{api.title}</p>
      <button type="button" onClick={api.dismiss}>Close</button>
      <div {...api.progressbarProps} />
    </div>
  )
}

export default Toast


// // 2. Create the toast context
// const ToastContext = createContext()
// const useToast = () => useContext(ToastContext)

// // 3. Create the toast group provider
// export function ToastProvider() {
//   const [state, send] = useMachine(toast.group.machine)
//   const ref = useSetup({ send, id: "1" })
//   const api = toast.group.connect(state, send, normalizeProps)

//   return (
//     <ToastContext.Provider value={api}>
//       {Object.entries(api.toastsByPlacement).map(([placement, toasts]) => (
//         <div key={placement} {...api.getGroupProps({ placement })}>
//           {toasts.map((toast) => (
//             <Toast key={toast.id} actor={toast.actor} />
//           ))}
//         </div>
//       ))}
//     </ToastContext.Provider>
//   )
// }

