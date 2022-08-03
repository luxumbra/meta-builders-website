import { useEffect, useRef } from 'react'

import { useIntersectionObserver } from 'usehooks-ts'

export interface IContentSectionProperties {
  title?: string
  id?: string
  justify?: string
  children: React.ReactNode
  lead?: React.ReactNode
}
/**
 * **ContentSection** - Wraps each page section in a `section` element
 * @param param0 {title: string, id: string, justify?: string, children: React.ReactNode, lead: React.ReactNode}
 * @returns JSX.Element
 */
export function ContentSection({
  title,
  id,
  justify,
  children,
  lead
}: IContentSectionProperties): JSX.Element {
  const sectionReference = useRef<HTMLDivElement>(null)
  const animatedElementReference = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(animatedElementReference, {})
  const isVisible = !!entry?.isIntersecting

  useEffect(() => {
    // console.log(`Render section ${title ?? 'undefined'}`, { isVisible })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);




  return (
    <section
      id={id}
      ref={sectionReference}
      className={`
      flex
      flex-col
      items-center
      justify-${justify ?? 'start'}
      min-h-screen
      w-full
      scroll-mt-24
      overflow-x-hidden
      overflow-y-hidden
      bg-transparent
      dark:bg-blue-900
      transition-colors duration-300
      `}
    >
      <div
        ref={animatedElementReference}
        className='
          relative
          my-20
          xl:my-24
          flex
          w-full
          flex-col
          items-center space-y-7
          2xl:space-y-8
          px-3
          md:px-0
          '
      >
        <div className='flex flex-col items-center'>
          <h2 className='gradient-text text-shadow dark:text-shadow-alt text-center font-extrabold tracking-tight text-4xl 2xl:text-6xl'>
            {title}
          </h2>
        </div>
        <p className='max-w-xl 2xl:max-w-3xl text-center font-extrabold text-xl 2xl:text-2xl dark:text-slate-50'>
          {lead}
        </p>
        {children}
      </div>
    </section>
  )
}

export default ContentSection

ContentSection.defaultProps = {
  title: '',
  id: '',
  justify: 'start',
  lead: <div className='hidden' />
}
