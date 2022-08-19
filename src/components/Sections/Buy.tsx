import { marketPlaceContract } from "~mb/lib/constants";
import {MarketplaceListings} from "~mb/marketplace/index";
import { ContentSection } from "~mb/sections/index";

export function SectionIntro(): JSX.Element {
  return <>
    Wherever you are with your project, <span className="text-primary">our packages will help you</span> get to your desired goal and <span
  className="text-primary">exceed your expectations</span>.
  </>
}

export default function BuySection(): JSX.Element {
  const sectionId = 'pricing';

  return (
    <ContentSection
      title="Pricing"
      id={sectionId}
      lead={<SectionIntro />}
    >
      <div className="max-w-full md:max-w-6xl">
        <MarketplaceListings address={marketPlaceContract}  />
      </div>
    </ContentSection>
  )
}