

import {
  useMetamask,
  useNetwork,
  useAddress,
  useDisconnect
} from '@thirdweb-dev/react'
import { TbWallet, TbWalletOff } from 'react-icons/tb/index.js';

import { shortenAddress } from '~mb/lib/helpers';

export type ButtonWeb3ConnectProps = {
  size?: number | string | undefined;
}

export function ButtonWeb3Connect(properties: ButtonWeb3ConnectProps): JSX.Element {
  const {size} = properties;
  // const connectCoinbaseWallet = useCoinbaseWallet();
  const connectMetamaskWallet = useMetamask();
  // const connectWalletConnectWallet = useWalletConnect();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const network = useNetwork();

  function onClickDisconnect(): void {
    disconnectWallet().then(() => {
      console.log('disconnectWallet');
    }).catch(error => {
      console.log('disconnectWallet error', { error });
    });
  }

  // function onClickConnectCoinbase(): void {
  //   connectCoinbaseWallet().then(() => {
  //     console.log('connectCoinbaseWallet');
  //   }).catch(error => {
  //     console.log('connectCoinbaseWallet error', { error });
  //   });
  // }

  function onClickConnectMetamask(): void {
    connectMetamaskWallet().then(() => {
      console.log('connectMetamaskWallet', address, network);
    }).catch(error => {
      console.log('connectMetamaskWallet error', { error });
    });
  }

  // function onClickConnectWalletConnect(): void {
  //   connectWalletConnectWallet().then(() => {
  //     console.log('connectWalletConnectWallet');
  //   }).catch(error => {
  //     console.log('connectWalletConnectWallet error', { error });
  //   });
  // }


  if (address) {
    return (
      <div className='flex flex-row-reverse items-center justify-center gap-0 lg:gap-3'>
      <button
        type="button"
        className="
        btn
        btn-link
        p-0"
        aria-label='Web3 wallet disconnect'
        onClick={onClickDisconnect}
      >
        <TbWallet className={`text-${size ?? 'xl'} transition-colors duration-200  ${address ? 'text-green-500 text-shadow-alt' : 'text-slate-600 dark:text-violet-300'}`} />
        <span className="sr-only">Disconnect</span>
        </button>
        <span className='text-md text-green-500 text-shadow-alt hidden lg:inline'>{shortenAddress(address)}</span>
      </div>
    )
  }
  return (
    <div className="flex flex-row items-center justify-center">
      <button
        type='button'
        className={`
      btn
      btn-link
      p-0
      `}
        aria-label='Web3 wallet connect'
        onClick={onClickConnectMetamask}
      >
        <TbWallet className={`text-${size ?? 'xl'} transition-colors duration-200  ${address ? 'text-green-500 text-shadow-alt' : 'text-slate-600 dark:text-violet-300'}`} />
        <span className="sr-only">Connect</span>
      </button>
      {address ? <span className='text-xs text-green-500 text-shadow-alt'>{shortenAddress(address)}</span> : undefined}
    </div>
  )
}

export default ButtonWeb3Connect;

ButtonWeb3Connect.defaultProps = {
  size: 'xl'
}