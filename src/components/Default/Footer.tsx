
import { Icon } from "@iconify/react";
import { v4 as uuid } from "uuid";

import { useScrollReveal } from "~mb/hooks/animation";

export const links = [
  {
    url: "https://meta-builders.com/",
    description: "Meta-Builders' official website",
    icon: "mdi:home",
  },
  {
    url: "/",
    description: "Meta-Builders on GitHub",
    icon: "mdi:github-circle",
  },
  {
    url: "/",
    description: "Meta-Builders on Discord",
    icon: "mdi:discord",
  },
  {
    url: "https://twitter.com/meta_builders",
    description: "Meta-Builders on Twitter",
    icon: "mdi:twitter",
  },
];

export function Footer(): JSX.Element {
  const elementId = ".leadIn";
  const triggerId = "#footer";

  useScrollReveal(elementId, triggerId);



  return (
    <footer id="footer" className="hidden lg:flex relative overflow-y-hidden  flex-col items-center justify-center h-32 lg:h-64 w-full">
      <div className="footer-main w-3/4  leadIn invisible">
        <h5 className="font-black text-lg text-shadow-alt gradient-text">Meta-Builders</h5>
      </div>
      <div className="footer-aside w-3/4 flex flex-col lg:flex-row items-center justify-between">
        <p className="text-xs leadIn invisible self-end">Copyright &copy; 2022 Meta-Builders</p>
        <div>
          <ul className="hidden lg:grid lg:leadIn invisible  grid-cols-3 gap-x-6 gap-y-1">
            <li className=""><a href="/#">Link to somewhere</a></li>
            <li className=""><a href="/#">Link to somewhere</a></li>
            <li className=""><a href="/#">Link to somewhere</a></li>
            <li className=""><a href="/#">Link to somewhere</a></li>
            <li className=""><a href="/#">Link to somewhere</a></li>
            <li className=""><a href="/#">Link to somewhere</a></li>
            <li className=""><a href="/#">Link to somewhere</a></li>
            <li className=""><a href="/#">Link to somewhere</a></li>
            <li className=""><a href="/#">Link to somewhere</a></li>
          </ul>
        </div>
        <ul className="mb-urls relative grid grid-cols-4 w-full gap-4 lg:w-1/4">
          {links.map((link) => (
            <li key={uuid()} className="leadIn invisible">
              <a
                className="group w-12 2xl:w-16 h-12 2xl:h-16 p-2 2xl:p-3 border-2 border-violet-800 dark:border-teal-200 rounded-full inline-flex items-center justify-center text-shadow-alt-sm dark:text-shadow-alt-sm-teal hover:animate-pulse"
                href={link.url}
              >
                <span className="sr-only">{link.description}</span>
                <Icon className="w-full h-full text-violet-800  transition-colors text-6xl dark:text-teal-300 " icon={link.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer;
