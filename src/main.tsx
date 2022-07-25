import { StrictMode } from "react";

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'


import App from "./App";

import { ThemeProvider } from "~mb/contexts";


import './styles/index.css'
// import { registerSW } from 'virtual:pwa-register'
// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;

const container = document.querySelector("#root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <StrictMode>
    <ThemeProvider>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThirdwebProvider>
    </ThemeProvider>
  </StrictMode>
);
