

import {
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useNetwork,
  useAddress,
  useDisconnect
} from '@thirdweb-dev/react'
import { TbWallet, TbWalletOff } from 'react-icons/tb/index.js';

import { shortenAddress } from '~mb/lib/helpers';

export function ButtonWeb3Connect(): JSX.Element {
  const connectCoinbaseWallet = useCoinbaseWallet();
  const connectMetamaskWallet = useMetamask();
  const connectWalletConnectWallet = useWalletConnect();
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

  function onClickConnectCoinbase(): void {
    connectCoinbaseWallet().then(() => {
      console.log('connectCoinbaseWallet');
    }).catch(error => {
      console.log('connectCoinbaseWallet error', { error });
    });
  }

  function onClickConnectMetamask(): void {
    connectMetamaskWallet().then(() => {
      console.log('connectMetamaskWallet', address, network);
    }).catch(error => {
      console.log('connectMetamaskWallet error', { error });
    });
  }

  function onClickConnectWalletConnect(): void {
    connectWalletConnectWallet().then(() => {
      console.log('connectWalletConnectWallet');
    }).catch(error => {
      console.log('connectWalletConnectWallet error', { error });
    });
  }


  if (address) {
    return (
      <button
        type="button"
        className="btn btn-primary flex-grow"
        onClick={onClickDisconnect}
      >
        <TbWalletOff className="text-lg" />
        <span className="ml-2">Disconnect</span>
      </button>
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
        // disabled={!connectors[0].ready || walletConnectionState.loading}
        onClick={onClickConnectMetamask}
      >
        <TbWallet className={`text-xl transition-colors duration-200  ${address ? 'text-green-500 text-shadow-alt' : 'text-slate-600 dark:text-pink-100'}`} />
      </button>
      {address ? <span className='text-xs text-green-500 text-shadow-alt'>{shortenAddress(address)}</span> : undefined}
    </div>
  )
}

export default ButtonWeb3Connect;