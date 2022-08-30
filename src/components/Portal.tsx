import usePortal from 'react-useportal'


export function Portal({ children }: { children: JSX.Element }): JSX.Element {
  const { Portal: ZagPortal, ref } = usePortal({
    bindTo: document.querySelector('#portal-root') as HTMLElement,
    closeOnOutsideClick: true,
  })

  return (
    <ZagPortal forwardRef={ref}>
      {children}
    </ZagPortal>
  )
}