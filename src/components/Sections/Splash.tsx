
import { useEffect, useRef } from "react";

import gsap from "gsap";
import _ from "lodash";
import { HashLink } from "react-router-hash-link";
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
  // const maskImg = new URL('/assets/images/mv-002.jpg', import.meta.url).href;

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



  useEffect(() => {
    if (typeof window !== 'undefined' && maskInner.current) {
      const tl = gsap.timeline({ paused: true, reversed: true, defaults: { ease: 'power4.out', yPercent: 0, xPercent: 0, opacity: 0 } });

      // sroll into view with gsap scrollTrigger plugin
      tl.to('.scroll-in', {
        yPercent: 0,
        xPercent: 0,
        autoAlpha: 1,
        scrollTrigger: {
          trigger: '#intro > div',
          start: 'bottom 33%',
          scrub: true,
        }
      })
      .to('.scroll-in', {
        yPercent: -300,
        xPercent: 0,
        scale: 0.8,
        autoAlpha: 0,
        scrollTrigger: {
          trigger: '#services > div',
          start: 'top 53%',
          end: '+=500',
          scrub: true,
        }
      })
      .to('.scroll-in2', {
        yPercent: 0,
        xPercent: 0,
        autoAlpha: 1,
        scrollTrigger: {
          trigger: '#partners > div',
          start: 'bottom 33%',
          end: '+=500',
          scrub: true,
        }
      })
      .to('.scroll-in2', {
        yPercent: -300,
        xPercent: -100,
        scale: 0.8,
        rotate: -20,
        autoAlpha: 0,
        scrollTrigger: {
          trigger: '#team > div',
          start: 'top 53%',
          end: '+=1000',
          scrub: true,
        }
      })
      .to('.scroll-in3', {
        yPercent: 0,
        xPercent: 0,
        rotate: 20,
        autoAlpha: 1,
        scrollTrigger: {
          trigger: '#pricing > div',
          start: 'top 55%',
          end: '+=1000',
          scrub: true,
        }
      })

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      tl.reversed() ? tl.play() : tl.reverse();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      // tl2.reversed() ? tl2.play() : tl2.reverse();
    }
  }, [maskInner])


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

      <div ref={maskRef} className="underpage motion-reduce:hidden" aria-hidden="true">
        <div className="relative h-screen w-full">
          <div ref={maskInner} className="relative h-full flex-col justify-center  splash-under pb-32 lg:pb-0 z-50">

            <div className="flex absolute inset-x-0 inset-y-1/4 h-1/2 w-full pl-64">
              <div className="scroll-in invisible justify-self-center self-center pointer-events-auto">
                <h2 className="flex flex-col self-start lg:self-end xl:self-auto xl:justify-self-end">
                  <span className="shadow-font-heading font-black tracking-tighter text-center text-5xl 2xl:text-8xl gradient-text text-shadow-alt-4xl-teal">
                    Meta-Verse
                  </span>
                </h2>
                <p className="font-bold text-xl 2xl:text-6xl gradient-text-alt text-fill tracking-tighter text-center xl:text-right -translate-y-4 lg:-translate-y-6 2xl:-translate-y-12 w-full text-shadow" >
                    <a href="https://discord.gg/metabuilders" target="_blank" rel="noreferrer">Build with us!</a>
                </p>
              </div>
            </div>

            <div className="flex absolute inset-x-0 inset-y-1/4 h-1/2 w-full items-center pl-64">
              <div className="scroll-in2 invisible justify-self-center self-end lg:self-center pointer-events-auto">
                <h2 className="flex flex-col self-start lg:self-end gap-2 sm:gap-4 xl:self-auto xl:justify-self-end">
                  <span className="shadow-font-heading font-black tracking-tighter text-center text-5xl 2xl:text-8xl gradient-text text-shadow-alt-4xl-teal">
                    Don&apos;t procrastinate!
                  </span>
                </h2>
                <p className="font-bold text-xl 2xl:text-6xl gradient-text-alt text-fill tracking-tighter text-center xl:text-right -translate-y-4 lg:-translate-y-6 2xl:-translate-y-12 text-shadow">
                  <HashLink to="/#pricing">Book us now!</HashLink></p>
              </div>
            </div>


            <div className="flex absolute inset-x-0 inset-y-1/4 h-1/2 w-full items-center justify-end pr-20">
              <div className="scroll-in3 relative invisible justify-self-center self-end lg:self-center pointer-events-auto">
                <h2 className="flex flex-col">
                  <span className="shadow-font-heading font-black tracking-tighter text-center text-4xl 2xl:text-6xl gradient-text text-shadow-alt-4xl-teal">
                    Go on! You want it!
                  </span>
                </h2>
                <p className="font-black text-xl 2xl:text-5xl gradient-text-alt text-fill text-center xl:text-center -translate-y-4 lg:-translate-y-6 2xl:-translate-y-8 text-shadow uppercase tracking-tighter">
                  Connect to buy! 👈</p>
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
export const SplashGL = (): Error => { throw new Error("SplashSection: SplashGL component is not implemented") };
