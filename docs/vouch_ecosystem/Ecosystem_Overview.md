# The Vouch Ecosystem

## Overview
The Vouch Ecosystem can be broadly defined as a set of protcols which make up a Liquid Staking Protocol with a Governance layer. 

Short on time, watch this [video](https://youtu.be/oRMzRxW6I8g) which takes you through the the Vouch Ecosystem in 10mins.

@[youtube](oRMzRxW6I8g?si=50msvijataCx_KNy&amp;controls=1&amp;start=0&amp;rel=0)


## Ecosystem Components
The ecosystem can be broken down into these parts.

[1. Liquid Staking Derivative Protcol](/docs/vouch_ecosystem/vouch_lsd.html) and assoicated contracts and services.

[2. VOUCH Token & Distribution Layer](/docs/vouch_ecosystem/VOUCH_Distributor.html) contracts and services.

[3. Vouch DAO Governance Protocol](/docs/vouch_ecosystem/Vouch_DAO.html) comprising Staking, Delegation and Voting

![Vouch Ecosystem](/image/VouchEcosystem.png 'Vouch Ecosystem')

## System Yield

The Vouch ecosystem produces real yield from two primary sources; Vouch Validator fees and VOUCH token Fees from buys, sells and transfers:


### Vouch Validators 
Vouch Validators provide security on the Pulsechain network and in return for these services they recieve rewards and priority fees in the form of PLS. These rewards and fees are distributed within the ecosystem to reward the partcipants of the system.

In Vouch there are two *Primary* types of Validators:
    
`1 - Solo Validators` These permissionless validators are required to stake 12Mil PLS, and they pull the remainning 20 Million PLS stake from the PLS Pool supplied by PLS stakers. In return the node operators take a percentage of the total rewards produced, plus they earn the going pulsechain rate on the 12Mili stake they have supplied. Stakers also get thier share of the rewards.

`2 - Trusted Validators` These special permissioned validators are not required to stake any PLS, instead they pull all the required 32 Million PLS stake from the PLS Pool supplied by PLS stakers. In return the node operators take a small percentage of the total rewards produced and the Stakers get their share of the rewards.

`Community Validators` This is an introduced concept which makes use of the Solo Validator provisions above, however the 12Mil stake required is sourced from yield produced in the ecosystem to grow a network of community owned validators that can continue to return rewards and fees to the ecosystem indefinitely.

### VOUCH Token 
VOUCH Token fees are collected from evey Buy, Sell or Transfer of the VOUCH token. Like the rewards and priority fees above, these fees are distributed within the ecosystem to grow the community validators and reward the partcipants of the system.  

For more information on how the Yield is distibuted in the ecosystem refer to [VOUCH Token & Distribution Layer](/docs/vouch_ecosystem/VOUCH_Distributor.html)


## Phases & Status 
Each component of the Vouch Ecosystem will be rolled out in phases once the required develeopment, testing and auditing is complete.

### Phase 1 - LSD Protocol (Live on Pulsechain Mainnet)
Vouch Liquid Staking is operational on Pulsechain Mainnet as of Oct 2024 and forms the core of the ecosystem. The protocol is comprised of a number of smart contracts and supporting services which allow users to stake PLS and recieve the vPLS Liquid Staking Token. This PLS is "put to work" by Vouch validators. The stakers and Validators benefit from the PLS rewards recieved by validating for the Pulsechain network. 

Read more about the [Vouch LSD Protocol](/docs/vouch_ecosystem/vouch_lsd.html) here.

### Phase 2 - VOUCH Token & Distribution Layer (Final Testing in Progress)
VOUCH Token is the platform's second token which acts as the foundation for the governance layer in the future. VOUCH holders will be able to particpate in the future decision making of the entire ecosystem. As part of this phase a number of supporting contracts manage the flow of yield coming into the ecosystem and route the incoming PLS to the benefit of the ecosystems particpants. This is acheived using the DAO Distribution Layer which is comprised of a number of smart contracts.

Read more about the [VOUCH Token & Distribution Layer](/docs/vouch_ecosystem/VOUCH_Distributor.html) here.

### Phase 3 - Vouch DAO (Intial Development Stage)

Read more about the [Vouch DAO](/docs/vouch_ecosystem/Vouch_DAO.html) here.