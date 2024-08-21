# ETH LSD Stack

StaFi ETH LSD Stack is the simple, scalable and open-source development stack that powers ETH LST providers. Developers can launch an ETH LST based on it.

## Smart Contracts

The core part of ETH LSD Stack is a set of smart contracts, which are divided into two parts: the PlatformContract, a platform contract managed by 61 Lab, and the ProjectContracts, which belong to different projects. Platform contracts are common dependencies for all projects. Via platform contracts, developers or start-up projects can easily deploy and initialize their contract groups, distribute staking rewards.

Core contracts:

- LsdToken: an ERC-20 compatible derived token. Users receive this token when depositing ETH to UserDeposit and burn it when unstaking.
- NodeDeposit: register node and call ETH official deposit contract
- UserDeposit: a pool user deposits in, will be used by node
- NetworkProposal: voters submit proposal and execute corresponding action
- NetworkWithdraw: distribute rewards to parties

Core roles:

- Voter: privileged to propose changes to the on-chain status
- Node: an account manages its validators and receives rewards

## User Deposit Flow

UserDeposit contract manages all users deposit ETH and return LsdToken. When users deposit, it would speed up others who stuck at withdrawal stage.

`amountLsdToken = TotalSupplyLsdToken / TotalNetworkETHBalanceOfUsers * amountETH`

![User Deposit Flow](/image/userdepositflow.png 'User Deposit Flow')

## User Unstake Flow

Any LsdToken holder is a valid user, and can call NetworkWithdraw to change ETH with LsdToken. 

ETH will be transferred to user instantly if network pool has affluent balance.

![User Unstake Flow](/image/userunstakeflow.png 'User Unstake Flow')

If it does not have enough ETH for user, voters will select a batch of validators to exit, then user should call `withdraw` specifically to receive ETH when NetworkWithdraw satisfies the request.

## Node Deposit Flow

Node providers will be served by individuals or single entities who are responsible for the consistency, security, availability and activity of the validator. They will be slashed if the validator is not working as expected.

NodeDeposit contract provides interfaces for node providers to deposit and stake to register validators. According to whether ETH needed at the depositing phase, it can be separated into solo nodes and trust nodes.

The NetworkWithdraw contract will be used as `Withdrawal Credentials` when depositing in ETH official stake contract. This can ensure ETH LSD Stack maintains full custody over staking rewards.

### Solo Node

Unlike normal stakers which are required to put 32 Mil PLS up for deposit to create a new validator, for each validator solo nodes only need to deposit far less amount of ETH — the amount is specified by the project: 8, 12 or 16 ETH is common case. This will be coupled with ETH borrowed from the user deposit pool to create a new validator. 

### Trust Node

Node providers don't need to deposit any ETH and still can run a validator. All the required 32ETH deposit requirement is provided by user deposit pool.

![Node Deposit Flow](/image/trustnode.png 'Node Deposit Flow')

## Node Stake Flow

When a node calls *stake* method in NodeDeposit, the reset amount of 32 Mil PLS will be deposited to official deposit contract, node operator should run a validator and an ejector service. After the validator being activated on the Beacon chain, rewards will distribute to NetworkWithdraw automatically.

![Node Stake Flow](/image/nodestakeflow.png 'Node Stake Flow')

## Node Claim Flow

At regular intervals, voters will flag a checkpoint on the network. Currently, checkpoints occur every 24 hours(225 epoch).

At a new checkpoint, the voters will collectively create a true snapshot of the state of the node operators in the project network, which it will use to determine deposit and reward ETH for each validator provider during that interval.This information is compiled into a Merkle Tree. The Merkle Tree is built into a formatted data and hosted on the Decentralized Data Storage(DDS) such as ipfs, arweave.

Once the tree is submitted, voters will submit the merkle root of this checkpoint in NetworkWithdraw, then node providers are able to claim their rewards in ETH with proof by calling the contract.

![Node Claim Flow](/image/userdepositflow.png 'Node Claim Flow')

## Relays

Relays, the essential off-chain service component, are responsible for administrative duties required by the protocol that cannot be achieved by smart contracts due to technical limitations. They will update crucial network parameters in ETH LSD Stack smart contracts.

### Calculate network balances

At a certain interval, currently 24 hours(225 epoch), the voters will update the validator's balance to calculate network staking and fee(tip) reward, distribute it to platform, node providers, and users. Rate between LsdToken and ETH will be updated as well.

### Slash mechanism

Voter will provide a validator slash detective mechanism to measure a validator running status to decide which solo node or trust node in bad situations and carry out appropriate penalties. This part of penalties will be recycled to UserDeposit contract.

### Withdrawal Credential Match Check

There is another responsibility for voters to check node provider's *withdrawal_credentials* to ensure ETH LSD stack will successfully receive the validators' rewards so that it can distribute.

### Manage Voters

Considering voters' significant role in the whole system, the correctness and availability of voters must be guaranteed by protocol design. So we introduced voter manager role to add and remove voters when it presents dishonesty.

After initialization of the system, there will be a group of voters designated as standby voters, their accounts are stored in NetworkProposal contract. In each contract method which requires offchain data(Oracle), we will get voters' account from NetworkProposal and check whether the *msg.sender* is a voter or not. The data can be stored on chain requires 2/3 voters agreements. In the meantime, a minority of voters who submit fault data will be marked as suspicious. If they continue submitting fault data, they will be expelled.

![Voter Management](/image/managevote.png 'Voter Management')

## Node Ejector

This component is required for node providers to run with validators. Voters will select a batch of validators to enter the exit process, when user pool does not satisfy the user unstake amount.

![Node Ejector](/image/nodeenjector.png 'Node Ejector')

## DV Adapter

DV Adapter is a layer for StaFi ETH LSD Stack to integrate with DVT(distributed validator technology). Thanks to DVT providers, developers don't need to run their own validator clients. DV Adaptor can not only speed up deployment of LSD Stack but also simplify the complexity of the entire system. Currently the Stack supports SSV network, more will be supported in the future. Here we introduce the structure of SSV adapter.

There are four parts:

- Keystore manager: create validators' keystore, prepare deposit parameters and generate ssv key shares
- Operator selector: monitor ssv network and choose most favorable operators according to the price, location, performance and status
- Validator Register: register validator in SSV network with operators
- Embedded ejector service

![DV Adapter](/image/dvadapter.png 'DV Adapter')

## Alert

The LSD Alert is an off-chain program which monitors the flow of large amounts of ETH and Derivatives on the chain with notifications via Email, SMS, phone, etc.