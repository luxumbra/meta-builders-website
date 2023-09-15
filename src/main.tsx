import { StrictMode } from "react";

import { Honeybadger, HoneybadgerErrorBoundary } from '@honeybadger-io/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { UserbackProvider } from '@userback/react';
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

import App from "./App";

import { ThemeProvider } from "~mb/contexts";
import './styles/index.css'
import { honeybadgerApiKey, isDevelopment, thirdwebAppID, userbackToken } from "~mb/lib/constants";

const queryClient = new QueryClient()

// This is the chainId the dApp will work on.
const activeChainId = ChainId.Mainnet;


const honeybadgerNodeConfig = {
  apiKey: import.meta.env.VITE_HONEYBADGER_API_KEY,
  environment: import.meta.env.VITE_NODE_ENV || 'production',
  enableUncaught: true,
  reportData: false,
  debug: import.meta.env.VITE_HONEYBADGER_DEBUG === 'true',
}
const honeybadgerBrowserConfig = {
  apiKey: honeybadgerApiKey,
  environment: isDevelopment ? 'development' : 'production',
  enableUncaught: true,
  maxErrors: 5,
  reportData: false,
  debug: isDevelopment,
}
const honeybadger = typeof window === 'undefined' ?
  Honeybadger.configure(honeybadgerNodeConfig) :
  Honeybadger.configure(honeybadgerBrowserConfig)

// eslint-disable-next-line unicorn/prefer-query-selector
const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
if (container?.hasChildNodes()) {
  hydrateRoot(
    container,
    <StrictMode>
      <HoneybadgerErrorBoundary honeybadger={honeybadger}>
        <UserbackProvider token={userbackToken}>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <ThirdwebProvider
                activeChain={activeChainId}
                clientId={thirdwebAppID}
              >
                <BrowserRouter>
                  <HelmetProvider>
                    <App />
                  </HelmetProvider>
                </BrowserRouter>
              </ThirdwebProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </UserbackProvider>
      </HoneybadgerErrorBoundary>
    </StrictMode>
  );
} else {
  root.render(
    <StrictMode>
      <HoneybadgerErrorBoundary honeybadger={honeybadger}>
        <UserbackProvider token={userbackToken}>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <ThirdwebProvider
                activeChain={activeChainId}
                clientId={thirdwebAppID}
              >
                <BrowserRouter>
                  <HelmetProvider>
                    <App />
                  </HelmetProvider>
                </BrowserRouter>
              </ThirdwebProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </UserbackProvider>
      </HoneybadgerErrorBoundary>
    </StrictMode>
  );
}