import { marketPlaceContract } from "~mb/lib/constants";
import {MarketplaceListings} from "~mb/marketplace/index";
import { ContentSection } from "~mb/sections/index";

export function SectionIntro(): JSX.Element {
  return (
    <>
      <p><span className="text-primary">Your project is what&apos;s important here.</span></p>
      <p>Choose the right package and our industry leading team will do the rest.</p >
    </>
  )
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