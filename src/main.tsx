import { StrictMode } from "react";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

import App from "./App";

import { ThemeProvider } from "~mb/contexts";


import './styles/index.css'

const queryClient = new QueryClient()

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mainnet;

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1,
});

// eslint-disable-next-line unicorn/prefer-query-selector
const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
if (container?.hasChildNodes()) {
  hydrateRoot(
    container,
    <StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ThirdwebProvider
            desiredChainId={activeChainId}
          >
            <BrowserRouter>
              <HelmetProvider>
                <App />
              </HelmetProvider>
            </BrowserRouter>
          </ThirdwebProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
} else {
  root.render(
    <StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ThirdwebProvider
            desiredChainId={activeChainId}
          >
            <BrowserRouter>
              <HelmetProvider>
                <App />
              </HelmetProvider>
            </BrowserRouter>
          </ThirdwebProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
}