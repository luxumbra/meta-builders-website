import type React from 'react';
import type { ReactElement } from 'react';

import { ButtonProps } from 'react-daisyui';

import Footer from '~mb/default/Footer';
import Header from '~mb/default/Header';
import "~mb/styles/index.css";

export type LayoutProperties = {
  title?: string;
  description?: string;
  permalink?: string;
  previewImageSrc?: URL;
};
export function Layout({ children, content }: {children: React.ReactNode, content: LayoutProperties}): JSX.Element {
  const { title, description, permalink, previewImageSrc } = content
  const metaTitle = `${title ?? 'Welcome to the Metaverse'} - Meta-Builders`
  const metaLink = permalink ? `https://metabuilders.luxumbra.dev${permalink}` : ''
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
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