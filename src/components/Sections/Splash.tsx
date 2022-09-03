
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
  const heroVideo = new URL('/assets/video/splash.mp4', import.meta.url).href;
  // const widths = [450, 800];

  const elementSelector = ".leadIn";
  const triggerSelector = sectionReference;
  const scrollIn1Ref = useRef<HTMLDivElement>(null);
  const scrollIn2Ref = useRef<HTMLDivElement>(null);
  const scrollIn3Ref = useRef<HTMLDivElement>(null);
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
    if (
      typeof window !== 'undefined'
      && maskInner.current
      && scrollIn1Ref.current
      && scrollIn2Ref.current
      && scrollIn3Ref.current
    ) {
      const tl = gsap.timeline({ paused: true, reversed: true, defaults: { ease: 'power4.out', yPercent: 0, xPercent: 0, opacity: 0 } });
      const scroll3InitValues = gsap.set(scrollIn3Ref.current, { yPercent: 0, xPercent: 0, opacity: 0 });
      tl.add(scroll3InitValues);
      // sroll into view with gsap scrollTrigger plugin
      tl.to(scrollIn1Ref.current, {
        yPercent: 0,
        xPercent: 0,
        autoAlpha: 1,
        scrollTrigger: {
          trigger: '#mission > div',
          start: 'center 33%',
          end: '+=1000',
          scrub: true,
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
          scrub: true,
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
          scrub: true,
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
          scrub: true,
        }
      })
      .to(scrollIn3Ref.current, {
        yPercent: 0,
        xPercent: 0,
        autoAlpha: 1,
        scrollTrigger: {
          trigger: '#team > div',
          start: 'bottom -25%',
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
        <div id="splash-content" className="leadIn splash-content invisible justify-self-center self-end lg:self-center">
          <h1 className="flex flex-col self-start lg:self-end gap-2 sm:gap-4 xl:self-auto xl:justify-self-end">
            <span className="shadow-font-heading font-black tracking-tighter text-center text-xl xl:text-3xl 2xl:text-4xl gradient-text text-shadow-alt-4xl-teal">
              Meta-Builders
            </span>
          </h1>
          <p className="font-black text-xl xl:text-2xl gradient-text-alt text-fill tracking-tighter text-center xl:text-right -translate-y-2 lg:-translate-y-6 2xl:-translate-y-6 text-shadow pr-2">
            Welcome to The Metaverse.</p>
        </div>
      </div>

      <div ref={maskRef} className="underpage motion-reduce:hidden" aria-hidden="true">
        <div className="relative h-screen w-full">
          <div ref={maskInner} className="relative h-full flex-col justify-center splash-under pb-32 lg:pb-0 z-50">

            <div className="flex absolute inset-x-0 inset-y-1/4 h-1/2 w-full items-center justify-center">
              <div ref={scrollIn1Ref} className="scroll-in invisible pointer-events-auto">
                <h2 className="flex flex-col self-start lg:self-end xl:self-auto xl:justify-self-end">
                  <span className="shadow-font-heading font-black tracking-tighter text-center text-xl 2xl:text-5xl gradient-text text-shadow-alt-4xl-teal">
                    Meta-Verse
                  </span>
                </h2>
                <p className="font-bold text-xl 2xl:text-5xl gradient-text-alt text-fill tracking-tighter text-center xl:text-right -translate-y-4 lg:-translate-y-6 2xl:-translate-y-12 w-full text-shadow" >
                    <a href="https://discord.gg/metabuilders" target="_blank" rel="noreferrer">Build with us!</a>
                </p>
              </div>
            </div>

            <div className="flex absolute inset-x-0 inset-y-1/4 h-1/2 w-full items-center justify-center">
              <div ref={scrollIn2Ref} className="scroll-in2 invisible pointer-events-auto">
                <h2 className="flex flex-col self-start lg:self-end gap-2 sm:gap-4 xl:self-auto xl:justify-self-end">
                  <span className="shadow-font-heading font-black tracking-tighter text-center text-xl 2xl:text-5xl gradient-text text-shadow-alt-4xl-teal">
                    Don&apos;t procrastinate!
                  </span>
                </h2>
                <p className="font-bold text-xl 2xl:text-6xl gradient-text-alt text-fill tracking-tighter text-center xl:text-right -translate-y-4 lg:-translate-y-6 2xl:-translate-y-12 text-shadow">
                  <HashLink to="#pricing">Book us now!</HashLink></p>
              </div>
            </div>


            <div className="flex absolute inset-x-0 inset-y-1/4 h-1/2 w-full items-end justify-center">
              <div ref={scrollIn3Ref} className="scroll-in3 relative invisible pointer-events-auto">
                <h2 className="flex flex-col">
                  <span className="shadow-font-heading font-black tracking-tighter text-center text-lg 2xl:text-xl gradient-text text-shadow-alt-4xl-teal">
                    You want this! Start today!
                  </span>
                </h2>
                <p className="relative font-extrabold text-xl 2xl:text-5xl gradient-text-alt text-fill text-center xl:text-center -translate-y-4 lg:-translate-y-6 2xl:-translate-y-4 text-shadow tracking-tighter">
                <HashLink to="#pricing" className="emoji-wrapped">Connect to buy!</HashLink></p>
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
