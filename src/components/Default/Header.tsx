import { RefObject, useEffect, useRef, useState } from "react";

import { Icon } from "@iconify/react";
import gsap from "gsap";
import { HashLink } from "react-router-hash-link";
import {useEventListener, useMediaQuery, useIntersectionObserver, useLockedBody } from 'usehooks-ts'
import { v4 as uuid } from "uuid";

import { ButtonWeb3Connect, ButtonDarkMode } from "~mb/components/Buttons";
import {links} from "~mb/components/Default/Footer";

const navItems = [
  { title: "Home", url: "#home" },
  { title: "Services", url: "#services" },
  { title: "Partners", url: "#partners" },
  { title: "Team", url: "#team" },
  { title: "Pricing", url: "#pricing" },
];

export default function Header(): JSX.Element {
  const mobileMenuWrapper = useRef<HTMLDivElement>(null);
  const desktopMenuWrapper = useRef<HTMLElement>(null);
  const header = useRef<HTMLElement>(null);
  const desktopMenu = useRef<HTMLDivElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null)
  const mobileMenuItems = useRef<HTMLLIElement[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const mobileMenuEntry = useIntersectionObserver(mobileMenu, {});
  const isVisible = !!mobileMenuEntry?.isIntersecting;
  const [isOpen, setIsOpen] = useState(false);
  const wrapper = mobileMenuWrapper.current;
  const menuTimeline = useRef<GSAPTimeline | null>(null);
  const menuItemsTimeline = useRef<GSAPTimeline | null>(null);
  const [locked, setLocked] = useLockedBody();
  mobileMenuItems.current = []

  const addToRefs = (el: HTMLLIElement | null): void => {
    if (el && !mobileMenuItems.current.includes(el)) {
      mobileMenuItems.current.push(el);
    }
  }

  /** Handle the open/close button event also adds the `aria-hidden` attribute to the menu wrapper for accessibility */
  function onToggleMobileMenu(): void {
    if (typeof window === "undefined") return;
    setLocked(!locked);
    setIsOpen(!isOpen)
    // if (body) body.classList.toggle("menu-open", !isOpen);
    if (wrapper) wrapper.ariaHidden = isOpen ? "true" : "false";
  }

  /**
   * Setup timeline to animate the menu open / close
   */
  useEffect(() => {
    if (mobileMenuWrapper.current) {
      menuTimeline.current = gsap.timeline({ paused: true, reversed: true });
      gsap.set(mobileMenuWrapper.current, { opacity: 0, yPercent: 10, zIndex: -100, pointerEvents:
        "none"
      });
      menuTimeline.current.to(mobileMenuWrapper.current, {
        duration: 0.2,
        delay: 0,
        opacity: 1,
        yPercent: 0,
        zIndex: 99,
        pointerEvents: "auto",
        ease: "circle",
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  /** Show `mobileMenuWrapper` when the `isOpen` state is set to true */
  useEffect(() => {
    if (mobileMenuWrapper.current && menuTimeline.current ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      if (isOpen) {
        menuTimeline.current.play()
      } else {
        menuTimeline.current.reverse();
      }
    }
  }, [isOpen])

  /** Change the header from `absolute` to `fixed` when the user first scrolls */
  function onScroll(): void {
    if (typeof window === "undefined") return;
    const page = document.documentElement;
    const offset = header.current?.offsetHeight ?? 0;
    const d = page.clientHeight - page.scrollTop - offset;
    header.current?.classList.toggle("fixed-header", d < 0);
  }

  // Effect to give the header a bounce effect on page load.
  useEffect(() => {
    if (isMobile) return;
    const headerTl = gsap.timeline({ paused: true, reversed: true });
    gsap.set(header.current, { opacity: 0, yPercent: -100 });
    headerTl.to(header.current, {
      duration: 1,
      delay: 0.5,
      opacity: 1,
      yPercent: 0,
      ease: "bounce",
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    headerTl.reversed() ? headerTl.play() : headerTl.reverse();

  }, [header, isMobile]);

  // Listener to close the mobile menu when the user clicks a menu item.
  useEventListener("click", (e: MouseEvent) => {
    console.log('click');

    const target = e.target as HTMLElement;
    if (target.tagName === "A") {
      onToggleMobileMenu();
    }
  }, mobileMenu)

  // Listen for the scroll events for the header 👆
  useEventListener("scroll", onScroll);


  return (
    <>
      <header
        ref={header}
        id="page-header"
        className="absolute bottom-0 z-[100] h-12 lg:h-20 flex items-center justify-between w-full p-4 md:px-8 text-white border-transparent overflow-visible"
      >
        <HashLink
          className="flex items-center gap-3 hover:text-default justify-start"
          to="/#home"
        >
          <h1 className="sr-only">Meta-Builders</h1>
          <span
            className="brand font-heading inline-flex items-center text-md 2xl:text-lg text-shadow-alt gradient-text tracking-tight font-bold hover:gradient-text capitalize dark:hover:text-shadow-alt-teal z-[100]"
          ><span>Meta-Builders</span></span>
        </HashLink>

        <div ref={desktopMenu} className="desktop-menu hidden sm:flex items-center self-end z-10 ">
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-6">
              {navItems.map(({ title, url }) => (
                <li key={uuid()}>
                  <HashLink
                    className="text-md 2xl:text-lg font-normal 2xl:font-bold uppercase xl:font-display "
                    to={`/${url}`}
                  >
                    {title}
                  </HashLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-0 px-0">
            <ButtonDarkMode />
            <ButtonWeb3Connect />
          </div>
        </div>


        <div
          ref={mobileMenuWrapper}
          className="mobile-menu fixed inset-0 md:hidden h-screen w-screen  bg-gradient-to-bl dark:from-glass-primary-700 dark:to-glass-primary-900 filter backdrop-blur-lg"
          aria-hidden="true"
        >
          <div className="fixed flex flex-col items-center justify-between w-full h-full inset-0 px-3 pt-0">
            <div
              id="mobile-menu-dialog"
              aria-label="Mobile menu dialog"
              className="flex flex-col justify-center space-y-4 w-full h-2/3"
              role="dialog"
              aria-modal="true"
            >
              <nav ref={mobileMenu} className="flex flex-row flex-grow items-center justify-center">
                <ul className="flex flex-col items-center justify-center gap-6">
                  {navItems.map(({ title, url }) => (
                    <li key={uuid()} ref={addToRefs}>
                      <HashLink
                        className="text-lg font-bold font-heading text-slate-500 dark:text-violet-300 hover:text-slate-700 dark:hover:text-teal-400 text-shadow-alt dark:hover:text-shadow-alt-teal transition-colors"
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
            <div className="flex flex-col justify-start items-center space-y-4 w-full flex-grow">
            <ul className="relative grid grid-cols-4 w-full gap-6 md:gap-4 sm:grid-cols-4 lg:w-1/4">
              {links.map((link) => (
                <li key={uuid()} className="text-center">
                  <a
                    className="group p-3 border-2 border-violet-800 dark:border-teal-200 rounded-full inline-flex items-center justify-center text-shadow-alt-sm dark:text-shadow-alt-sm-teal hover:animate-pulse w-3/4 h-auto"
                    href={link.url}
                  >
                    <span className="sr-only">{link.description}</span>
                    <Icon className="h-full text-violet-800  transition-colors text-6xl dark:text-teal-300 " icon={link.icon} />
                  </a>
                </li>
              ))}
            </ul>

            </div>
          </div>
        </div>
      </header>
      <div
        className="mobile-tools w-full h-12 fixed bottom-0 right-2 py-3 flex flex-row items-center justify-end gap-1 lg:gap-1 lg:hidden z-[1000]"
      >
        <ButtonWeb3Connect size="text-2xl lg:text-3xl" />
        <ButtonDarkMode />
        <button
          type="button"
          className="open-nav-button btn btn-link sm:hidden p-0 text-slate-600 hover:text-slate-700 dark:text-violet-300 dark:hover:text-teal-400 text-shadow-alt dark:hover:text-shadow-alt-teal"
          aria-label={`${isOpen ? "Close" : "Open"} mobile menu`}
          onClick={(): void => onToggleMobileMenu()}
        >
          <Icon
            icon={isOpen ? 'mdi:close' : 'heroicons-solid:menu'}
            className="h-8 w-8"
          />
        </button>
      </div>
    </>
  )
}