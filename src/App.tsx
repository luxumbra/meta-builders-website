// eslint-disable-next-line unicorn/prefer-node-protocol
import { Buffer } from 'buffer';

import type { ReactElement} from 'react';
import { useEffect, lazy, Suspense } from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';

import LoadingOrError from '~mb/components/LoadingOrError';

const Home = lazy(async () => import('~mb/routes/Home'));
const PageNotFound = lazy(async () => import('~mb/routes/404'));

function App(): ReactElement {
  const location = useLocation();

  /**
   * Effect to set the Buffer global variable due to a Coinbase Wallet bug
   * See: https://stackoverflow.com/a/71953677/5721585
    */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.Buffer = Buffer;
    }
  });

  return (
    <Suspense fallback={<LoadingOrError />}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
