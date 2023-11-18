import { useEffect, useRef } from 'react'

import gsap from 'gsap'
import _ from 'lodash'
import { HashLink } from 'react-router-hash-link'
import { useEventListener } from 'usehooks-ts'

import HeroVideo from '~mb/components/HeroVideo'
import { Rain } from '~mb/components/Rain'
import { useSplashContentAnimation } from '~mb/hooks/animation'

export default function SplashSection(): JSX.Element {
  const sectionReference = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)
  const maskInner = useRef<HTMLDivElement>(null)
  const heroVideo = new URL('/assets/video/splash.mp4', import.meta.url).href
  // const widths = [450, 800];

  const elementSelector = '.leadIn'
  const triggerSelector = sectionReference
  const scrollIn1Ref = useRef<HTMLDivElement>(null)
  const scrollIn2Ref = useRef<HTMLDivElement>(null)
  const scrollIn3Ref = useRef<HTMLDivElement>(null)
  // const charSelector = "#splash-character .leadIn";
  // const maskImg = new URL('/assets/images/mv-002.jpg', import.meta.url).href;

  useSplashContentAnimation(elementSelector, triggerSelector)
  // useSplashCharacterAnimation(charSelector, triggerSelector);

  useEventListener(
    'mousemove',
    _.throttle((e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = Math.round((clientX / window.innerWidth) * 100)
      const y = Math.round((clientY / window.innerHeight) * 100)
      if (maskRef.current) {
        gsap.to(maskRef.current, {
          '--x': `${x}%`,
          '--y': `${y}%`,
          duration: 0.2,
          ease: 'sine.out'
        })
      }
    }, 100)
  )

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      maskInner.current &&
      scrollIn1Ref.current &&
      scrollIn2Ref.current &&
      scrollIn3Ref.current
    ) {
      const tl = gsap.timeline({
        paused: true,
        reversed: true,
        defaults: { ease: 'power4.out', yPercent: 0, xPercent: 0, opacity: 0 }
      })
      const scroll3InitValues = gsap.set(scrollIn3Ref.current, {
        yPercent: 0,
        xPercent: 0,
        opacity: 0
      })
      tl.add(scroll3InitValues)
      // sroll into view with gsap scrollTrigger plugin
      tl.to(scrollIn1Ref.current, {
        yPercent: 0,
        xPercent: 0,
        autoAlpha: 1,
        scrollTrigger: {
          trigger: '#mission > div',
          start: 'center 33%',
          end: '+=1000',
          scrub: true
        }
      })
        .to(scrollIn1Ref.current, {
          yPercent: -300,
          xPercent: 0,
          scale: 0.8,
          autoAlpha: 0,
          scrollTrigger: {
            trigger: '#services > div',
            start: 'top 33%',
            end: '+=1000',
            scrub: true
          }
        })
        .to(scrollIn2Ref.current, {
          yPercent: 0,
          xPercent: 0,
          autoAlpha: 1,
          scrollTrigger: {
            trigger: '#partners > div',
            start: 'bottom 75%',
            end: '+=1500',
            scrub: true
          }
        })
        .to(scrollIn2Ref.current, {
          yPercent: 0,
          xPercent: 0,
          autoAlpha: 0,
          scrollTrigger: {
            trigger: '#team > div',
            start: 'top 33%',
            end: '+=1000',
            scrub: true
          }
        })
        .to(scrollIn3Ref.current, {
          yPercent: 0,
          xPercent: 0,
          autoAlpha: 1,
          scrollTrigger: {
            trigger: '#pricing > div',
            start: 'top 50%',
            end: '+=1000',
            scrub: true
          }
        })

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      tl.reversed() ? tl.play() : tl.reverse()
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      // tl2.reversed() ? tl2.play() : tl2.reverse();
    }
  }, [maskInner])

  return (
    <section
      ref={sectionReference}
      id='home'
      className='splash-wrapper relative h-screen w-full overflow-x-hidden dark:bg-slate-900'
    >
      {/* <Rain blur /> */}
      <div
        id='splash-bg-fallback'
        className='absolute inset-0 z-10 h-full w-full '
      >
        <HeroVideo source={heroVideo} />
      </div>

      <div className='splash-main relative z-20 grid h-full grid-cols-1 place-items-end pb-32 sm:grid-cols-2 lg:place-items-center lg:pb-0'>
        <div
          id='splash-content'
          className='leadIn splash-content invisible self-end justify-self-center lg:self-center'
        >
          <h1 className='flex flex-col gap-2 self-start sm:gap-4 lg:self-end xl:self-auto xl:justify-self-end'>
            <span className='shadow-font-heading gradient-text text-shadow-alt-4xl-teal text-center font-black tracking-tighter text-xl xl:text-3xl 2xl:text-4xl'>
              Meta-Builders
            </span>
          </h1>
          <p className='gradient-text-alt text-fill text-shadow -translate-y-2 pr-2 text-center font-black tracking-tighter text-xl lg:-translate-y-6 xl:text-right xl:text-2xl 2xl:-translate-y-6'>
            Welcome to The Metaverse.
          </p>
        </div>
      </div>

      <div
        ref={maskRef}
        className='underpage motion-reduce:hidden'
        aria-hidden='true'
      >
        <div className='relative h-screen w-full'>
          <div
            ref={maskInner}
            className='splash-under relative z-50 h-full flex-col justify-center pb-32 lg:pb-0'
          >
            <div className='absolute inset-x-0 inset-y-1/4 flex h-1/2 w-full items-center justify-center'>
              <div
                ref={scrollIn1Ref}
                className='scroll-in pointer-events-auto invisible'
              >
                <h2 className='flex flex-col self-start lg:self-end xl:self-auto xl:justify-self-end'>
                  <span className='shadow-font-heading gradient-text text-shadow-alt-4xl-teal text-center font-black tracking-tighter text-xl 2xl:text-5xl'>
                    Meta-Verse
                  </span>
                </h2>
                <p className='gradient-text-alt text-fill text-shadow w-full -translate-y-4 text-center font-bold tracking-tighter text-xl lg:-translate-y-6 xl:text-right 2xl:-translate-y-12 2xl:text-5xl'>
                  <a
                    href='https://discord.gg/metabuilders'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Build with us!
                  </a>
                </p>
              </div>
            </div>

            <div className='absolute inset-x-0 inset-y-1/4 flex h-1/2 w-full items-center justify-center'>
              <div
                ref={scrollIn2Ref}
                className='scroll-in2 pointer-events-auto invisible'
              >
                {/* <h2 className="flex flex-col self-start lg:self-end gap-2 sm:gap-4 xl:self-auto xl:justify-self-end">
                  <span className="shadow-font-heading font-black tracking-tighter text-center text-xl 2xl:text-5xl gradient-text text-shadow-alt-4xl-teal">
                    Don&apos;t procrastinate!
                  </span>
                </h2>
                <p className="font-bold text-xl 2xl:text-6xl gradient-text-alt text-fill tracking-tighter text-center xl:text-right -translate-y-4 lg:-translate-y-6 2xl:-translate-y-12 text-shadow">
                  <HashLink to="#pricing">Book us now!</HashLink></p> */}
              </div>
            </div>

            <div className='absolute inset-0 flex h-full w-full items-end justify-center'>
              <div
                ref={scrollIn3Ref}
                className='scroll-in3 pointer-events-auto invisible relative h-full w-full'
              >
                <div className='relative h-screen w-auto translate-y-8 opacity-50'>
                  <HeroVideo source={heroVideo} />
                </div>
              </div>
            </div>
          </div>
          <Rain />
        </div>
      </div>
    </section>
  )
}

/**  */
export const SplashGL = (): Error => {
  throw new Error('SplashSection: SplashGL component is not implemented')
}
