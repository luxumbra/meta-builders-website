
import { useLayoutEffect } from "react";

import Imgix from "react-imgix";

import { handleSplashContentAnimation, handleSplashCharacterAnimation } from "~mb/animation/functions";
import {HeroImage} from "~mb/components/HeroImage";
import { Starfield } from "~mb/components/Starfield";
import { buildImgUrl } from "~mb/lib/helpers";

export default function SplashSection(): JSX.Element {

  // const widths = [450, 800];
  const sizes = "(min-width: 640px) 42vw, 67vw";

  const elementSelector = "#splash-content > .leadIn";
  const triggerSelector = "#splash-wrapper";
  const charSelector = "#splash-character .leadIn";


  useLayoutEffect(() => {
    handleSplashContentAnimation(elementSelector, triggerSelector);
    handleSplashCharacterAnimation(charSelector, triggerSelector);

    return () => {
      handleSplashContentAnimation(elementSelector, triggerSelector, true);
      handleSplashCharacterAnimation(charSelector, triggerSelector, true);
    };
  }, [])

  return (
    <section
      id="splash-wrapper"
      className="relative h-screen w-full bg-black"
    >
      <Starfield />
      <div
        id="splash-bg-fallback"
        className="absolute inset-0 hidden opacity-40"
      >
        <HeroImage />
      </div>
      <div className="relative grid h-full sm:grid-cols-2 place-items-center splash-main">

        <div id="splash-content">
          <h1 className="leadIn invisible flex flex-col self-end gap-2 sm:gap-4 sm:self-auto sm:justify-self-end">
            <div className=" font-extrabold tracking-tighter text-center text-6xl gradient-text text-shadow-alt">
              Meta-Builders
            </div>
          </h1>
          <p className="leadIn invisible font-bold text-3xl gradient-text-alt text-fill tracking-tight text-center -translate-y-8 text-shadow">
            Welcome to The Metaverse.</p>
        </div>

        <picture id="splash-character" className="self-start w-2/3 max-w-3xl sm:w-10/12 sm:self-auto sm:justify-self-start">

          <Imgix
            className="object-cover w-full h-full invisible leadIn"
            src={buildImgUrl('assets/images/astronaut.png')}
            width={450}
            htmlAttributes={{
              alt: "A floating astronaut in a space suit",
              sizes
            }}
          />
        </picture>
      </div>
    </section>
  )
}