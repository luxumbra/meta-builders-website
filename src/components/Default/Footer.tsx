import { useCallback, useEffect } from "react";

import { Icon } from "@iconify/react";
import { uuid } from "uuidv4";

import { handleScrollReveal } from "~mb/animation/functions";

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
  const triggerId = "footer";

  const scrollRevealCallback = useCallback((element: string, trigger: string) => {
    handleScrollReveal(element, trigger);
  }, []);

  useEffect(() => {
    scrollRevealCallback(elementId, triggerId);

    return ():void => {
      console.log("unmounting footer");
    }
  }, [scrollRevealCallback])


  return (
    <footer id="footer" className="relative overflow-y-hidden bg-slate-300 dark:bg-slate-900 flex flex-col items-center justify-center h-64 w-full transition-colors">
      <div className="footer-main leadIn w-3/4">
        <h5 className="font-black gradient-text-alt">Meta-Builders</h5>
      </div>
      <div className="footer-aside w-3/4 flex flex-row items-center justify-between">
        <p className="text-xs leadIn">Copyright &copy; 2022 Meta-Builders</p>
        <ul className="relative grid grid-cols-2 gap-4 sm:grid-cols-4 w-1/4">
          {links.map((link) => (
            <li key={uuid()} className="leadIn">
              <a
                className="flex items-center justify-center w-16 h-16 p-4 border-2 border-current rounded-full"
                href={link.url}
              >
                <span className="sr-only">{link.description}</span>
                <Icon className="h-full" icon={link.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer;
