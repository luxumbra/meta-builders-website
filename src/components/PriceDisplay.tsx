
export type IPriceDisplayProperties = {
  price: string;
  currency: string;
}

/** Displays the price of an asset in a pretty way */
export function PriceDisplay({ price, currency }: IPriceDisplayProperties): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-between">
      <span>{price}</span>
      <span>{currency}</span>
    </div>
  )
}

export default PriceDisplay;