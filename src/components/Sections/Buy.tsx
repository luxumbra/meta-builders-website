import { useLayoutEffect } from "react";

import { handleBuyCtaAnimation, handleSectionAnimation } from '~mb/animation/functions';
import { marketPlaceContract } from "~mb/lib/constants";
import {MarketplaceListings} from "~mb/marketplace/index";
import { ContentSection } from "~mb/sections/index";

export function SectionIntro(): JSX.Element {
  return <>
    Wherever you are with your project, <span className="text-primary">our packages</span> will help you get to <span
  className="text-primary">your desired goal</span> and exceed your expectations.
  </>
}

export function BuySection(): JSX.Element {
  const section = 'buy';
  const sectionId = '#buy';
  const ctaId = '#cta-buy';

  useLayoutEffect(() => {
    console.log('buySection ule');

    handleSectionAnimation(sectionId);
    handleBuyCtaAnimation(ctaId, sectionId);
  }
  , [sectionId, ctaId]);

  return (
    <ContentSection
      title="Buy a package"
      id={section}
      lead={<SectionIntro />}
    >
      <div className="max-w-6xl">
        <MarketplaceListings address={marketPlaceContract}  />
      </div>

      <div
        id="cta-buy"
        className="fixed bottom-3/4 right-0 w-1/4 translate-x-full opacity-0 sr-only:opacity-100"
      >
        <div className="p-5 bg-slate-200 dark:bg-blue-800 border border-slate-400 dark:border-pink-500 shadow-xl shadow-slate-400 dark:shadow-slate-900 flex flex-col rounded-md">
          <h4 className="text-lg font-bold text-blue-300">Chat to us</h4>
          <p className="font-sm text-slate-600 dark:text-slate-500">Jump in our Discord and ask any questions you have, or just say &apos;gm&apos; 👋</p>
        </div>
      </div>
    </ContentSection>
  )
}