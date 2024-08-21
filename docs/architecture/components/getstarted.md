# Get Started

ETH LSD Stack is a complex system based on Ethereum, designed to provide a comprehensive set of solutions related to Eth2.0 validator deposits, network fee management, proposal voting, and the storage and withdrawal of funds for users and nodes.

Currently, it mainly consists of three parts(SSV Client as a 4th part is optional)

## Contracts
    
Begin by deploying the contracts because other services, such as relay services and the SSV client, rely on these contract addresses and logic.
    
## LSD Relay Service
    
After deploying the contracts, you'll need to deploy the relay service. The relay service operates off-chain and requires contract addresses and events to respond correctly.
    
It provides functionality to generate related key pairs based on account private keys. It automates functions like submitting balances, updating validators, pruning blocks, syncing blocks and events, distributing withdrawals and fees, and more.
    
Configuration: Ensure that the relay service can access Ethereum nodes and the deployed contract addresses.
    
Listen to Contract Events: The relay service will listen to contract events, such as deposits, withdrawals, and votes.
    
## Ejector Service
    
Ejector service plays an important role in ETH LSD stack. Every validator should run an ejector service to properly handle the validator exiting process, as users are free to `unstake` and `withdraw`.
    
*When use our SSV client service to run validators, you don't need to run the ejector service, cause it is embedded in the SSV client service by default.*
    
## SSV Client
    
The SSV client is deployed last because it relies on the logic and data from the contracts and relay service.

Configuration: Ensure that the SSV client can access the SSV network and the deployed contracts.
    
Regular Syncing: The SSV client needs to periodically sync with the SSV network and the Ethereum chain to obtain the latest validator status.
    
Automated Tasks: Check if validators need to be brought online or offline, perform tasks related to SSV operators, fee reception, deposit responses, withdrawals, and more.