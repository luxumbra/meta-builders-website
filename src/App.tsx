// eslint-disable-next-line unicorn/prefer-node-protocol
import { Buffer } from 'buffer';

import type { ReactElement } from 'react';
import { useEffect } from 'react';

import gsap from 'gsap';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import _ from 'lodash';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEventListener } from 'usehooks-ts';

import PageNotFound from '~mb/routes/404';
import Home from '~mb/routes/Home';

// const Home = lazy(async () => import('~mb/routes/Home'));
// const PageNotFound = lazy(async () => import('~mb/routes/404'));
gsap.registerPlugin(ScrollToPlugin);

function App(): ReactElement {
  const location = useLocation();

  /**
   * Effect to set the Buffer global variable due to a Coinbase Wallet bug (a dep of ThirdWeb sdk)
   * See: https://stackoverflow.com/a/71953677/5721585
    */
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     window.Buffer = Buffer;
  //   }
  // });

  useEventListener('scroll', _.throttle(() => {
    if (typeof window === 'undefined') return;
    // const tl = gsap.timeline({paused: true, reversed: true});
    const page = document.documentElement;
    const offset = page.scrollTop;
    const backToTop = document.querySelector('.back-to-top') as HTMLElement;

    if (offset > 1200) {
      backToTop.classList.remove('invisible');
    } else {
      backToTop.classList.add('invisible');
    }
    // tl.play();
  }, 200));


  function onLocation(): void {
    if (typeof window === 'undefined') return;
    if (location.hash === '') return;
    const tl = gsap.timeline({ paused: true, reversed: true });
    const element = document.querySelector(location.hash);

    if (element !== null) {
      tl.to(
        window,
        {
          duration: 1,
          delay: 0,
          scrollTo: {
            y: element,
          },
          ease: "power4.inOut",
        },
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    tl.reversed() ? tl.play() : tl.reverse();
  }

  useEffect(() => {
    onLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash, location.pathname]);


  return (
    // <Suspense fallback={<LoadingOrError message="Loading Meta-Builders" />}>
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    // </Suspense>
  );
}

export default App;
