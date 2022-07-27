import accounting from "accounting";

export type IPriceDisplayProperties = {
  price: string;
  currency: string;
}

/** Displays the price of an asset in a pretty way */
export function PriceDisplay({ price, currency }: IPriceDisplayProperties): JSX.Element {
  const cost = Number.parseFloat(price);
  const formatted = accounting.formatMoney(price, '$', 2)

  return (
      <p className="price inline-flex gap-3 text-lg font-normal">
      {cost > 0 ? formatted : 'TBD'}
      {cost > 0 ?
        (
          <span className="text-violet-400">{currency}</span>
        ) : undefined
      }
    </p>
  )
}

export default PriceDisplay;