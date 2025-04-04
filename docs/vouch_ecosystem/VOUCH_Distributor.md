# VOUCH and DAO Distirbutor Layer

::: warning 
Settings and values are preliminary and subject to change prior to launch of VOUCH token. 
:::

With the introduction of [VOUCH Token](/docs/vouch_ecosystem/VOUCH_Token.html), new yield streams are introduced into the Vouch Ecosystem. To incorporate these new streams, a distribution layer (set of contracts) is required to route the ecosystems yield to the various particpants and services of the system. 

Before delving into the distribution allocation settings it pays to understand some of the Fee settings in the ecosystem.


## Protocol Fee Settings

The below Fee settings are how Node operators and the Treasury are compensated for their efforts. These fees are taken from the Rewards and Fees (not users staked PLS principle) which Vouch Validators are earning directly from Pulsechain's reward emissions. The remainder of the Rewards are passed to the PLS stakers holding the [vPLS token](/docs/vouch_ecosystem/vPLS_Token.html).

Vouch LSD Fee Settings | Rate/Setting | Note|
|--|:--:|--|
Node (Validator) Reward Fee | 6% | Node Operators Reward
Platform Fee | 5% | DAO Treasury Address
Protocol Fee | 10% | Percentage of Platform Fee i.e. 10% of 5% 

In additon to the above Validator earned Rewards, the Vouch token has the ability to enable the collection of fees on any buy, sell or transfer transactions. These setting are configured as below, and the fees generated will be injected into the Distribution Layer of the ecosystem along with the Validator Rewards and Priorty Fees.

|VOUCH Token Fee Setting | Value | Note|
|--|:--:|--|
VOUCH Buy Fee | 5% | Configurable setting of 0-10%
VOUCH Sell Fee | 5% | Configurable setting of 0-10%
VOUCH TX Fee | True | When set Buy Fee applys to transfers


## Distribution Layer Diagram

The below diagram provides a high level overview of where yield stream are directed within the Vouch Ecosystem. Each of the hightlighted areas are explained further in the corresponding section below the diagram.

![Vouch Distributor](/image/VouchDistributor.png 'Vouch Distributor')



## 1 - PLS Yield Streams

As can be seen below the ecosystem collects yield from Validator Rewards, Validator Priorty Fees and Token Fees. These fees are redirected to the DAO Distributor unless otherwise noted.

PLS Yield Settings | Rate/Setting | Note|
|--|:--:|--|
Trusted Validator Reward Fee (no Rewards issued)| 0% | Stays with Node Operators to cover costs|
Community Validator Reward Fee and Rewards | 100% | Sent to `DAO Distributor` 
Validator Priorty Fees | 100% | Priorty Fee Address set to `DAO Distributor`
Token Fees | 100% | Sent to `DAO Distributor`



## 2 - DAO Distributor Settings (intial settings)

PLS yield streams are received from the Vouch LSD protocol and VOUCH token fees, and are then routed within the Vouch Ecosystem based on the below configurable settings. DAO particpants will be able to vote on how and where these fees are routed once the DAO is operational.

`DAO Distributor`
|DAO Distributor Distribution Settings | Allocation(%) | Note |
|--|:--:|--|
Liquidity Pools (PLS) | 10% | Liquidty on vPLS & VOUCH pairs
Master Validator Account (PLS)  | 35% |Funds Community Validators Growth
Fee Pool (PLS)   | 20% | Vouch LSD Protocol Pool for vPLS Holders and Validators
SAFU (PLS)   | 1.75% | Safety Fund
DAO Treasury (PLS)   | 5% | DAO Treasury Address
Voters (PLS)  | 0.25% | Funds Gas for Relay Services
**`VOUCH Rewards Distributor`** | 33% | See VOUCH Reward Distribution Table |
**`vPLS Rewards Distributor`** | 0% | See vPLS Reward Distribution Table  |
**`PLS Rewards Distributor`** | 0% | See PLS Reward Distribution Table  |


### Distributor Layer Flow Digram (example figures)
![Distributor Flow Digram](/image/DAO_Distribution.png 'Distributor Flow Digram')

## 3 - Rewards Distributor Settings (intial settings)

PLS yield streams are received from the DAO Distributor into the Rewards Distributors. If required PLS is converted to VOUCH (swap) or vPLS (mint), and the streams are redirected to the following particpants of the Vouch Ecosystem.

**`VOUCH Rewards Distributor`**
|VOUCH Rewards Distributions | Sub-Allocation(%)| Total Allcoation(%)| Note|
|--|:--:|:--:|--|
VOUCH Holders  | 0% | 0%| Current VOUCH Holders 
Validators  | 0% |  0%|Node Operators
Voters  | 0% |  0%| Relay Operators
Stakers  | 0% |  0%| VOUCH Stakers
Burn  | 100% | 33%| Sent to `0xDEAD` address - Total Supply Reduced


**`vPLS Rewards Distributor`**
|vPLS Rewards Distributions | Sub-Allocation(%)| Total Allcoation(%)| Note|
|--|:--:|:--:|--|
VOUCH Holders  | 50% | 0%| Current VOUCH Holders 
Validators  | 50% |  0%|Node Operators
Voters  | 0% |  0%| Relay Operators
Stakers  | 0% |  0%| VOUCH Stakers
Burn  | 0% | 0%| Sent to `0xDEAD` address - Total Supply Reduced

**`PLS Rewards Distributor`**
|PLS Rewards Distributions | Sub-Allocation(%)| Total Allcoation(%)| Note|
|--|:--:|:--:|--|
VOUCH Holders  | 0% | 0%| Current VOUCH Holders 
Validators  | 0% |  0%|Node Operators
Voters  | 0% |  0%| Relay Operators
Stakers  | 0% |  0%| VOUCH Stakers
Burn  | 0% | 0%| Sent to `0x00000` address