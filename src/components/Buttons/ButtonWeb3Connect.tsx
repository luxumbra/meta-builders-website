

import { Icon } from '@iconify/react';
import {
  useMetamask,
  useNetwork,
  useAddress,
  useDisconnect, useNetworkMismatch
} from '@thirdweb-dev/react'

import { shortenAddress } from '~mb/lib/helpers';

export type ButtonWeb3ConnectProps = {
  size?: string;
}

export function ButtonWeb3Connect(properties: ButtonWeb3ConnectProps): JSX.Element {
  const { size } = properties;
  // const connectCoinbaseWallet = useCoinbaseWallet();
  const connectMetamaskWallet = useMetamask();
  // const connectWalletConnectWallet = useWalletConnect();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const network = useNetwork();
  const isNetworkMismatch = useNetworkMismatch();
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
      if (isNetworkMismatch) {
        console.log('connectMetamaskWallet isNetworkMismatch', network);
        // TODO: show network mismatch toast and-or network switcher
      }


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
      <div className='flex flex-row-reverse items-center justify-between content-between gap-0 lg:gap-1'>
        {isNetworkMismatch ? (
          <div className='tooltip tooltip-bottom tooltip-warning' data-tip="Testnet only rn">
            <span className='text-orange-500 font-sans'>Change to Mumbai network</span>
            </div>
        ) : (
          <>
            <button
              type="button"
              className="
                btn
                btn-link
                p-0"
              aria-label='Web3 wallet disconnect'
              onClick={onClickDisconnect}
            >
              <Icon icon="tabler:wallet" className={`${size ?? 'text-2xl lg:text-2xl'} transition-colors duration-200  ${address ? 'text-green-500 text-shadow-alt' : 'text-teal-200 dark:text-violet-300'}`} />
              <span className="sr-only">Disconnect</span>
            </button>
            <div className='tooltip' data-tip={address}>
              <span className='text-md text-green-500 text-shadow-alt hidden lg:inline'>{shortenAddress(address)}</span>
            </div>
          </>
        )
        }
      </div >
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
        <Icon icon="tabler:wallet" className={`${size ?? 'text-2xl lg:text-3xl'} transition-colors duration-200  ${address ? 'text-green-500 text-shadow-alt' : 'text-teal-200 dark:text-violet-300'}`} />
        <span className="sr-only">Connect</span>
      </button>
    </div>
  )
}

export default ButtonWeb3Connect;

ButtonWeb3Connect.defaultProps = {
  size: 'text-2xl'
}