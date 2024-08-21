# ETH LSD App

ETH LSD App is a user interface where users can stake, unstake and get latest information about the project. As a convention in web3 all API users interact with are directly from the RPC configured in wallet, so the app is a pure DApp.

![ETH LSD App Homepage](/image/ethlsd/eth_lsd_app_homepage.png 'ETH LSD APP Homepage')

![ETH LSD App Notification Page](/image/ethlsd/eth_lsd_app_notification.png 'ETH LSD APP Notification Page')

# Build your own LSD App

## Setup Node.js env

1. Fork [code on GitHub](https://github.com/stafiprotocol/eth-lsd-app)
1. Install [Node.js >=v16](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
1. Install yarn via npm: `npm install --global yarn`
1. Enter project root directory then install all dependencies via terminal: `yarn`
1. Start app by: `yarn dev`

## Configure your app

> In normal case you do not need update ABI files, but if you modify the contracts then you probably want to update abi files which are in `config/abi` folder.

- Change branding links and text here: `config/appConf/app.json`

```json
// here are some config examples in app.json
{
  "appTitle": "ETH LSD App", // title of this app
  "chainIcon": "/images/chain/ethereum.png",
  "token": {
    // token infos
    "tokenName": "ETH", // name of the original token
    "lsdTokenName": "rETH", // name of the lsd token
    "supportChains": ["Ethereum", "Arbitrum", "Optimism", "Polygon"], // chains which lsd token can be supported
    "lsdTokenIconUri": "https://cdn.stafi.io/rtoken/logo/rETH.png", // icon link of lsd token
    "tokenIcon": "/images/token/ETH.svg", // icon of  the stake token
    "lsdTokenIcon": "/images/token/rETH.svg" // icon of lsd token
  },
  "unstake": {
    // lock tip info shown in unstake page
    "lockTipLink": "https://docs.stafi.io/stakingeth/unstake/",
    "duration": "1-5 days"
  },
  "apr": 3.1, // default apr of lsd token
  "detailedInfo": {
    // audit info in Detail Info section
    "audit": {
      "nameList": ["Peckshield", "Blocksec"],
      "link": "https://github.com/stafiprotocol/security/blob/main/audits/202304_BlockSec_StaFi-ETHWithdraw/blocksec_stafi_v1.0-signed.pdf"
    },
    "listedIns": [
      {
        "name": "Coingecko",
        "link": "https://www.coingecko.com/en/coins/stafi-staked-eth"
      },
      {
        "name": "Defilama",
        "link": "https://defillama.com/yields/pool/b2fe5b13-eca4-47cc-b3fd-1de24a296018"
      }
    ]
  },
  "auditList": [
    // by which the lsd contracts are audited
    {
      "name": "PeckShield", // name and icon are shown on the top of the app
      "icon": "/images/audit/peck_shield.svg",
      "iconDark": "/images/audit/peck_shield_dark.svg"
    },
    {
      "name": "BlockSec",
      "icon": "/images/audit/block_sec.svg",
      "iconDark": "/images/audit/block_sec_dark.svg"
    }
  ],
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
      "title": "How much time is needed for ETH withdrawals?",
      "contents": [
        {
          "type": "text",
          "content": "If the unstaking pool's ETH balance exceeds your withdrawal amount, you will instantly receive your ETH upon transaction approval.\n"
        },
        {
          "type": "text",
          "content": "However, if the unstaking pool's ETH balance is less than your withdrawal amount, the withdrawal process will take 1-5 days. After this period, you can claim your ETH using the withdraw function.\n"
        }
      ]
    },
    {
      "title": "What's the exchange rate of rETH?",
      "contents": [
        {
          "type": "text",
          "content": "To learn more about the exchange rate of rTokens and how they are calculated, please read:\n"
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
  "tokenPriceUrl": "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
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
    "name": "Holesky"
  },
  "rpc": "https://ethereum-holesky.publicnode.com", // rpc link of the chain
  "explorer": "https://holesky.etherscan.io", // explorer link of the chain
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
    "withdrawContract": {
      // address of lsd withdraw contract
      "address": "0x3CB60643B531632A243dA103f3d0A860eB49EEFC"
    },
    "networkBalanceContract": {
      // address of lsd network balance contract
      "address": "0xbfa824c78AC83c09dBF33Fcf6bf8116496189F28"
    }
  }
}
```

## Customize Theme

You can change color config in `tailwind.config.js`, each color has light & dark versions(i.e text1 & text1Dark).

![Customize Theme](/image/ethlsd/customize_theme.png 'Customize Theme')

## Build and deploy

Run `yarn build` or `yarn build:dev` to build your app, the static files will be placed in `out` folder. Upload those files to any static web hosting services you like.
