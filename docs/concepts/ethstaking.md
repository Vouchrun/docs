# Ethereum Staking

The Ethereum network comprises two blockchains in parallel since the Merge on September 15th, 2022: the Execution layer (formerly ETH1), which contains all of Ethereum's transaction data, and the Consensus layer (Beacon Chain), which consists of a network of validators that collectively determine the validity of each transaction and each block broadcast to the network.

Staking is the process of creating and maintaining one (or more) of these validators on the Beacon Chain to help the network maintain the consistency and security of the Ethereum blockchain. Validators do this by:

- Listening for transactions and new block proposals.
- Attesting that the proposed block contains legal, valid transactions by doing some number crunching and verification behind the scenes.
- Occasionally, proposing new blocks themselves.

To ensure the network is resilient to malicious validators who lie about the current state, each validator must lock up 32 Mil PLS as a stake in the network. They must also fulfill their duties, agree with other validators, and produce blocks to receive rewards. If they misbehave or attack the network, a certain amount of money will be deducted from their locked 32 Mil PLS.

Unlike Proof of Work (PoW), where validators must perform complex computations to receive rewards, Proof of Stake (PoS) allows validators to earn slow and steady income by correctly fulfilling their duties.

Initially, validator rewards accumulated on the beacon chain as rewards for each validator, and their operators could not receive rewards. Starting from the "Shapella" hard fork, validator rewards typically "skip over" to the execution layer address defined by the validator's withdrawal credentials.