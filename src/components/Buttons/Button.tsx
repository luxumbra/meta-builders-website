import { FaSpinner } from 'react-icons/fa/index.js';

type IButtonProperties = React.FC<HTMLButtonElement> & {
  isLoading?: boolean;
  isDisabled?: boolean;
  intent?: string;
  size?: string;
}

export function Button(properties: IButtonProperties, children: JSX.Element): JSX.Element {
  const { isLoading, isDisabled, intent, size, ...rest } = properties;
  return (
    <button
      type="button"
      className={`btn ${intent ?? 'btn-primary'} ${size ?? 'btn-md'}`}
      aria-disabled={isDisabled ?? isLoading}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {isLoading ? <FaSpinner className="spinner" /> : children}
    </button>
  )
}

Button.defaultProps = {
  isLoading: false,
  isDisabled: false,
  intent: 'btn-primary',
  size: 'btn-md'
}