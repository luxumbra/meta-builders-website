import { Icon } from "@iconify/react";
import accounting from "accounting";

export type IPriceDisplayProperties = {
  price: string;
  currency: string;
}

/** Displays the price of an asset in a pretty way */
export function PriceDisplay({ price, currency }: IPriceDisplayProperties): JSX.Element {
  const cost = Number.parseFloat(price);
  const formatted = accounting.formatMoney(price, '', 2)
  const symbol = currency.toLowerCase();

  return (
      <span className="price inline-flex items-center gap-2 text-lg 2xl:text-xl font-normal relative">
      <Icon icon={`cryptocurrency:${symbol}`} className="h-8 w-8 text-violet-400 opacity-80" />
      {cost > 0 ? formatted : 'TBD'}
      {cost > 0 ?
        (
          <span className="text-violet-400">{currency}</span>
        ) : undefined
      }
    </span>
  )
}

export default PriceDisplay;