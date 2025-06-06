

import Honeybadger from '@honeybadger-io/js';
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
      // console.log('disconnectWallet');
    }).catch(error => {
      Honeybadger.notify(error as Error);
      // console.log('disconnectWallet error', { error });
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
      if (isNetworkMismatch) {
        console.error('connectMetamaskWallet isNetworkMismatch', network); // eslint-disable-line no-console
        // TODO: show network mismatch toast and-or network switcher
      }


    }).catch(error => {
      Honeybadger.notify(error as Error);
      // console.log('connectMetamaskWallet error', { error });
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
        {/* {isNetworkMismatch ? (
          <div className='tooltip tooltip-bottom tooltip-warning' data-tip="Testnet only rn">
            <span className='text-orange-500 font-sans'>Change to Mumbai network</span>
            </div>
        ) : (
          <> */}
            <button
              type="button"
              className="
                btn
                btn-link
                p-0"
              aria-label='Web3 wallet disconnect'
              onClick={onClickDisconnect}
            >
          <Icon icon="tabler:wallet" className={`${size ?? 'text-2xl lg:text-2xl'} transition-colors duration-200  ${address && !isNetworkMismatch ? 'text-green-600 dark:text-green-500 text-shadow-alt-teal dark:hover:text-shadow-alt-teal' : (isNetworkMismatch ? 'text-orange-500 font-sans' : 'text-teal-200 dark:text-violet-300')}`} />
              <span className="sr-only">Disconnect</span>
              </button>
              {isNetworkMismatch ? (
                <div className='tooltip tooltip-bottom tooltip-warning' data-tip="Testnet only rn">
                  <span className='text-orange-500 font-sans text-xs lg:text-md'>Switch to Ethereum mainnet</span>
                </div>
              ) : (
                <span className='text-xs lg:text-md text-green-600 dark:text-green-500 text-shadow-alt-teal dark:hover:text-shadow-alt-teal inline'>{shortenAddress(address)}</span>
              )}
          {/* </>
        )
        } */}
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