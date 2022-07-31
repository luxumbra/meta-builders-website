
import { useEffect, useRef } from "react";


import {HeroImage} from "~mb/components/HeroImage";
import { useSplashContentAnimation } from "~mb/hooks/animation";

export default function SplashSection(): JSX.Element {
  const sectionReference = useRef<HTMLDivElement>(null);
  // const widths = [450, 800];
  const isDevelopment = import.meta.env.VITE_NODE_ENV === "development"; // this doesn't work

  const elementSelector = ".leadIn";
  const triggerSelector = sectionReference;
  // const charSelector = "#splash-character .leadIn";

  useSplashContentAnimation(elementSelector, triggerSelector);
  // useSplashCharacterAnimation(charSelector, triggerSelector);

  useEffect(() => {
    if (isDevelopment) {
      console.log("SplashSection: useEffect");
    }
  }, [isDevelopment]);

  return (
    <section
      ref={sectionReference}
      id="home"
      className="splash-wrapper relative h-screen w-full dark:bg-slate-900 overflow-x-hidden"
    >
      {/* <Starfield /> */}
      <div
        id="splash-bg-fallback"
        className="absolute inset-0 w-screen h-screen z-0 "
      >
        <HeroImage />
      </div>
      <div className="relative grid h-full grid-cols-1 sm:grid-cols-2 place-items-end lg:place-items-center splash-main pb-20 lg:pb-0">
        <div id="splash-content" className="leadIn invisible justify-self-center self-end lg:self-center">
          <h1 className="flex flex-col self-start lg:self-end gap-2 sm:gap-4 xl:self-auto xl:justify-self-end">
            <div className="shadow-font-heading font-black tracking-tighter text-center text-5xl 2xl:text-8xl gradient-text text-shadow-alt-4xl-teal">
              Meta-Builders
            </div>
          </h1>
          <p className="font-bold text-xl 2xl:text-3xl gradient-text-alt text-fill tracking-tight text-center xl:text-right -translate-y-6 2xl:-translate-y-8 text-shadow">
            Welcome to The Metaverse.</p>
        </div>

        {/* <picture id="splash-character" className="floating self-start w-2/3 max-w-3xl sm:w-10/12 sm:self-auto sm:justify-self-start"> */}
          {/* {!isDevelopment ? (
          <Imgix
            className="object-cover w-full h-full invisible leadIn"
            src={buildImgUrl('astronaut2.png', 'assets/images')}
            width={450}
            htmlAttributes={{
              alt: "A floating astronaut in a space suit",
              sizes
            }}
            />
          ) : ( */}
              {/* <img src="assets/images/astronaut2.png" alt="A floating astronaut in a space suit" width={450}
                className="object-cover w-full h-full invisible leadIn"
              /> */}
          {/* )} */}
        {/* </picture> */}
      </div>
    </section>
  )
}