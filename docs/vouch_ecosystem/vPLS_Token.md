# vPLS Liquid Staking Token

This document is intended for users, validators and developers who want to learn more about vPLS or integrate vPLS.

## What is vPLS

Liquid Staking Tokens (LSTs) are a type of token that represents staked assets. They are issued by the Vouch Protocol and can be used for trading, borrowing, or lending on various platforms.

When a user stakes their native token using the Staking Contract, they will receive a certain amount of vPLS based on the amount of native tokens staked at the current exchange rate for the vPLS. The exchange rate for the vPLS is determined by supply and demand, and it can fluctuate over time.

As the staking rewards for the native token accumulate, the exchange rate for the vPLS will increase, and the amount of native tokens that can be redeemed will also increase.

## What is vPLS used for

LSTs can be used for a variety of purposes, including:
- **Earning staking rewards**: LSTs allow users to earn staking rewards on their tokens without having to lock them up. This means that users can still use their tokens in DeFi protocols, such as lending and borrowing, while still earning staking rewards.
- **Liquidity**: LSTs can be used to provide liquidity to DeFi protocols. This can help to improve the liquidity of these protocols and make them more attractive to users.
- **Collateral**: LSTs can be used as collateral in DeFi protocols. This allows users to borrow funds against their LSTs, which can be used to invest in other assets or to meet financial obligations.
- **Staking derivatives**: LSTs can be used to create staking derivatives. These derivatives allow users to bet on the price of staking rewards, which can be a way to generate profits from the staking market.

Overall, LSTs offer a number of benefits for users. They allow users to earn staking rewards on their tokens without having to lock them up, which provides them with more flexibility. They can also be used to provide liquidity to DeFi protocols and to create staking derivatives. As a result, LSTs are a valuable tool for users who want to participate in the staking market.

## How to get vPLS 

There are two primary ways to get vPLS.

### Use Vouch staking contract or Vouch vPLS App

You can stake your token through interacting with the Vouch staking contract directly or use the [Vouch vPLS App](https://app.vouch.run).

Upon staking your native tokens, vPLS will be minted and sent to your designated wallet address based on the amount of native tokens staked ( $Q_s$ ) and the current exchange rate for vPLS ( $C_r$ ).

> $Q_r=Q_s/C_r$

​
For example, if you stake 1.05 PLS and the current exchange rate for vPLS ( $C_r$ ) is 1.05, you will receive 1 vPLS.

::: tip
The exchange rate for vPLS ( $C_r$ ) is always greater than 1, because it represents a staked amount of token that earns rewards.
:::

### Swap vPLS on PulseX or other DEXs

vPLS can be swaped for native tokens at market exchange rates on decentralized exchanges that interate vPLS.

If arbitrage and risk-free market-making decrease, it could lead to users receiving an exchange price for vPLS that is lower than their inherent value in DEXs.

## vPLS exchange rate
The vPLS exchange rate ( $Cr$ ) is determined by a number of factors, including:
- The total amount of native token staked in the Staking Contract: $Q_{tsk}$
- The total amount of redeemed native token: $Q_{red}$
- The amount of staking rewards: $Q_{rew}$
- The amount of slash: $Q_{slh}$
- The amount of penalty: $Q_{pey}$
- The commission ratio: $R_{com}$
- The total amount of rToken minted: $M$
- The total amount of rToken burned: $N$

In general, the exchange rate is positively correlated with the staking income, which is influenced by these variables. The exact formula for calculating the vPLS exchange rate is as follows:

> $C_{i}={[\left(Q_{stk}-Q_{red}\right)+\left(Q_{rew}-Q_{slh}-Q_{pey}\right) *\left(1-R_{com}\right)]}/{(M-N)}$


The vPLS exchange rate will be determined and announced by the system based on the status of Staking Reward Claims and the occurrence of Slash events on the original blockchain. This ensures that the vPLS exchange rate accurately reflects the current state and activity of the underlying network.

::: tip
vPLS Exchange Rate Update Frequency = 12 Hours
::: 

## Risks

- **Slashing risk**: Vouch validators are required to stake a portion of their own funds as collateral, which helps to minimize the risk of loss to delegators in the event of a validator slashing event.
- **Price risk**: Vouch's withdrawal restrictions make arbitrage and risk-free market-making impossible, which could lead to users receiving an exchange price for LSTs that is lower than their inherent value. The Vouch core team and community are committed to mitigating the risks associated with using Vouch and eliminating them entirely to the extent possible.
- **Contract Security**: Vouch's staking contract code is open-sourced and audited, which helps to reduce the risk of contract failure.

