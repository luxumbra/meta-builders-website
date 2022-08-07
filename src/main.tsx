import { StrictMode } from "react";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

import App from "./App";

import { ThemeProvider } from "~mb/contexts";


import './styles/index.css'

const queryClient = new QueryClient()

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;

const container = document.querySelector("#root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
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
