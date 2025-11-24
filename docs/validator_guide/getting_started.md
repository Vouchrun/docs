# Vouch Pulsechain Validators

## Introduction

The Vouch protocol supports two types of validators: solo validators and trusted validators. Solo validators are permissionless, which means that anyone can deposit 12Mil PLS and run a node to become a solo validator. The principle of running either a Solo Validator or a Trusted Validator are the same from a technical configuration point of view.

**The comparison between Solo Validator and Trusted Validator:**

| Type | PLS Self-deposited | PLS Allocation from Pool | Permission |
| :------------ | :---------: | :---------: | :---------: |
| Solo Validator | 12Mil PLS | 20Mil PLS | Permissionless |
| Trusted Validator | 0 PLS | 32Mil PLS | Permissioned |

::: warning What is the maximum number validators I can run?

In short you can run as many as you wish, however;

When running validators in Vouch you can deposit and stake multiple
Validators from the same deposit address (i.e. Connected Account).
In Vouch we call this the "Node Addr". It is `strongly advised to NOT  
exceed 300 pubkeys per connected account`, while this is a soft limit, 
for security and performance reasons you should use muliple connected
accounts if you intend on running more than 300 validators.
:::

## How to become a solo validator

To particapte as a solo validator requires an assumed knowledge of how to technically run a Pulsechain validator in the traditional sense. You can break this down into these core compentencies:
1. Hardware Requirements - either self hosted or remote (clould/rack space)
2. Technical knowlege of running Pulsechain clients e.g. Geth/Erigon, Lighthouse/Prysim
3. Having enough PLS to depoist your stake

Where becoming a Vouch Solo Validator differs, is primarly on point 3, in that the Vouch protocol allows validators to put up less of a stake, and be matched with the remaining stake from the User Pool of PLS deposited by users of the Protocol's Liquid Staking Token vPLS, in the case of a Solo Validator on Vouch this is 12Mil PLS, not the traditional 32Mil PLS.

>[!IMPORTANT]
> When running a validator on the Vouch Ecosystem you MUST:
> 1. Set [suggested-fee-recipient](/docs/validator_guide/pulse-staking-deposit-cli.html#setting-your-suggested-fee-recipient) correctly when running your Validator Client.
> 2. Run the [Ejector Client](/docs/validator_guide/ejector_client) to ensure orderly exits of Validators happen when requried. 



The remainder of this Validator Staking Guide, will assume the operator of the validator has the above technical knowledge and hardware requriments to run a validator. If you would like more information on running a Pulsechain Validator the below resouces are a great place to start:

### Pulsechain Validator Resources

**[Official Pulsechain Gitlab](https://gitlab.com/pulsechaincom)** - Repository of all the software for running validator nodes: 


**[Gamma's Site](https://www.g4mm4.io)** - Great resouce for Pulsechain Networks Settings and include a validator setup guide:

 

**[Dipslayer Setup Scripts](https://github.com/tdslaine/install_pulse_node)** - The best scripted (menu driven) setup guide for installing and managing Pulsechain validators:


### Recommended Min Hardware Requirements
| Resouce | Recomended Specs | Notes |
| :------------ | :---------: | :---------: |
| Disk Storage | 2TB | SSD or NVMe (disk intensive)
| RAM | 16GB | Highspeed | 
| CPU | Intel Core i5 or better | Not too CPU intensive  |
| Internet | 40Mb/20Mb | "large quota" quality connection