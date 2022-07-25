
import { useLayoutEffect } from "react";

import Imgix from "react-imgix";

import { handleSplashContentAnimation, handleSplashCharacterAnimation } from "~mb/animation/functions";
import Astronaut from '~mb/assets/images/astronaut.png';
import {HeroImage} from "~mb/components/HeroImage";
import { Starfield } from "~mb/components/Starfield";
import { buildImgUrl } from "~mb/lib/helpers";

export function SplashSection(): JSX.Element {

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
            src={buildImgUrl(Astronaut)}
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

// <!-- https://github.com/withastro/compiler/issues/395 -->
// <!-- <noscript>
//   <style>
//     #splash-bg-fallback {
//       @apply block;
//     }
//   </style>
// </noscript> -->

// <script>
//   import { handleSplashContentAnimation, handleSplashCharacterAnimation } from "~mb/animation/functions";
//   const elSelector = "#splash-content > .leadIn";
//   const triggerSelector = "#splash-wrapper";
//   const charSelector = "#splash-character .leadIn";
//   const charTriggerSelector = "#splash-character";
//   handleSplashContentAnimation(elSelector, triggerSelector);
//   handleSplashCharacterAnimation(charSelector, triggerSelector);
// </script>

// <style>
//   @keyframes float {
//     0% {
//       transform: translate3d(0, 0, 0);
//     }

//     100% {
//       transform: translate3d(0, 30px, 0);
//     }
//   }

//   picture {
//     animation: float linear 2.5s infinite alternate;
//   }

//   @media (prefers-reduced-motion: reduce) {
//     picture {
//       @apply animate-none;
//     }

//     :global(#starfield) {
//       @apply hidden;
//     }

//     #splash-bg-fallback {
//       @apply block;
//     }
//   }
// </style>