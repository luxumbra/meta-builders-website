## Meta-Builders

### Get up & running
You'll want to install [pnpm](https://pnpm.io/) with `npm install -g pnpm` if you don't have it already. 

`pnpm i` to install the dependencies.

`pnpm dev` to run the dev server.

`pnpm build` to run ts-lint & build the app.

`pnpm preview` to preview the built app

We're using ThirdWeb Marketplace contracts & SDK. I found there were some issues with some of the ThirdWeb hooks mainly with `useBalance` so pulled in the PolygonScan api for balance checks when buying NFTs. The api calls need to be optimised.


### Content updates
If you're wanting to update team bios, partners, services you can find the json files in the `/src/data` directory

