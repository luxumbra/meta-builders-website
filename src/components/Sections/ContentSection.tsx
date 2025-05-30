import { useRef } from 'react'

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

  // useEffect(() => {
  //   // gsap.set(animatedElementReference.current, { opacity: 0, xPercent: -10 })
  //   if (!animatedElementReference.current) return
  //   gsap.to(animatedElementReference.current, {
  //     opacity: isVisible ? 1 : 0,
  //     duration: 0.2,
  //     delay: 0.2,
  //     ease: "power4.inOut",
  //   })
  // }, [isVisible]);

  return (
    <section
      id={id}
      ref={sectionReference}
      className={`
      content-section
      flex
      flex-col
      items-center
      justify-${justify ?? 'start'}
      z-10
      min-h-screen
      w-full
      scroll-mt-24
      overflow-x-hidden
      overflow-y-hidden
      bg-transparent
      transition-colors duration-300
      2xl:scroll-mt-32
      `}
    >
      <div
        ref={animatedElementReference}
        className={`
          pointer-events-none
          relative
          z-10
          flex
          w-full
          flex-col
          items-center
          space-y-5
          py-20
          px-3
          md:px-0
          xl:py-32
          2xl:space-y-8
          2xl:py-36
          `}
      >
        <div className='flex flex-col items-center'>
          <h2 className='gradient-text text-shadow dark:text-shadow-alt text-center font-extrabold tracking-tight text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl'>
            {title}
          </h2>
        </div>
        <div className='section-lead max-w-2xl xl:max-w-3xl 2xl:max-w-4xl'>
          {lead}
        </div>
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
