# Referral SDK

The Vouch Referral SDK lets partner platforms earn **vPLS referral fees** when their users deposit PLS into Vouch liquid staking — with a few lines of code, no protocol changes, and no approvals.

It wraps the [ReferralDeposit contract](https://otter.pulsechain.com/address/0x04988E655163f7368683C9c6d668A8ccc7b142ad), which splits each deposit's freshly minted vPLS atomically: the fee portion goes straight to your payout wallet, the rest to the depositor. One transaction, funds never sit in the wrapper, and depositors always keep full control.

## Where to get it

The SDK is published on the npm registry and free to use (MIT).

```bash
npm install @vouchrun/referral-sdk
```

| Resource | Location |
| --- | --- |
| npm package | `@vouchrun/referral-sdk` (latest: 0.1.1) |
| SDK source & issues | [github.com/Vouchrun/referral-sdk](https://github.com/Vouchrun/referral-sdk) |
| Partner onboarding guide | [docs/ONBOARDING.md](https://github.com/Vouchrun/referral-sdk/blob/main/docs/ONBOARDING.md) |
| Deployed contract | `0x04988E655163f7368683C9c6d668A8ccc7b142ad` on PulseChain |
| Explorer | [View contract](https://otter.pulsechain.com/address/0x04988E655163f7368683C9c6d668A8ccc7b142ad) |

> **Note:** the contract is deployed on PulseChain **mainnet only** — there is no testnet deployment yet, so test with small real deposits (the protocol minimum is 10,000 PLS).

## What the SDK does

| Capability | API |
| --- | --- |
| Live quotes (rate, fee, receive estimate) | `getQuote()` / `quoteDeposit()` |
| Deposit with a referral code | `depositWithReferral()` |
| Register & manage your own codes | `registerReferrer()` / `updateReferrer()` / `transferReferrerOwnership()` |
| Fee attribution & reporting | `getDeposits()` / `watchDeposits()` |
| Friendly error handling | `parseReferralError()` / `isReferralError()` |

It works everywhere — Node 18+, browser, and mobile — with typed API for ESM and CJS. The SDK never touches private keys: you hand it your own viem wallet client, so signing stays in your existing flow.

## Settings

### Fee settings

Referral fees are set with two knobs per **referral code**, plus two safety layers around them:

| Setting | Who sets it | What it does |
| --- | --- | --- |
| `feeBps` | Referral code owner | The fee rate in basis points (1% = 100 bps) |
| `maxFeePls` | Referral code owner | Absolute per-deposit fee cap, in PLS value |
| `maxFeeBps` (global) | Vouch admin | Protocol-wide rate cap — live value **300 bps** (3%), hard ceiling 500 |
| `maxAcceptableFeeBps` | The depositor | Per-transaction veto — reverts if the code charges more than they accept |

The fee charged on any deposit is:

```
fee = min(deposit × feeBps / 10_000, maxFeePls)
```

The cap is what protects whales: because it's PLS-denominated, it stays constant in PLS terms as the vPLS exchange rate appreciates. Setting `maxFeePls = 0` makes a code fee-free (great for launch promos).

A good starting point for most partners: **30 bps (0.3%) with a 5,000 PLS cap** — trivial cost for retail, hard ceiling for big deposits. Your depositors can always see and veto the fee, so keep it friendly.

### Connection settings

| Setting | Default | Notes |
| --- | --- | --- |
| `rpcUrl` | `https://rpc.vouch.run` | Public PulseChain RPC; fallbacks built in |
| Contract address | deployed `0x04988E...142ad` | Override with `address` if you fork or redeploy |
| Wallet | none | Pass a viem `walletClient` when executing transactions |
| `pollInterval` | 4 s | How often the deposit watcher checks for new events |

Under the hood the SDK ships typed ABI and constants (chain ID 369, RPCs, vPLS token address) — nothing to configure to get started.

## Quick start

```ts
import { ReferralDepositClient, pulsechainPublicClient } from "@vouchrun/referral-sdk";
import { createWalletClient, http } from "viem";
import { pulsechain } from "viem/chains";
import { parseEther } from "viem/utils";

const referral = new ReferralDepositClient({
  publicClient: pulsechainPublicClient(),
  walletClient: createWalletClient({ account, chain: pulsechain, transport: http() }),
});

// Quote for a 100,000 PLS deposit through your code
const quote = await referral.getQuote(parseEther("100000"), yourCodeId);

// User signs the deposit; fees split atomically
const txHash = await referral.depositWithReferral({
  amountPls: parseEther("100000"),
  referrerId: yourCodeId,
  maxAcceptableFeeBps: 50n, // user accepts at most 0.5%
});

// Backend: track every deposit attributed to you
const deposits = await referral.getDeposits({ fromBlock: 23_600_000n, referrerId: yourCodeId });
```

## Learn more

- **Partner onboarding** — [step-by-step guide](https://github.com/Vouchrun/referral-sdk/blob/main/docs/ONBOARDING.md): register a code, integrate the deposit flow, and handle attribution.
- **SDK reference** — the [README](https://github.com/Vouchrun/referral-sdk) covers every API in detail.
