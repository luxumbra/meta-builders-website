import { MdClose, MdMenu } from "react-icons/md";
import { v4 as uuid } from "uuid";

import { ButtonWeb3Connect, ButtonDarkMode } from "~mb/components/Buttons";



const navItems = [
  { title: "Home", url: "" },
  { title: "Services", url: "#services" },
  { title: "Partners", url: "#partners" },
  { title: "Team", url: "#team" },
  { title: "Buy", url: "#buy" },
];

export default function Header(): JSX.Element {

  return (

    <header
      id="page-header"
      className="absolute bottom-0 z-10 flex items-center justify-between w-full px-8 py-4 text-white border-transparent shadow-md shadow-slate-900"
    >
      <a
        className="flex items-center gap-3 hover:text-default"
        href="/"
      >
        <h1 className="sr-only">Meta-Builders</h1>

        <span
          className="font-sans text-shadow-alt gradient-text font-extrabold hover:gradient-text-alt uppercase ">Meta-Builders</span>
      </a>
      <div>
        <div className="flex items-center gap-6">
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-6">
              {navItems.map(({ title, url }) => (
                <li key={uuid()}>
                  <a
                    className="text-sm font-bold text-slate-500 dark:text-pink-100 hover:text-slate-700 dark:hover:text-green-400 transition-colors"
                    href={`/${url}`}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonWeb3Connect />
          <ButtonDarkMode />
          <button
            id="open-nav-button"
            type="button"
            className="btn btn-link sm:hidden text-xl"
            aria-label="Navigation"
          >
            <MdMenu className="text-3xl" />
          </button>
        </div>
        <div
          id="mobile-menu"
          className="hidden"
          aria-hidden="true"
        >
          <div className="fixed inset-0 px-8 py-4 bg-default">
            <div
              className="space-y-4"
              role="dialog"
              aria-modal="true"
            >
              <header className="text-right">
                <button
                  id="close-nav-button"
                  type="button"
                  className="btn"
                  aria-label="Close navigation"
                >
                  <MdClose className="text-3xl" />
                </button>
              </header>
              <nav>
                <ul className="flex flex-col">
                  {navItems.map(({ title, url }) => (
                    <li key={uuid()}>
                      <a
                        className="block py-4 text-xl text-center"
                        href={url}
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}


//   <style>
//     #open-nav-button {
//       @apply hidden;
//     }
//   </style>
// </noscript> -->

// <style>
//   .fixed-header {
//     @apply fixed top-0 bottom-auto;
//     @apply text-default bg-default border-default;
//   }

//   #mobile-menu {
//     /* &.is-open {
//       @apply block bg-slate-400 dark:bg-pink-200 ;
//     } */
//   }
// </style>