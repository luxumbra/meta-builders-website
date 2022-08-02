import { StrictMode } from "react";

import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'

import App from "./App";

import { ThemeProvider } from "~mb/contexts";


import './styles/index.css'
// import { registerSW } from 'virtual:pwa-register'
// This is the chainId your dApp will work on.
const queryClient = new QueryClient()

const activeChainId = ChainId.Mumbai;
const alchemyRpc = "https://polygon-mumbai.g.alchemy.com/v2/N6I1vMx2hiWVsQa7tsg68OqmvejSmj0m"

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
          <App />
        </BrowserRouter>
        </ThirdwebProvider>
        </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
