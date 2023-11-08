import { useEffect, useRef, useState } from 'react'

import { Icon } from '@iconify/react'
import gsap from 'gsap'
import _ from 'lodash'
import { HashLink } from 'react-router-hash-link'
import { useEventListener, useMediaQuery, useLockedBody } from 'usehooks-ts'
import { v4 as uuid } from 'uuid'

import { ButtonWeb3Connect } from '~mb/components/Buttons'
import { CopyrightNotice, links } from '~mb/components/Default/Footer'

const navItems = [
  { title: 'Mission', url: '#mission' },
  { title: 'Services', url: '#services' },
  { title: 'Partners', url: '#partners' },
  { title: 'Team', url: '#team' },
  { title: 'Pricing', url: '#pricing' }
]

export default function Header(): JSX.Element {
  const header = useRef<HTMLElement>(null)
  const desktopMenu = useRef<HTMLDivElement>(null)
  const mobileMenu = useRef<HTMLDivElement>(null)
  const mobileMenuWrapper = useRef<HTMLDivElement>(null)
  const mobileMenuItems = useRef<HTMLLIElement[]>([])
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isOpen, setIsOpen] = useState(false)
  const wrapper = mobileMenuWrapper.current
  const menuTimeline = useRef<GSAPTimeline | null>(null)
  const [locked, setLocked] = useLockedBody()
  mobileMenuItems.current = []

  const addToRefs = (el: HTMLLIElement | null): void => {
    if (el && !mobileMenuItems.current.includes(el)) {
      mobileMenuItems.current.push(el)
    }
  }

  /** Handle the open/close button event also adds the `aria-hidden` attribute to the menu wrapper for accessibility */
  function onToggleMobileMenu(): void {
    if (typeof window === 'undefined') return
    if (!isMobile) return
    setLocked(!locked)
    setIsOpen(!isOpen)
    // if (body) body.classList.toggle("menu-open", !isOpen);
    if (wrapper) wrapper.ariaHidden = isOpen ? 'true' : 'false'
  }

  /**
   * Setup timeline to animate the menu open / close
   */
  useEffect(() => {
    if (mobileMenuWrapper.current) {
      menuTimeline.current = gsap.timeline({ paused: true, reversed: true })
      gsap.set(mobileMenuWrapper.current, {
        opacity: 0,
        yPercent: 100,
        zIndex: -100,
        pointerEvents: 'none'
      })
      menuTimeline.current.to(mobileMenuWrapper.current, {
        duration: 0.2,
        delay: 0,
        opacity: 1,
        yPercent: 0,
        zIndex: 99,
        pointerEvents: 'auto',
        ease: 'circle'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** Show `mobileMenuWrapper` when the `isOpen` state is set to true */
  useEffect(() => {
    if (mobileMenuWrapper.current && menuTimeline.current) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      if (isOpen) {
        menuTimeline.current.play()
      } else {
        menuTimeline.current.reverse()
      }
    }
  }, [isOpen])

  /** Change the header from `absolute` to `fixed` when the user first scrolls */
  function onScroll(): void {
    if (typeof window === 'undefined') return
    const page = document.documentElement
    const offset = header.current?.offsetHeight ?? 0
    const d = page.clientHeight - page.scrollTop - offset
    header.current?.classList.toggle('fixed-header', d < 0)
  }

  // Effect to give the header a bounce effect on page load.
  useEffect(() => {
    if (isMobile) return
    const headerTl = gsap.timeline({ paused: true, reversed: true })
    gsap.set(header.current, { opacity: 0, yPercent: -100 })
    headerTl.to(header.current, {
      duration: 1,
      delay: 0.5,
      opacity: 1,
      yPercent: 0,
      ease: 'bounce'
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    headerTl.reversed() ? headerTl.play() : headerTl.reverse()
  }, [header, isMobile])

  // Listener to close the mobile menu when the user clicks a menu item.
  useEventListener(
    'click',
    (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A') {
        setTimeout(() => {
          onToggleMobileMenu()
        }, 500)
      }
    },
    mobileMenu
  )

  // Listen for the scroll events for the header 👆
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  useEventListener('scroll', _.throttle(onScroll, 100))

  return (
    <>
      <header
        ref={header}
        id='page-header'
        className='absolute bottom-0 z-[100] flex h-12 w-full items-center justify-between overflow-visible border-transparent p-4 text-white md:px-8 lg:h-20'
      >
        <HashLink
          className='flex items-center justify-start gap-3 hover:text-default'
          to='/#home'
        >
          <h1 className='sr-only'>Meta-Builders</h1>
          <span className='brand brand--logo dark:hover:text-shadow-alt-teal z-[100] text-xxs xl:text-xs 2xl:text-sm'>
            <span>Meta-Builders</span>
            <span>
              <img
                src='assets/images/logo.svg'
                width='20px'
                height='20px'
                className='h-full w-auto object-contain'
                alt='Meta-Builders logo'
              />
            </span>
          </span>
        </HashLink>

        <div
          ref={desktopMenu}
          className='desktop-menu z-10 hidden items-center self-end font-sans sm:flex '
        >
          <nav className='hidden sm:block'>
            <ul className='flex items-center gap-6'>
              {navItems.map(({ title, url }) => (
                <li key={uuid()}>
                  <HashLink
                    className='text-xxs font-normal uppercase xl:font-display xl:text-xs 2xl:font-bold 2xl:text-sm '
                    to={`/${url}`}
                  >
                    {title}
                  </HashLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className='ml-3 flex items-center gap-0 px-0'>
            {/* <ButtonDarkMode /> */}
            <ButtonWeb3Connect />
          </div>
        </div>

        <div
          ref={mobileMenuWrapper}
          className='mobile-menu fixed inset-0 h-screen w-screen origin-center  bg-gradient-to-bl filter backdrop-blur-lg dark:from-glass-primary-700 dark:to-glass-primary-900 md:hidden'
          aria-hidden='true'
        >
          <div className='fixed inset-0 flex h-full w-full flex-col items-center justify-between px-3 pt-0'>
            <div
              id='mobile-menu-dialog'
              aria-label='Mobile menu dialog'
              className='flex h-2/3 w-full flex-col justify-center space-y-4'
              role='dialog'
              aria-modal='true'
            >
              <nav
                ref={mobileMenu}
                className='flex flex-grow flex-row items-center justify-center'
              >
                <ul className='flex flex-col items-center justify-center gap-6'>
                  {navItems.map(({ title, url }) => (
                    <li key={uuid()} ref={addToRefs}>
                      <HashLink
                        className='text-shadow-alt dark:hover:text-shadow-alt-teal font-display font-bold text-slate-500 transition-colors text-xs hover:text-slate-700 dark:text-violet-300 dark:hover:text-teal-400'
                        smooth
                        to={`/${url}`}
                      >
                        {title}
                      </HashLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className='flex w-full flex-grow flex-col items-center justify-start space-y-4'>
              <ul className='relative grid w-full grid-cols-4 gap-6 sm:grid-cols-4 md:gap-4 lg:w-1/4'>
                {links.map(link => (
                  <li key={uuid()} className='text-center'>
                    <a
                      className='text-shadow-alt-sm dark:text-shadow-alt-sm-teal group inline-flex h-auto w-3/4 items-center justify-center rounded-full border-2 border-violet-800 p-3 hover:animate-pulse dark:border-teal-200'
                      href={link.url}
                    >
                      <span className='sr-only'>{link.description}</span>
                      <Icon
                        className='h-full text-violet-800  transition-colors text-6xl dark:text-teal-300 '
                        icon={link.icon}
                      />
                    </a>
                  </li>
                ))}
              </ul>
              <CopyrightNotice />
            </div>
          </div>
        </div>
      </header>
      <div className='mobile-tools fixed bottom-0 right-2 z-[1000] flex h-12 w-full flex-row items-center justify-end gap-1 py-3 lg:hidden lg:gap-1'>
        <ButtonWeb3Connect size='text-2xl lg:text-3xl' />
        {/* <ButtonDarkMode /> */}
        <button
          type='button'
          className='open-nav-button text-shadow-alt dark:hover:text-shadow-alt-teal btn btn-link p-0 text-slate-600 hover:text-slate-700 dark:text-violet-300 dark:hover:text-teal-400 sm:hidden'
          aria-label={`${isOpen ? 'Close' : 'Open'} mobile menu`}
          onClick={(): void => onToggleMobileMenu()}
        >
          <Icon
            icon={isOpen ? 'mdi:close' : 'heroicons-solid:menu'}
            className='h-8 w-8'
          />
        </button>
      </div>
    </>
  )
}
