# Referral Widget

The Vouch Referral Widget lets any website offer **PLS staking with your referral code** — no code required, just an iframe. Your visitors connect their wallet, deposit PLS into Vouch liquid staking, and your referral fee is split out atomically by the [ReferralDeposit contract](https://otter.pulsechain.com/address/0x04988E655163f7368683C9c6d668A8ccc7b142ad).

It's a ready-made, Vouch-branded UI built on the [Referral SDK](/docs/referral/sdk) — so you get live quotes, fee disclosure, and wrong-network handling without writing a line of JavaScript.

## Live example

This is the actual widget, embedded with the snippet shown below (referral code #3, dark theme):

<iframe
  src="https://refwidget.vouch.run/?ref=3&theme=dark"
  width="420"
  height="500"
  style="border: 0; border-radius: 30px; display: block; margin: 24px auto;"
  allow="clipboard-write"
></iframe>

## Where to get it

| Resource | Location |
| --- | --- |
| Widget host | [refwidget.vouch.run](https://refwidget.vouch.run) |
| Configurator (customize + snippet generator) | [refwidget.vouch.run/config.html](https://refwidget.vouch.run/config.html) |
| Widget source & issues | [github.com/Vouchrun/ref-widget](https://github.com/Vouchrun/ref-widget) |
| Embed guide | [docs/EMBED.md](https://github.com/Vouchrun/ref-widget/blob/main/docs/EMBED.md) |
| Deployed contract | [`0x04988E655163f7368683C9c6d668A8ccc7b142ad`](https://otter.pulsechain.com/address/0x04988E655163f7368683C9c6d668A8ccc7b142ad) on PulseChain |
| Generate Referral Code | [app.vouch.run/referral](https://app.vouch.run/referral) |

> **Note:** the contract is deployed on PulseChain **mainnet only** — there is no testnet deployment yet, so test with small real deposits (the protocol minimum is 10,000 PLS).

## Embedding

Drop this snippet into any web page — WordPress, static HTML, React, anything that renders an iframe:

```html
<iframe
  src="https://refwidget.vouch.run/?ref=YOUR_CODE_ID"
  width="420"
  height="500"
  style="border: 0; border-radius: 30px;"
  allow="clipboard-write"
></iframe>
```

Replace `YOUR_CODE_ID` with your referral code ID. Don't have one yet? [Generate a referral code](https://app.vouch.run/referral) from the Vouch app.

The easiest way to build a customized snippet is the **[Widget Configurator](https://refwidget.vouch.run/config.html)** — pick your code, theme, and colors, then copy the generated code.

## URL parameters

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| `ref` | number | — | Referral code ID. If omitted, the user enters a code manually. |
| `theme` | `dark` / `light` | `dark` | Vouch color theme (matches app.vouch.run). |
| `accent` | hex color | Vouch orange | Button color override (e.g. `%237c3aed`). |
| `border` | hex color | `#333333` dark / `#E2E0D0` light | Widget card border color override. |

Hex values must be URL-encoded (`#` → `%23`). Invalid values are ignored and the Vouch theme defaults apply.

The **Vouch logo and "Powered by Vouch" branding always remain** — the widget carries Vouch branding regardless of color customization.

## Embed size

Set the iframe `width` / `height` to fit your layout. Recommended range: **320–800px** wide, **480–900px** tall (default 420×500). The widget scales to fill the iframe.

## What your users see

1. **Connect wallet** — MetaMask, Rabby, or WalletConnect (mobile supported)
2. **Review the fee** — your referral fee is shown up-front before they deposit
3. **Deposit PLS** — live quote shows exactly how much vPLS they'll receive and the fee amount
4. **Done** — one transaction; the fee goes straight to your payout wallet, vPLS to them

The fee is taken from the freshly minted vPLS, never from the user's deposit, and the widget prompts users to switch to PulseChain (chain ID 369) if they're on the wrong network.

## Learn more

- **Configurator** — [refwidget.vouch.run/config.html](https://refwidget.vouch.run/config.html): customize and copy your snippet with live preview
- **Embed guide** — [docs/EMBED.md](https://github.com/Vouchrun/ref-widget/blob/main/docs/EMBED.md) in the widget repo
- **Referral SDK** — [build your own custom UI](/docs/referral/sdk) with the underlying TypeScript SDK
- **Partner onboarding** — [step-by-step guide](https://github.com/Vouchrun/referral-sdk/blob/main/docs/ONBOARDING.md) covering codes, fees, and attribution
