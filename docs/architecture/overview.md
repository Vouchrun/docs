# Overview

> Reminder: This Stack is updating accordingly in a timely manner.

StaFi LSD Stack is a package of Development Kits(DKs) that support the construction of LSD in Layer1s. The DKs consists of Application DK(ADK) and Chain DK(CDK), ADK is mainly built for launching a LST in the contract layer of a chain, and CDK is used to build a chain module that enables a chain to issue a LST natively. Both solutions include a backend and a frontend, the frontend is built for the interactions, the backend includes contracts and services.

## Application Development Kit(ADK)

The ADK module enables developers to launch a LST upon in the contract layer of a chain, it is contract based, now it can support to issue [ETH LST](/docs/architecture/components/getstarted.html), [EVM LST](/docs/develop_evm_lsd/getstarted.html) and [Cosmos LST](/docs/develop_cosmos_lsd/getstarted.html) and other VM LSTs in the chain. In the ecosystem, LSTs have more abundant interoperability and composability with the projects that also built upon the chain. These solutions are different based on the chain structure, developers can review details in the following parts.

## Chain Development Kit(CDK)

The CDK is a builtin module that enables a chain to release its own LST natively, it is chain based. The StaFi LSD pallet is one of an example and it is a builtin module of the Substrate framework, independent chain that bases on the Substrate can merge the pallet and release a LST in their blockchains.

## Architecture

In general, the architecture is vary and depends on the PoS mechanisms of the target chain, StaFi LSD Stack keeps abstracting the mutual features to generalize the expression of ADK and CDK. Some abstracted features form module to facilitate the upgradability of the LSTs, the below shows some key modules of the ADKs.

> Not all the modules a good fit for all ADKs and CDKs, further details can reviewed in the specifics and note that the Stack now more focuses on the development of ADKs, feel free to reach out and discuss your thought about CDKs.

### Staking Contracts Framework

The Staking Contracts Framework is a robust and efficient contract framework that facilitates the effortless creation and deployment of staking pool contracts. Leveraging this framework, developers can swiftly build and deploy staking pool contracts with minimal exertion and within a prompt timeline.

### Relay

Relay typically acts as a trigger role, it invokes smart contracts periodically. But for some chains such as Ethereum, relay has additional work to do. It synchronizes data from off-chain sources to on-chain, enabling developers to easily build applications for accuracy LST rates, validator status and other data synchronization use cases.

### Router

Router is customized for Ethereum, it is a comprehensive and decentralized validator management service that seamlessly integrates DVT(Distributed Validator Technology), such as SSV, Obol, and other technology that improve the decentralization of staking. This service empowers developers to effortlessly build and deploy a decentralized validator management system, simplifying and streamlining the validator management process.

### Front

Front is a module that enables page and component-level development, allowing for the direct generation of front-end pages for LSD Web or the embedding of components into corresponding pages.
