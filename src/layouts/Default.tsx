import type React from 'react';
import { useEffect, useRef } from 'react';

import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { HashLink } from 'react-router-hash-link';
import { useEventListener } from 'usehooks-ts';


import Footer from '~mb/default/Footer';
import Header from '~mb/default/Header';

import "~mb/styles/index.css";

gsap.registerPlugin(ScrollToPlugin);

export type LayoutProperties = {
  title?: string;
  description?: string;
  permalink?: string;
  previewImageSrc?: URL;
};

export function Layout({ children, content }: {children: React.ReactNode, content: LayoutProperties}): JSX.Element {
  const { title, description, previewImageSrc } = content


  return (
    <div className="wrapper h-full bg-gradient-to-b dark:from-slate-900 dark:to-slate-800 overflow-x-hidden">
      {/* <Seo title={title} description={description} previewImageSrc={previewImageSrc} /> */}
      <Header />
      {children}
      <HashLink to="/#home" className="group inline-flex invisible items-center back-to-top py-3 text-sm 2xl:text-lg text-normal motion-safe:animate-pulse-min uppercase font-sans fixed bottom-12 right-2 2xl:bottom-16 2xl:right-16 z-10"><span className="gradient-text text-shadow-alt-md-teal ">Top </span> <Icon icon="emojione-monotone:index-pointing-up" className='h-5 w-5 2xl:h-8 2xl:w-8 text-violet-500 inline '/></HashLink>
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