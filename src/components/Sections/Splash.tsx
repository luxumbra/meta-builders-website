
import { useEffect, useRef } from "react";

import gsap from "gsap";
import _ from "lodash";
import { useEventListener } from "usehooks-ts";

import HeroVideo from "~mb/components/HeroVideo";
import { Rain } from "~mb/components/Rain";
import { useSplashContentAnimation } from "~mb/hooks/animation";


export default function SplashSection(): JSX.Element {
  const sectionReference = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null)
  const maskInner = useRef<HTMLDivElement>(null)
  const heroVideo = new URL('/assets/video/mbanim0.webm', import.meta.url).href;
  // const widths = [450, 800];

  const elementSelector = ".leadIn";
  const triggerSelector = sectionReference;
  // const charSelector = "#splash-character .leadIn";
  const maskImg = new URL('/assets/images/mv-002.jpg', import.meta.url).href;

  useSplashContentAnimation(elementSelector, triggerSelector);
  // useSplashCharacterAnimation(charSelector, triggerSelector);


  useEventListener('mousemove', _.throttle((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const x = Math.round((clientX / window.innerWidth) * 100);
    const y = Math.round((clientY / window.innerHeight) * 100);
    if (maskRef.current) {
      gsap.to(maskRef.current, {
        '--x': `${x}%`,
        '--y': `${y}%`,
        duration: 0.2,
        ease: "sine.out",
      })

    }

  }, 100))

  // useEffect(() => {
  //   if (maskRef.current) {
  //     // maskRef.current.style.setProperty('--up-height', `${document.body.offsetHeight}`)
  //     maskRef.current.style.setProperty('--mask-image', `url(${maskImg})`)
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [maskRef])

  useEffect(() => {
      if (typeof window !== 'undefined' && maskInner.current) {
        const tl = gsap.timeline({ paused: true, reversed: true, defaults: { ease: "bounce", yPercent: 0, xPercent: -200, opacity: 0 } });
        // sroll into view with gsap scrollTrigger plugin
        tl.to('.scrollIn', {
          yPercent: 0,
          xPercent: 0,
          opacity: 1,
          autoAlpha: 1,
          scrollTrigger: {
            trigger: '#intro h2',
            start: 'top center',
            end: 'bottom center',
            scrub: true,
            // pin: true,
            // markers: true,
          }
        })
          .to('.scrollIn', {
            yPercent: -400,
            xPercent: 0,
            opacity: 0,
            duration: 2,
            autoAlpha: 0,
            scrollTrigger: {
              trigger: '#services h2',
              start: 'top center',
              end: '+=250',
              scrub: true,
            }
          })

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        tl.reversed() ? tl.play() : tl.reverse();
      }
  } , [maskInner])

  return (
    <section
    ref={sectionReference}
    id="home"
    className="splash-wrapper relative h-screen w-full dark:bg-slate-900 overflow-x-hidden"
    >
    {/* <Rain blur /> */}
      <div
        id="splash-bg-fallback"
        className="absolute inset-0 w-full h-full z-10 "
      >
        <HeroVideo source={heroVideo} />
      </div>

      <div className="relative grid h-full grid-cols-1 sm:grid-cols-2 place-items-end lg:place-items-center splash-main pb-32 lg:pb-0 z-20">
        <div id="splash-content" className="leadIn invisible justify-self-center self-end lg:self-center">
          <h1 className="flex flex-col self-start lg:self-end gap-2 sm:gap-4 xl:self-auto xl:justify-self-end">
            <div className="shadow-font-heading font-black tracking-tighter text-center text-5xl 2xl:text-8xl gradient-text text-shadow-alt-4xl-teal">
              Meta-Builders
            </div>
          </h1>
          <p className="font-bold text-xl 2xl:text-3xl gradient-text-alt text-fill tracking-tight text-center xl:text-right -translate-y-4 lg:-translate-y-6 2xl:-translate-y-8 text-shadow">
            Welcome to The Metaverse.</p>
        </div>
      </div>

      <div ref={maskRef} className="underpage hidden xl:dark:block" aria-hidden="true">
        <div className="relative h-screen w-full">
          <div ref={maskInner} className="relative grid h-full grid-cols-1 sm:grid-cols-1 place-items-end lg:place-items-center splash-main pb-32 lg:pb-0 z-50">
            <div  className="scrollIn invisible justify-self-center self-end lg:self-center pointer-events-auto">
              <h1 className="flex flex-col self-start lg:self-end gap-2 sm:gap-4 xl:self-auto xl:justify-self-end">
                <div className="shadow-font-heading font-black tracking-tighter text-center text-5xl 2xl:text-8xl gradient-text text-shadow-alt-4xl-teal">
                  Meta-Verse 💜
                </div>
              </h1>
              <p className="font-bold text-xl 2xl:text-3xl gradient-text-alt text-fill tracking-tight text-center xl:text-right -translate-y-4 lg:-translate-y-6 2xl:-translate-y-8 text-shadow">
                Come build with us!</p>
            </div>
          </div>
            <Rain />
        </div>
      </div>
    </section>
  )
}

/**  */
export const SplashGL = (): Error => { throw new Error("SplashSection: SplashGL component is not implemented") };
