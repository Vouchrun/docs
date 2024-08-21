# New to LSD Stack

## Idea

LSD Stack is an open-source software suite designed to promote the public good in the realm of staking and to fully unleash the power of decentralization. It is dedicated to mainstream chains, such as Ethereum, EVM-compatible chains, Cosmos, Solana, and others. The aim of the stack is to simplify the process of running staking projects, thereby making it effortless for users.

## Landscape

The LSD Stack includes the following key elements:

- Smart contracts: responsible for handling staking logic, including validator registration, reward distribution, and withdrawals.
- Off-chain relay service: responsible for driving smart contracts and relaying data to them if needed.
- User interface application: used to make it easy for users to participate in staking realm.

LSD Stack follows the U3SE principle, which emphasizes Usability, Simplicity, Scalability, Security, and Extensibility.

## Challenges

In the design and development stages of LSD Stack, we have overcome many challenges, some of the most common ones include:

- Smart contract immutability: smart contracts cannot be modified once they are deployed, but as projects evolve, there is often a need to add new features or fix bugs. For EVM(Ethereum Virtual Machine), LSD Stack uses the ERC-1822 UUPS proxy pattern, which allows smart contracts to be upgraded while maintaining their original functionalities.
- Security risks: staking involves a lot of funds, so security risks are a major challenge for projects. LSD Stack uses a variety of security measures, including the Timelock mechanism, validator withdrawal mechanism, and merkle tree reward distribution mechanism.
- Usability: LSD Stack aims to simplify the operation of staking projects, so usability is one of the core goals of LSD Stack. LSD Stack uses a variety of designs, including the factory pattern, the trusted voter system, and the SSV client for ETH, to lower the operational threshold of staking projects.

In developing the ETH LSD Stack, we also faced the following challenges:

- Data availability: LSD Stack needs to obtain data from the execution chain and consensus layer, but due to the limitations of the Ethereum protocol, these two chains cannot directly access each other's data. LSD Stack uses a voter system to solve this problem. Voters regularly fetch data from the two chains and submit it to the smart contracts.
- Reward distribution: LSD Stack uses a merkle tree to distribute rewards. A merkle tree is a distributed data structure that can efficiently store and verify large amounts of data. LSD Stack stores reward information in the merkle tree and submits the merkle root to the smart contracts.
- Withdrawal mechanism: LSD Stack uses a withdrawal index to achieve fair withdrawals. The withdrawal index is a sequence number that records the order of each withdrawal request.
- Validator withdrawal: LSD Stack uses an ejector service to implement validator withdrawal. The ejector service monitors the balance of the withdrawal fund pool, and when the balance is insufficient, it selects a validator for withdrawal.
- Node validation: LSD Stack uses the SSV client to simplify node validation. The SSV client can automatically complete all necessary steps for node validation.
- Unified relay service: LSD Stack uses a unified relay service to improve performance. The unified relay service caches commonly used data, thereby reducing the number of communications with the execution chain and consensus layer.

## On the way to LSAAS

LSD Stack aims to be a benchmark in the liquid staking space. We will continue to work hard to improve LSD Stack and develop new features.

We will support new technologies which make staking more secure and decentralized such as DVT(Distributed Validator Technology) in Ethereum.

We will support DAO governance for project tokens to meet the different needs of projects.

We believe that LSD Stack will make a significant contribution to the development of the staking space.