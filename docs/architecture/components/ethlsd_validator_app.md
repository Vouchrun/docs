# PLS LSD Validator App

PLS LSD Validator App is a user interface where node operators can participate in as validators. As a convention in web3 all API users interact with are directly from the RPC configured in wallet, so the app is a pure DApp.

![PLS LSD Validator App Homepage](/image/ethlsd/eth_lsd_validator_app_homepage.png 'PLS LSD Validator App Homepage')

![PLS LSD Validator App Pool Page](/image/ethlsd/eth_lsd_validator_app_pool_page.png 'PLS LSD Validator App Pool Page')

# Build your own LSD App

## Setup Node.js env

1. Fork [code on GitHub](https://github.com/stafiprotocol/eth-lsd-validator-app)
1. Install [Node.js >=v16](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
1. Install yarn via npm: `npm install --global yarn`
1. Enter project root directory then install all dependencies via terminal: `yarn`
1. Start app by: `yarn dev`

## Config your app

> In normal case you do not need update ABI files, but if you had contracts modified then you may want to update abi contents which are in `config/contractAbi.ts` file.

- Change branding links and text here: `config/appConf/app.json`

```json
// here are some config examples in app.json
{
  "appTitle": "PLS Validator App", // title of this app
  "chainIcon": "/images/chain/ethereum.png",
  "token": {
    // token infos
    "tokenName": "PLS", // name of the original token
    "lsdTokenName": "rETH", // name of the lsd token
    "lsdTokenIconUri": "https://cdn.stafi.io/rtoken/logo/rETH.png", // icon link of lsd token
    "tokenIcon": "/images/token/PLS.svg", // icon of PLS token
    "lsdTokenIcon": "/images/token/rETH.svg" // icon of lsd token
  },
  "supportRestApi": true, // Node Ejection section will be shown in Pubkeys page if this value is true
  "apr": 3.1, // default apr of lsd token
  "validatorTotalDepositAmount": 32,
  "trustValidatorDepositAmount": 1,
  "faqList": [
    // FAQs list
    {
      "title": "What are the factors that affect the staking rewards?", // question title
      "contents": [
        // answer of the question, it's comprised of a list of pure texts and links
        {
          "type": "text",
          "content": "Staking rewards in the StaFi protocol are influenced by various factors including the total amount of native tokens staked and redeemed, the staking rewards earned, slash occurrences, penalties, and the commission ratio. Slashing events, caused by disconnection or malicious behavior of validator nodes, could potentially reduce rewards; however, StaFi mitigates this risk by diversifying the staking funds across multiple validators with clean records and requiring them to provide additional deposits as collaterals. The staking reward claim status and the timing of claims on the original chain can also affect staking rewards.\n"
        },
        {
          "type": "text",
          "content": "To learn more about how staking rewards are calculated, please read:\n"
        },
        {
          "type": "link",
          "content": "https://docs.stafi.io/rtoken/#rtoken-exchange-rate\n",
          "link": "https://docs.stafi.io/rtoken/#rtoken-exchange-rate"
        }
      ]
    },
    {
      "title": "How much time is needed for PLS withdrawals?",
      "contents": [
        {
          "type": "text",
          "content": "If the unstaking pool's PLS balance exceeds your withdrawal amount, you will instantly receive your PLS upon transaction approval.\n"
        },
        {
          "type": "text",
          "content": "However, if the unstaking pool's PLS balance is less than your withdrawal amount, the withdrawal process will take 1-5 days. After this period, you can claim your PLS using the withdraw function.\n"
        }
      ]
    },
    {
      "title": "What's the exchange rate of rETH?",
      "contents": [
        {
          "type": "text",
          "content": "To learn more about the exchange rate of vPLS Tokens and how they are calculated, please read:\n"
        },
        {
          "type": "link",
          "content": "https://docs.stafi.io/rtoken/#rtoken-exchange-rate\n",
          "link": "https://docs.stafi.io/rtoken/#rtoken-exchange-rate"
        }
      ]
    }
  ],
  "externalLinkList": [
    // external links related to the app which shown in the setting drawer
    {
      "name": "Docs",
      "link": "https://docs.stafi.io/"
    },
    {
      "name": "Website",
      "link": "https://www.stafi.io/"
    },
    {
      "name": "DAO Forum",
      "link": "https://dao.stafi.io/"
    },
    {
      "name": "Dune Dashboard",
      "link": "https://dune.com/stafi-analysis/stafi"
    },
    {
      "name": "rETH Listing",
      "link": "https://docs.stafi.io/"
    }
  ],
  "contactList": [
    // media list shown in the setting drawer
    {
      "type": "Twitter",
      "link": "https://twitter.com/Stafi_Protocol"
    },
    {
      "type": "Medium",
      "link": "https://stafi-protocol.medium.com/"
    },
    {
      "type": "Discord",
      "link": "https://discord.com/invite/jB77etn"
    },
    {
      "type": "Telegram",
      "link": "https://t.me/stafi_protocol"
    }
  ],
  "tokenPriceUrl": "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
  "docLinks": {
    // doc links in Pool page
    "ejectionMechanism": "https://commonwealth.im/stafi/discussion/10127-withdrawal-design-for-reth-solution-for-upcoming-shanghai-upgrade", // doc link of Ejection Mechanism
    "delegationMechanism": "https://lsaas-docs.stafi.io/docs/architecture/components/validator.html" // doc link of Delegation Mechanism
  }
}
```

- Set your network contract address on Holesky here: `config/appConf/dev.json`
- Set your network contract address on Mainnet here: `config/appConf/prod.json`

```json
// config structures are identical in dev.json and prod.json
// dev.json will be used when you build with `yarn build:dev`
// prod.json will be used when you build with 'yarn build`
{
  "chain": {
    // chain which lsd app runs on
    "id": 17000,
    "name": "Holesky", // displayed on the web page
    "networkName": "holesky" // must match the `network_name` field in deposit_data*.json
  },
  "rpc": "https://ethereum-holesky.publicnode.com", // rpc link of the chain
  "beaconHost": "https://holesky-beacon.stafi.io", // url of beacon host
  "explorer": "https://holesky.etherscan.io",
  "validatorExplorer": "https://holesky.beaconcha.in",
  "blockSeconds": 12, // beacon chain slot time
  "contracts": {
    // lsd contract addresses
    "lsdTokenContract": {
      // address of lsd token contract
      "address": "0x85F7c01009B1bf540699C4FDDf3589DDE60BCb14"
    },
    "depositContract": {
      // address of lsd deposit contract
      "address": "0x044E54D0Fd299917eC9f5cb27B35Ce252D546A2b"
    },
    "networkBalanceContract": {
      // address of lsd network balance contract
      "address": "0xbfa824c78AC83c09dBF33Fcf6bf8116496189F28"
    },
    "networkWithdrawContract": {
      // address of lsd withdraw contract
      "address": "0x3CB60643B531632A243dA103f3d0A860eB49EEFC"
    },
    "nodeDepositContract": {
      "address": "0xcF490F4AB5dF7478de350A28cD2741534dD24986"
    }
  },
  "lsdAppUrl": "https://test-eth-lsd.stafi.io"
}
```

## Customize Theme

You can change color config in `tailwind.config.js`, each color has light & dark versions(i.e text1 & text1Dark).

![Customize Theme](/image/ethlsd/customize_theme.png 'Customize Theme')

## Build and deploy

Run `yarn build` or `yarn build:dev` to build your validator app, the static files will be placed in `out` folder. Upload those files to any static web hosting services you like.
