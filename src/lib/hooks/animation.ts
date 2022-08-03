/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { MutableRefObject, RefObject} from 'react';
import { useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIntersectionObserver, useIsClient, useSsr } from 'usehooks-ts'

gsap.registerPlugin(ScrollTrigger)

export * from '../animation/starfield'

/** Handle the scroll triggers for page sections */
export function useSectionAnimation(
  section: string,
  clear?: boolean | undefined
): void {
  // if (section.length === 0) return ;
  const { isBrowser } = useSsr()


  const wrapper = document.querySelector(section)
  console.log('useSectionAnimation', wrapper);

  // const entry = useIntersectionObserver(section, {})
  const tl = gsap.timeline({
    paused: true,
    reversed: true,
    defaults: {
      duration: 0.3,
      delay: 0.3,
      ease: 'power3.inOut'
    },
    scrollTrigger: {
      trigger: wrapper,
      start: 'top center',
      end: '+=200',
      scrub: 1,
    }
  })

  if (clear) {
    tl.clear()
  }

  function init(): void {
    tl.fromTo(
      `${section} .leadIn`,
      {
        opacity: 0,
        y: 20,
        stagger: 0.2
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2
      }
    )

    // tl.to(
    //   `${section} .leadIn`,
    //   {
    //     opacity: 0,
    //     stagger: 0.5,
    //     scrollTrigger: {
    //       trigger: `${section} + section`,
    //       start: "top center",
    //       end: "+=200",
    //       scrub: 1,
    //       markers: true,
    //     }
    //   }
    // )
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    tl.play()
  }

  useEffect(() => {
    // if (!isBrowser) return ;
      init()
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrowser])
}

/**
 * Reveals the CTA for buying a package
 *
 * Takes a `string` containing the selector for the CTA element and one for the trigger
 * @param element string
 * @param trigger string
 */
export function useBuyCtaAnimation(
  element: string,
  trigger: string,
): void {
  const { isBrowser } = useSsr()
  const tl = gsap.timeline({
    defaults: {
      duration: 2,
      delay: 0.5,
      ease: 'power3.inOut'
    },
    scrollTrigger: {
      trigger,
      start: 'top top',
      end: 'bottom center',
      scrub: 1,
      // markers: true,
      pin: true
    }
  })

  function init(): void {
    if (element.length === 0) return
    tl.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.5,
        x: '100%'
      },
      {
        opacity: 1,
        scale: 1,
        x: 25
      }
    )
  }

  useEffect(() => {
    if (isBrowser) init()
    return () => {
      tl.clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrowser]);
}

/** Animations & triggers for the extra content (rhs) on the splash screen */
export function useSplashCharacterAnimation(
  element: string,
  triggerReference: RefObject<HTMLElement>,
): void {
  const {isBrowser} = useSsr()
  const trigger = triggerReference.current
  // const entry = useIntersectionObserver(triggerReference, {})
  const tl = gsap.timeline({
    defaults: {
      duration: 0.5,
      opacity: 0,
      delay: 0,
      ease: 'power3.inOut'
    }
  })

  function init(): void {
    tl.from(element, { autoAlpha: 0 })

    tl.fromTo(
      element,
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        x: 0,
        y: 0,
        stagger: 0.5
      },
      {
        opacity: 1,
        rotate: 90,
        scale: 0.5,
        y: '15%',
        x: '2%',
        stagger: 0.5,
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: '+=500',
          scrub: 1
          // markers: true,
        }
      }
    )
  }

  useEffect(() => {
    if (isBrowser) init()
  });

}

/** Animations for the splash screen content */
export function useSplashContentAnimation(
  element: string,
  triggerReference: RefObject<HTMLElement>,
): void {
  const {isBrowser} = useSsr()
  const trigger = triggerReference.current
  const entry = useIntersectionObserver(triggerReference, {})
  const isVisible = !!entry?.isIntersecting

  const tl = gsap.timeline({
    paused: true,
    reversed: true,
    defaults: {
      duration: 1.5,
      delay: 0,
      ease: 'power3.inOut'
    }
  })

  function init(): void {
    tl.from(element, {
      autoAlpha: 0,
      // y: 0,
      xPercent: 0,
      scale: 1,
      transformOrigin: 'center',
      stagger: 0.1,
    })

    // tl.fromTo(
    //   element,
    //   {
    //     opacity: 1,
    //     xPercent: 0,
    //     scale: 1
    //   },
    //   {
    //     opacity: 0,
    //     scale: 0.5,
    //     transformOrigin: 'center',
    //     xPercent: -10,
    //     scrollTrigger: {
    //       trigger,
    //       start: '15% center',
    //       end: '+=1000',
    //       scrub: 1,
    //     }
    //   }
    // )

    // if (isVisible) {
      if (tl.reversed()) {
        tl.play()
      } else {
        tl.reverse()
      }

    // }
  }

  useEffect(() => {
    if (isBrowser && isVisible) init()
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrowser, isVisible]);
}

export function useScrollReveal(element: string, trigger: string): void {

  function init(): void {
    if (typeof window === 'undefined') return

    const tl = gsap.timeline({
      defaults: {
        duration: 0.3,
        delay: 0.5,
        ease: 'power3.inOut'
      }
    })
    tl.fromTo(
      `${trigger} ${element}`,
      {
        opacity: 0,
        y: 10,
        stagger: 0.2,
        autoAlpha: 1
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger,
          start: 'top 85%',
          end: '+=25px',
          scrub: 1,
          }
        }
      )

    }



  useEffect(() => {
    if (element.length === 0) return
    init()
  })
}

export function useHeaderAnimation(): void {
  if (typeof window === 'undefined') return

  const mobileMenuId = 'mobile-menu'
  const mobileMenuWrapper = document.querySelector(
    `#${mobileMenuId}`
  ) as HTMLElement
  const header = document.querySelector('#page-header') as HTMLElement
  const page = document.documentElement
  const menu = document.querySelector(`#${mobileMenuId} ul`) as HTMLElement
  const openNavButton = document.querySelector(
    '#open-nav-button'
  ) as HTMLButtonElement
  const closeNavButton = document.querySelector(
    '#close-nav-button'
  ) as HTMLButtonElement

  const openMenu = (): void => {
    console.log('openMenu')
    mobileMenuWrapper.classList.remove('hidden')
    gsap.to(mobileMenuWrapper, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      ease: 'power2.inOut'
    })
  }

  const closeMenu = (): void => {
    mobileMenuWrapper.classList.add('hidden')
    gsap.to(mobileMenuWrapper, {
      duration: 0.5,
      opacity: 0,
      y: -100,
      ease: 'power2.inOut'
    })
  }

  function init(): void {
    gsap.from(header, {
      duration: 1,
      opacity: 0,
      y: '-100%',
      ease: 'bounce'
    })
    openNavButton.addEventListener('click', openMenu)
    closeNavButton.addEventListener('click', closeMenu)

    document.addEventListener('scroll', () => {
      const d = page.clientHeight - page.scrollTop - header.offsetHeight
      header.classList.toggle('fixed-header', d < 0)
      gsap.from(header, {
        duration: 0.5,
        // opacity: d < 0 ? 1 : 0.5,
        ease: 'power3.inOut'
      })
    })

    menu.addEventListener('click', event => {
      const target = event.target as HTMLElement
      if (target.tagName === 'A') {
        closeMenu()
      }
    })
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      init()
    })
  }
}
