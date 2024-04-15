# <img src="/public/images/logo.svg" height="60" valign="middle" alt="Safe{Wallet}" style="background: #fff; padding: 20px; margin: 0 -20px" />

[![License](https://img.shields.io/github/license/safe-global/safe-wallet-web)](https://github.com/safe-global/safe-wallet-web/blob/main/LICENSE)
![Tests](https://img.shields.io/github/actions/workflow/status/safe-global/safe-wallet-web/test.yml?branch=main&label=tests)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/safe-global/safe-wallet-web)
[![GitPOAP Badge](https://public-api.gitpoap.io/v1/repo/safe-global/safe-wallet-web/badge)](https://www.gitpoap.io/gh/safe-global/safe-wallet-web)

## What was done

This branch contains the implementation for the Wrap/Unwrap ether as requested from the code challange.

- `WrappedEth/forms` - contains the forms that is used in the WrappedEth widget. So far we just have one but I like to keep this separation of concern in case we have different forms in this widget later.
- `WrappedEth/forms/ExchangeForm` - I've removed the `Wrap/Unwrap` markup from the `WrappedEth` component in order to have a better separation of concerns and also a better reusability of the form, since the logic is pretty much the same I've moved it to `forms/ExchangeForm` folder.
- `WrappedEth/hooks` - I've created this folder to put all the hooks that are being used in the `WrappedEth` widget.
- `WrappedEth/hooks/useSafeTransactionFlow` - I've moved this hook to be inside `hooks` folder. Note that I've also added two functions outside the useSafeTransactionFlow function, because it is also part of the `useSafeTransaction` but doesn't uses any state dependency, so its better to keep it outside the react layer.
- `WrappedEth/hooks/useWrappedBalances` - This hook returns the balances of `eth` and `weth`. This could be removed once I figure out how to also have the `weth` balance comming fmor the `useBalances` hook
- Note that I've also added a small user behavior on the widget, which is to have the buttons disabled by default until user adds some balance in the input. If he/her enters a invalid value (a value greater than his/her balance), the button is not enabled and the user would see a invalid feedback. 😘

**Points of improvement**

- The way we get the user WETH balance is by looking to the `getBalance` function from the WETH contract. I saw we have a `useBalances` that returns all the token balances of a given user (as I understood), the ideal case here, would be removing this explict WETH contract call from the code and grab this balance from the `useBalances` hook. I was not able to do so because the weth balance was not appearing in there, which might be because I'm using a different contract address in the sepolia network to test the wrap/unwrap
- The tests to verify the FE validation of the user balance was not updating the input for somereason, I've created all the tests and added a **TODO** comment in the ones which I was having problem to update the component using `fireEvent` -- I've also added a 'skip' command on the test cases with a TODO on top.

### Wrapping ether

To wrap ether, you need to enter some amount less or equal to your current ether balance from your safe wallet and click in the "Wrap" button. Please note the button will be disabled until you enter some valid amount. Ex: "0.0002"

### Unwrap ether

As you did for wrapping ether, you will need to enter some valid amount that is being showing in the "Your WETH balance is..." text, after that you click in the "Unwrap" button and the transaction flow to unwrap should start.

The default Safe web interface.

## Contributing

Contributions, be it a bug report or a pull request, are very welcome. Please check our [contribution guidelines](CONTRIBUTING.md) beforehand.

## Getting started with local development

### Environment variables

Create a `.env` file with environment variables. You can use the `.env.example` file as a reference.

Here's the list of all the environment variables:

| Env variable                                           | Description                                                                                                                                                             |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_INFURA_TOKEN`                             | [Infura](https://docs.infura.io/infura/networks/ethereum/how-to/secure-a-project/project-id) RPC API token                                                              |
| `NEXT_PUBLIC_SAFE_APPS_INFURA_TOKEN`                   | Infura token for Safe Apps, falls back to `NEXT_PUBLIC_INFURA_TOKEN`                                                                                                    |
| `NEXT_PUBLIC_IS_PRODUCTION`                            | Set to `true` to build a minified production app                                                                                                                        |
| `NEXT_PUBLIC_GATEWAY_URL_PRODUCTION`                   | The base URL for the [Safe Client Gateway](https://github.com/safe-global/safe-client-gateway)                                                                          |
| `NEXT_PUBLIC_GATEWAY_URL_STAGING`                      | The base CGW URL on staging                                                                                                                                             |
| `NEXT_PUBLIC_SAFE_VERSION`                             | The latest version of the Safe contract, defaults to 1.3.0                                                                                                              |
| `NEXT_PUBLIC_WC_PROJECT_ID`                            | [WalletConnect v2](https://docs.walletconnect.com/2.0/cloud/relay) project ID                                                                                           |
| `NEXT_PUBLIC_TENDERLY_ORG_NAME`                        | [Tenderly](https://tenderly.co) org name for Transaction Simulation                                                                                                     |
| `NEXT_PUBLIC_TENDERLY_PROJECT_NAME`                    | Tenderly project name                                                                                                                                                   |
| `NEXT_PUBLIC_TENDERLY_SIMULATE_ENDPOINT_URL`           | Tenderly simulation URL                                                                                                                                                 |
| `NEXT_PUBLIC_BEAMER_ID`                                | [Beamer](https://www.getbeamer.com) is a news feed for in-app announcements                                                                                             |
| `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID`                    | [GTM](https://tagmanager.google.com) project id                                                                                                                         |
| `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_DEVELOPMENT_AUTH`      | Dev GTM key                                                                                                                                                             |
| `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_LATEST_AUTH`           | Preview GTM key                                                                                                                                                         |
| `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_LIVE_AUTH`             | Production GTM key                                                                                                                                                      |
| `NEXT_PUBLIC_SENTRY_DSN`                               | [Sentry](https://sentry.io) id for tracking runtime errors                                                                                                              |
| `NEXT_PUBLIC_SAFE_GELATO_RELAY_SERVICE_URL_PRODUCTION` | [Safe Gelato Relay Service](https://github.com/safe-global/safe-gelato-relay-service) URL to allow relaying transactions via Gelato                                     |
| `NEXT_PUBLIC_SAFE_GELATO_RELAY_SERVICE_URL_STAGING`    | Relay URL on staging                                                                                                                                                    |
| `NEXT_PUBLIC_IS_OFFICIAL_HOST`                         | Whether it's the official distribution of the app, or a fork; has legal implications. Set to true only if you also update the legal pages like Imprint and Terms of use |
| `NEXT_PUBLIC_REDEFINE_API`                             | Redefine API base URL                                                                                                                                                   |
| `NEXT_PUBLIC_FIREBASE_OPTIONS_PRODUCTION`              | Firebase Cloud Messaging (FCM) `initializeApp` options on production                                                                                                    |
| `NEXT_PUBLIC_FIREBASE_VAPID_KEY_PRODUCTION`            | FCM vapid key on production                                                                                                                                             |
| `NEXT_PUBLIC_FIREBASE_OPTIONS_STAGING`                 | FCM `initializeApp` options on staging                                                                                                                                  |
| `NEXT_PUBLIC_FIREBASE_VAPID_KEY_STAGING`               | FCM vapid key on staging                                                                                                                                                |
| `NEXT_PUBLIC_SOCIAL_WALLET_OPTIONS_PRODUCTION`         | Web3Auth and Google credentials (production)                                                                                                                            |
| `NEXT_PUBLIC_SOCIAL_WALLET_OPTIONS_STAGING`            | Web3Auth and Google credentials (staging)                                                                                                                               |
| `NEXT_PUBLIC_SPINDL_SDK_KEY`                           | [Spindl](http://spindl.xyz) SDK key                                                                                                                                     |

If you don't provide some of the variables, the corresponding features will be disabled in the UI.

### Running the app locally

Install the dependencies:

```bash
yarn
```

Generate types:

```bash
yarn postinstall
```

Run the development server:

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Lint

ESLint:

```
yarn lint --fix
```

Prettier:

```
yarn prettier
```

## Tests

Unit tests:

```
yarn test --watch
```

### Cypress tests

Build a static site:

```
yarn build
```

Serve the static files:

```
yarn serve
```

Launch the Cypress UI:

```
yarn cypress:open
```

You can then choose which e2e tests to run.

## Component template

To create a new component from a template:

```
yarn cmp MyNewComponent
```

## Pre-push hooks

This repo has a pre-push hook that runs the linter (always) and the tests (if the `RUN_TESTS_ON_PUSH` env variable is set to true)
before pushing. If you want to skip the hooks, you can use the `--no-verify` flag.

## Frameworks

This app is built using the following frameworks:

- [Safe Core SDK](https://github.com/safe-global/safe-core-sdk)
- [Safe Gateway SDK](https://github.com/safe-global/safe-gateway-typescript-sdk)
- Next.js
- React
- Redux
- MUI
- ethers.js
- web3-onboard
