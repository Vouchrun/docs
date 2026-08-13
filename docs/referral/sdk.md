# Referral SDK

The Vouch Referral SDK lets partner platforms earn **vPLS referral fees** when their users deposit PLS into Vouch liquid staking — with a few lines of code and no protocol changes.

It wraps the [ReferralDeposit contract](https://otter.pulsechain.com/address/0x04988E655163f7368683C9c6d668A8ccc7b142ad), which splits each deposit's freshly minted vPLS atomically: the fee portion goes straight to your payout wallet, the rest to the depositor. One transaction, funds never sit in the wrapper, and depositors always keep full control.

> **Note:** since **v0.2.0** the SDK is a full-lifecycle toolkit — in addition to referral deposits it now also covers **unstaking vPLS back to PLS** (instant and queued withdrawals) via a dedicated [`UnstakeClient`](#unstaking-vpls-→-pls), so your users can both enter and exit through your integration.

## Where to get it

The SDK is published on the npm registry and free to use (MIT).

```bash
npm install @vouchrun/referral-sdk
```

| Resource | Location |
| --- | --- |
| npm package | `@vouchrun/referral-sdk` (latest: 0.2.0) |
| SDK source & issues | [github.com/Vouchrun/referral-sdk](https://github.com/Vouchrun/referral-sdk) |
| Partner onboarding guide | [docs/ONBOARDING.md](https://github.com/Vouchrun/referral-sdk/blob/main/docs/ONBOARDING.md) |
| Deployed contract | [`0x04988E655163f7368683C9c6d668A8ccc7b142ad`](https://otter.pulsechain.com/address/0x04988E655163f7368683C9c6d668A8ccc7b142ad) on PulseChain |
| Generate Referral Code | [app.vouch.run/referral](https://app.vouch.run/referral) |

> **Note:** the contract is deployed on PulseChain **mainnet only** — there is no testnet deployment yet, so test with small real deposits (the protocol minimum is 10,000 PLS).

## What the SDK does

| Capability | API |
| --- | --- |
| Live quotes (rate, fee, receive estimate) | `getQuote()` / `quoteDeposit()` |
| Deposit with a referral code | `depositWithReferral()` |
| Register & manage your own codes | `registerReferrer()` / `updateReferrer()` / `transferReferrerOwnership()` |
| Fee attribution & reporting | `getDeposits()` / `watchDeposits()` |
| Friendly error handling | `parseReferralError()` / `isReferralError()` |
| Unstake vPLS back to PLS (v0.2.0) | `UnstakeClient` — see the [unstaking section](#unstaking-vpls-→-pls) |

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

## Quick start: deposits

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

// User signs the deposit; fees split atomically — no approvals involved
const txHash = await referral.depositWithReferral({
  amountPls: parseEther("100000"),
  referrerId: yourCodeId,
  maxAcceptableFeeBps: 50n, // user accepts at most 0.5%
});

// Backend: track every deposit attributed to you
const deposits = await referral.getDeposits({ fromBlock: 23_600_000n, referrerId: yourCodeId });
```

## Unstaking (vPLS → PLS)

A dedicated `UnstakeClient` provides the exit side of the vPLS lifecycle, wrapping the protocol's [NetworkWithdraw contract](https://otter.pulsechain.com/address/0x1F082785Ca889388Ce523BF3de6781E40b99B060): quote an unstake, burn vPLS, track the pending position, and let users claim their PLS — all against mainnet defaults.

Every unstake resolves to one of two outcomes:

```
unstake(vPLS)
   ├─ instant  → PLS returned in the same transaction
   └─ queued   → validators exit (~1–5 days) → withdraw([index]) → PLS
```

**Instant** means the UserDeposit PLS pool covered the request (the pool settles already-queued withdrawals first) — PLS comes back in the unstake transaction itself. **Queued** means validators must exit first: the assigned `withdrawIndex` sits pending until the protocol's `maxClaimableWithdrawIndex` watermark reaches it, then `withdraw([index])` pays out the PLS.

There is **no minimum unstake amount**, a user can hold **multiple pending unstakes concurrently**, and `withdraw()` batch-claims everything claimable in one transaction. Note the one difference from deposits: burning vPLS requires an ERC-20 approval — the SDK handles it automatically with **exact-amount** approvals only (never unlimited).

### Quick start: unstaking

```ts
import {
  UnstakeClient,
  pulsechainPublicClient,
  parseUnstakeReceipt,
} from "@vouchrun/referral-sdk";
import { createWalletClient, http } from "viem";
import { pulsechain } from "viem/chains";
import { parseEther } from "viem/utils";

const publicClient = pulsechainPublicClient();
const walletClient = createWalletClient({ account, chain: pulsechain, transport: http() });
const unstakeClient = new UnstakeClient({ publicClient, walletClient });

// 1. Quote — expected PLS out + an instant-vs-queued hint (read-only)
const quote = await unstakeClient.quoteUnstake(parseEther("100000"));
// { amountVpls, amountPls, rate, instant }
// quote.amountPls is the "Will Receive" estimate

// 2. Unstake — if the allowance is short, approves exactly the unstake amount
//    first (on first use: two wallet prompts — approval, then unstake)
const { approvalHash, unstakeHash } = await unstakeClient.unstakeWithApproval({
  amountVpls: parseEther("100000"),
});
if (approvalHash) await publicClient.waitForTransactionReceipt({ hash: approvalHash });
const receipt = await publicClient.waitForTransactionReceipt({ hash: unstakeHash });

// 3. Resolve the outcome from the receipt
const result = parseUnstakeReceipt(receipt);
// { instantly, withdrawIndex, plsAmount, vplsAmount }

if (result?.instantly) {
  // PLS is already in the wallet — show success with result.plsAmount
} else if (result) {
  // Queued — start waiting AFTER the unstake receipt, then claim
  await unstakeClient.waitForClaimable({
    user: account.address,
    index: result.withdrawIndex,
    timeoutMs: 7 * 24 * 60 * 60 * 1000, // optional — rejects with CLAIM_TIMEOUT
  });
  // 4. Claim — or omit `indexes` to batch-claim everything claimable
  await unstakeClient.withdraw({ indexes: [result.withdrawIndex] }); // → PLS in wallet
}
```

### Tracking pending withdrawals

`getWithdrawalState(user)` is the single source for an **"Overall / Withdrawable"** panel — the same data the Vouch app renders:

```ts
const state = await unstakeClient.getWithdrawalState(userAddress);
// {
//   user,
//   items: [{ index, amountPls, claimable }],  // one entry per pending unstake
//   overallPls,        // "Overall"      — total pending PLS
//   claimablePls,      // "Withdrawable" — sum of claimable items
//   claimableIndexes,  // pass straight to withdraw()
// }
```

| `WithdrawalState` field | Type | Maps to |
| --- | --- | --- |
| `items` | `{ index, amountPls, claimable }[]` | Row per pending unstake (`claimable` = `index <= maxClaimableWithdrawIndex`) |
| `overallPls` | `bigint` | "Overall" — total PLS pending |
| `claimablePls` | `bigint` | "Withdrawable" — PLS ready to claim now |
| `claimableIndexes` | `bigint[]` | Ready-made argument for `withdraw()` |

For live UIs:

- `watchWithdrawalState({ user, onUpdate, onError })` polls every **12 seconds** by default (`pollIntervalMs` to tune; the first tick fires immediately). It returns an **unsubscribe function — call it when your component unmounts**.
- `waitForClaimable({ user, index, timeoutMs? })` is the promise-style version for one-shot flows: it resolves the moment that index turns claimable.
- Start any watcher or `waitForClaimable` **after** the unstake receipt — before inclusion the `withdrawIndex` does not exist on-chain.
- Re-query `getWithdrawalState(user)` after **any** unstake or withdraw receipt before re-rendering totals — chain state is the source of truth.

```ts
const unwatch = unstakeClient.watchWithdrawalState({
  user: userAddress,
  onUpdate: (s) => renderWithdrawalPanel(s.overallPls, s.claimablePls),
});
// ...later, on unmount:
unwatch();
```

### Error handling

The unstake side mirrors the deposit SDK's error model. `UnstakePreflightError` is thrown **before any gas is spent**:

| `UnstakePreflightError.code` | Trigger |
| --- | --- |
| `AMOUNT_ZERO` | Empty or zero unstake amount |
| `INSUFFICIENT_VPLS_BALANCE` | Amount exceeds the user's vPLS balance |
| `INSUFFICIENT_ALLOWANCE` | Raw `unstake()` called without enough approval (use `unstakeWithApproval`) |
| `NOTHING_CLAIMABLE` | `withdraw()` with nothing ready to claim |
| `INDEX_NOT_CLAIMABLE` | Explicit index not yet at the claim watermark |

On-chain reverts from NetworkWithdraw decode with `parseUnstakeError` / `isUnstakeError` — the 8 contract errors are `LsdTokenAmountZero`, `EthAmountZero`, `WithdrawIndexEmpty`, `NotClaimable`, `AlreadyClaimed`, `FailedToCall`, `BalanceNotEnough`, `CallerNotAllowed`. And `waitForClaimable` rejects with a `CLAIM_TIMEOUT` `ReferralSdkError` once `timeoutMs` elapses.

```ts
import { isUnstakeError, UnstakePreflightError } from "@vouchrun/referral-sdk";

try {
  await unstakeClient.withdraw({}); // claim everything claimable
} catch (err) {
  if (err instanceof UnstakePreflightError && err.code === "NOTHING_CLAIMABLE") {
    // still queued — validators haven't exited yet
  }
  if (isUnstakeError(err, "NotClaimable")) {
    // the claim watermark hasn't reached the index
  }
}
```

### Caveats

- **`quote.instant` is a snapshot, not a guarantee** — liquidity can change between the quote and transaction inclusion. Treat it as UI guidance; the truth is `parseUnstakeReceipt` on the receipt.
- **Approvals are exact-amount** — the SDK never requests unlimited vPLS approvals (matches the Vouch app).
- **The `Withdraw` event has no amount field** — read amounts from `getWithdrawalState()` before claiming, or compare PLS balances across the claim.
- **Multiple concurrent pending unstakes are supported** — each gets its own `withdrawIndex`; `withdraw()` with no arguments batch-claims all claimable ones.
- **No minimum unstake amount** — unlike deposits (10,000 PLS minimum), any vPLS amount can be unstaked.

## Learn more

- **Partner onboarding** — [step-by-step guide](https://github.com/Vouchrun/referral-sdk/blob/main/docs/ONBOARDING.md): register a code, integrate the deposit flow, handle attribution, and render the unstake/withdrawal UI (§5).
- **SDK reference** — the [README](https://github.com/Vouchrun/referral-sdk) covers every API in detail, including the [`UnstakeClient` method tables](https://github.com/Vouchrun/referral-sdk#unstakeclient).
