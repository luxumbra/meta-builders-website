
import { MutableRefObject, useEffect, useRef } from "react";

import Imgix from "react-imgix";

import {HeroImage} from "~mb/components/HeroImage";
import { Starfield } from "~mb/components/Starfield";
import { useSplashContentAnimation, useSplashCharacterAnimation } from "~mb/hooks/animation";
import { buildImgUrl } from "~mb/lib/helpers";

export default function SplashSection(): JSX.Element {
  const sectionReference = useRef<HTMLDivElement>(null);
  // const widths = [450, 800];
  const sizes = "(min-width: 640px) 42vw, 67vw";
  const isDevelopment = import.meta.env.VITE_NODE_ENV === "development";
  console.log('isDevelopment', isDevelopment, import.meta.env.VITE_NODE_ENV);

  const elementSelector = "#splash-content > .leadIn";
  const triggerSelector = sectionReference;
  const charSelector = "#splash-character .leadIn";

  useSplashContentAnimation(elementSelector, triggerSelector);
  useSplashCharacterAnimation(charSelector, triggerSelector);

  useEffect(() => {
    if (isDevelopment) {
      console.log("SplashSection: useEffect");
    }
  }, [isDevelopment]);

  return (
    <section
      ref={sectionReference}
      id="splash-wrapper"
      className="relative h-screen w-full bg-black"
    >
      <Starfield />
      <div
        id="splash-bg-fallback"
        className="absolute inset-0 hidden"
      >
        <HeroImage />
      </div>
      <div className="relative grid h-full sm:grid-cols-2 place-items-end lg:place-items-center splash-main pb-20 lg:pb-0">
        <div id="splash-content">
          <h1 className="leadIn invisible flex flex-col self-start lg:self-end gap-2 sm:gap-4 sm:self-auto sm:justify-self-end">
            <div className="shadow-font-heading font-black tracking-tighter text-center text-8xl gradient-text text-shadow-alt-4xl-teal">
              Meta-Builders
            </div>
          </h1>
          <p className="leadIn invisible font-bold text-xl lg:text-3xl gradient-text-alt text-fill tracking-tight text-center lg:text-right -translate-y-3 lg:-translate-y-8 text-shadow">
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