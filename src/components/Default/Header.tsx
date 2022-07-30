import { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";

import { Icon } from "@iconify/react";
import gsap from "gsap";
import { HashLink } from "react-router-hash-link";
import {useEventListener, useMediaQuery, useIntersectionObserver } from 'usehooks-ts'
import { v4 as uuid } from "uuid";

import { ButtonWeb3Connect, ButtonDarkMode } from "~mb/components/Buttons";
import {links} from "~mb/components/Default/Footer";

const navItems = [
  { title: "Home", url: "#home" },
  { title: "Services", url: "#services" },
  { title: "Partners", url: "#partners" },
  { title: "Team", url: "#team" },
  { title: "Buy", url: "#buy" },
];

export default function Header(): JSX.Element {
  const mobileMenuWrapper = useRef<HTMLDivElement>(null);
  const desktopMenuWrapper = useRef<HTMLElement>(null);
  const header = useRef<HTMLElement>(null);
  const mobileMenu = useRef<HTMLUListElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)");
  const entry = useIntersectionObserver(header, {});
  const isVisible = !!entry?.isIntersecting;
  const [isFixed, setIsFixed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapper = mobileMenuWrapper.current;
  // define the default for the timeline
  const tl = gsap.timeline({ paused: true, reversed: true });

  // Set defaults for the mobile menu
  gsap.set(mobileMenuWrapper.current,
    {
      opacity: 0,
      scale: 0.9,
      yPercent: 100,
    }
  )


  // gsap.set(header.current,
  //   {
  //     position: 'absolute',
  //   }
  // )
  // setup, but don't play the timeline animations
  tl.to(mobileMenuWrapper.current,
    {
      opacity: 1,
      scale: 1,
      yPercent: 0,
      duration: 0.5,
      ease: "power3.inOut",
      autoAlpha: 1,
    }
  );

  /**
   * Use GSAP timeline to animate the menu open and closed
   *
   * Also adds the `aria-hidden` attribute to the menu wrapper for accessibility
   */
  function onToggleMobileMenu(): void {
    // if (typeof window === "undefined") return;
    console.log('toggleMobileMenu');

    setIsOpen(!isOpen);

    const body = document.querySelector("body") as HTMLElement;
    if (isOpen) {
      body.classList.add("menu-open");
      tl.play()

      // wrapper?.classList.remove("hidden");
      // mobileMenuWrapper.classList.remove("hidden");
    } else {
      body.classList.remove("menu-open");
      tl.reverse();
    }
    if (wrapper) {
      wrapper.ariaHidden = wrapper.classList.contains("hidden") ? 'true' : 'false';
    }
  }

  /** Show `mobileMenuWrapper` when the `isOpen` const is set to true */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (wrapper) wrapper.ariaHidden = wrapper.classList.contains("hidden") ? 'false' : 'true';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /** Changes the header from `absolute` to `fixed` when the user first scrolls */
  function onScroll(): void {
    if (typeof window === "undefined") return;
    const page = document.documentElement;
    const offset = header.current?.offsetHeight ?? 0;
    const d = page.clientHeight - page.scrollTop - offset;
    header.current?.classList.toggle("fixed-header", d < 0);
  }

  // Effect to give the header a bounce effect on page load.
  // useEffect(() => {
  //   const headerTl = gsap.timeline({ paused: true, reversed: true });
  //   headerTl.from(header, {
  //     duration: 1,
  //     opacity: 0,
  //     yPercent: -100,
  //     ease: "bounce",
  //   });
  //   // if (headerTl.reversed()) {
  //   //   headerTl.play()
  //   // } else {
  //     //   headerTl.reverse();
  //     // }
  //     // }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   // if (isVisible) {
  //       headerTl.play()

  //   // }
  // }, [isVisible]);

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
            className="brand font-heading inline-flex items-center text-lg text-shadow-alt gradient-text tracking-tight font-bold hover:gradient-text capitalize dark:hover:text-shadow-alt-teal z-[100]"
          ><span>Meta-Builders</span></span>
        </HashLink>

        <div className="desktop-menu hidden sm:flex items-center self-end z-10 ">
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-6">
              {navItems.map(({ title, url }) => (
                <li key={uuid()}>
                  <HashLink
                    className="text-lg font-bold font-heading "
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
          className="mobile-menu inset-0 top-0 fixed invisible md:hidden h-screen w-screen  bg-gradient-to-bl dark:from-glass-primary-700 dark:to-glass-primary-900 filter backdrop-blur-lg !z-100"
          aria-hidden="true"
        >
          <div className="fixed flex flex-col items-center justify-between w-full h-full inset-0 px-3 pt-0">
            <div
              className="flex flex-col justify-center space-y-4 w-full h-3/4"
              role="dialog"
              aria-modal="true"
            >
              <nav className="flex flex-row flex-grow items-center justify-center">
                <ul ref={mobileMenu} className="flex flex-col items-center justify-center gap-6">
                  {navItems.map(({ title, url }) => (
                    <li key={uuid()}>
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
            <div className="flex flex-col justify-center items-start space-y-4 w-full h-auto flex-grow">
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
        className="mobile-tools w-full h-12 fixed bottom-0 py-3 flex flex-row items-center justify-end gap-1 lg:gap-1 lg:hidden z-[1000]"
      >
        <ButtonWeb3Connect size="text-2xl lg:text-3xl" />
        <ButtonDarkMode />
        <button
          type="button"
          className="open-nav-button btn btn-link sm:hidden p-0 text-slate-600 hover:text-slate-700 dark:text-violet-300 dark:hover:text-teal-400 text-shadow-alt dark:hover:text-shadow-alt-teal"
          aria-label="Open navigation"
          onClick={onToggleMobileMenu}
        >
          <Icon
            icon={!isOpen ? 'mdi:close' : 'heroicons-solid:menu'}
            className="h-8 w-8"
          />
        </button>
      </div>
    </>
  )
}