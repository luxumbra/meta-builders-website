import type React from 'react'

import usePortal from 'react-useportal'


export function Portal({ children }: { children: JSX.Element }): JSX.Element {
  const { openPortal, closePortal, isOpen, Portal: ZagPortal, ref } = usePortal({
    bindTo: document.querySelector('#portal-root') as HTMLElement,
    closeOnOutsideClick: true,
  })

  return (
    <ZagPortal forwardRef={ref}>
      {children}
    </ZagPortal>
  )
}