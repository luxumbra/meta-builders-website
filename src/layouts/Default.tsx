

import type React from 'react';
import { ReactElement, useEffect } from 'react';

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ButtonProps } from 'react-daisyui';

import Footer from '~mb/default/Footer';
import Header from '~mb/default/Header';

import "~mb/styles/index.css";
import { useEventListener } from 'usehooks-ts';

gsap.registerPlugin(ScrollToPlugin);

export type LayoutProperties = {
  title?: string;
  description?: string;
  permalink?: string;
  previewImageSrc?: URL;
};

export function useScrollOnLoad(): void {
  const tl = gsap.timeline();

  useEffect(() => {
    // if (typeof window === "undefined") return;

    if (window.location.hash) {
      console.log('scroll to hash', window.location.hash);

      const element = document.querySelector(window.location.hash);
      if (element ) {
        // TODO: not sure why the easing & timing are not working
        tl.to(
          window,
          {
            duration: 0,
            delay: 0.1,
            scrollTo: {
              y: element,
            },
            ease: "power3.inOut",
          },
        );
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.hash]);
}

export function Layout({ children, content }: {children: React.ReactNode, content: LayoutProperties}): JSX.Element {
  const { title, description, permalink, previewImageSrc } = content
  const metaTitle = `${title ?? 'Welcome to the Metaverse'} - Meta-Builders`
  const metaLink = permalink ? `https://metabuilders.luxumbra.dev${permalink}` : ''



  // scroll to the hash in the url if there is one


  useEventListener("load", useScrollOnLoad);
  return (
    <div className="wrapper bg-gradient-to-b dark:from-slate-900 dark:to-slate-800">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;



Layout.defaultProps = {
  title: "Meta-Builders",
  description: "Meta-Builders is a digital agency that specializes in building in the Metaverse, from websites, apps, to digital products for brands and businesses.",
  permalink: "/",
  previewImageSrc: 'https://metabuilders.luxumbra.dev/social.png',
}
/* <script>
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

// scroll to the hash in the url if there is one
function handleScrollOnLoad() {
  const tl = gsap.timeline();
  if (typeof window === "undefined") return;

  if (window.location.hash) {
    const element = document.querySelector(window.location.hash);
    if (element && tl) {
      // TODO: not sure why the easing & timing are not working
      tl.to(
        window,
        {
          duration: 0,
          delay: 0.1,
          scrollTo: {
            y: element,
          },
          ease: "power3.inOut",
        },
      );
    }
  }
}
window.addEventListener("load", handleScrollOnLoad);
</script>
<script>
import { client } from '~mb/config';
</script>
<style>
:global(html) {
  scroll-behavior: smooth;
}
@media (prefers-reduced-motion: reduce) {
  :global(html) {
    scroll-behavior: auto;
  }
}
</style> */