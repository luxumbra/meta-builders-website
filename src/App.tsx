import type { ReactElement} from 'react';
import { lazy, Suspense } from 'react';


import { Route, Routes, useLocation } from 'react-router-dom';

import { Header } from '~mb/components/Default/Header';
import LoadingOrError from '~mb/components/LoadingOrError';
import { PageNotFound } from '~mb/routes/404';

const Home = lazy(async () => import('~mb/routes/Home'));

function App(): ReactElement {
  const location = useLocation();
  return (
    <Suspense fallback={<LoadingOrError />}>
      <Header />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
