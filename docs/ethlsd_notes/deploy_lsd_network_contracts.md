# How to deploy PLS LSD stack on Holesky

This guide provides a step-by-step script to deploy the PLS LSD stack, without knowing details about contracts and services. Read the documentation for comprehensive understandings of these components.

# Step 0: Prerequisites

To create your own LSD network you have to obtain the LSDNetworkFactory address. You can pick one of the following genesis address according to the Ethereum network to deploy.

## Genesis Contracts

### Mainnet

| Contract | Address |
| --- | --- |
| LsdNetworkFactory | 0xLATEST_ADDRESS_ON_MAINNET |

### Holesky testnet

| Contract | Address |
| --- | --- |
| LsdNetworkFactory | 0xF9bB59107e293951205cDEEf8B482F48F35E5CC1 |

# Step 1: Deploying Contracts

## Option 1 (recommended): Deploying contracts by using Etherscan Read/Write Contract Feature

Learn this feature at https://info.etherscan.com/how-to-use-read-or-write-contract-features-on-etherscan/

There are 2 account roles in a LSD network, you should prepare the following accounts before advancing:

- NetworkAdmin: only one account for creating and managing the network
- Voter: at least 3 accounts recommended for voting changes from Oracle(Beacon chain) to the network on chain

Navigate to https://holesky.etherscan.io/address/0xF9bB59107e293951205cDEEf8B482F48F35E5CC1#writeProxyContract

1. Connect to your web3 wallet as a deployer
![](/image/ethlsd/01_connect_to_web3.png)

2. Submit transaction to create your own lsd network

i. Click these buttons sequentially: `Contract`, `Write as Proxy` and `createLsdNetwork`<br>
ii. Fill in the fields<br>
iii. submit the transaction<br>
iv. view the transaction you just submitted

![](/image/ethlsd/02_create_lsd_network_form.png)

3. View the transaction detail
![](/image/ethlsd/03_transaction_input_data.png)

3. View the addresses of new contracts by reading events

i. Click `Logs` button<br>
ii. Scroll to the end of the page or search `LsdNetwork`<br>
iii. Save these addresses as your own lsd network for later use

![](/image/ethlsd/04_read_new_network_contracts_addr.png)

4. View the address of new contracts by reading the contract

Click these buttons sequentially: `Contract`, `Read as Proxy` and `lsdTokensOfCreater`

`_creater` is the deployer account address

![](/image/ethlsd/05_read_contracts_created.png)

5. Twist the contract parameters

[Click here to learn the most notable parameters you may want to change](contract.html#notable-parameters)

## Option 2: Deploying contracts from source code

There are 2 account roles in a lsd network, you should prepare the following accounts before advancing:

- networkAdmin: only one account for creating and managing the network
- voter: at least 3 accounts recommended for voting changes from Oracle(Beacon chain) to the network on chain

Clone the source code

```bash
$ git clone https://github.com/stafiprotocol/eth-lsd-contracts.git
$ cd eth-lsd-contracts
$ yarn
$ cp .env-example .env
$ vim .env
```
Config environment variables

| config | description | example value |
| --- | --- | --- |
| HOLESKY_RPC_URL | execution RPC endpoint | https://holesky.stafi.io |
| NETWORK_ADMIN_PRIVATE_KEY | private key of admin account |  |
| ACCOUNT_VOTER1 | address of voter |  |
| ACCOUNT_VOTER2 | address of voter |  |
| ACCOUNT_VOTER3 | address of voter |  |
| LSD_NETWORK_FACTORY_ADDRESS | network factory address |  |

```jsx
$  npx hardhat run ./script/create_new_lsd_network.js --network holesky  
ethers version: ethers/5.7.2
network admin account address:   0xa9b8af5C53E6282fB469297091A33B08B5AC40B7
voter1 address:  0x68146ebA486CE6F8D22731c8ECB4d013F34E7114
voter2 address:  0x5b01439ab024Ba75B7B1f9c05aB55fa25e402809
voter3 address:  0xC82754C11eA7f1a901D331aaBdDf6C968044CB38
ContractLsdNetworkFactory address:       0x7EA9DE3d1885A8017E4327Af1d7Fe8926603ea91
LSDTokenAddress address:         0xd27A163B08814eaa6F5ad7B0a06e2AFBcc8807d5
FeePoolAddress address:          0xcaDDA21ab5d02556437D2210Eab97A14572F0EF4
NetworkBalancesAddress address:  0xe46B1fbc0cebD9818AB806B58cfB6979e176Ef12
NetworkProposalAddress address:  0x183fE0eDfB3bB42e96952dcA8180A1De64c19B76
NodeDepositAddress address:      0x801e3284e79a3aDA251C33f4Fc78e4BA2C77A390
UserDepositAddress address:      0x6E4Ca40069d3497dfd1E2fAB0862476002409cc9
NetworkWithdrawAddress address:  0xF4536d886f722AB8894d3A7F830ec2Bd9d950aA4
```