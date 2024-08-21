# Contract
&nbsp;

# LsdNetworkFactory.sol

An utility contract for launching new LSD networks with ease. Instead of deploying multiple contracts manually, you can just call `createLsdNetwork()` or `createLsdNetworkWithTimelock()` to deploy your own LSD network.

`createLsdNetwork()`
create a new LSD network with admin and voters

It is a straightforward setup, full control over the network with a specified admin address, but lacks the security layer of timelock mechanism.

`event LsdNetwork()` will be emitted with the following struct, `NetworkContracts`.

**Parameters**:

- Provide the desired name and symbol for your LSD token.
- Specify the network administrator's address.
- List the addresses of the voters.
- Set the voting threshold, i.e., the minimum number of votes required to approve a proposal.

```solidity
function createLsdNetwork(
    string memory _lsdTokenName,
    string memory _lsdTokenSymbol,
    address _networkAdmin,
    address[] memory _voters,
    uint256 _threshold
)

struct NetworkContracts {
    address _feePool;
    address _networkBalances;
    address _networkProposal;
    address _nodeDeposit;
    address _userDeposit;
    address _networkWithdraw;
    address _lsdToken;
    uint256 _block;
}
```

`createLsdNetworkWithEntrustedVoters()`: create a new LSD network with admin and entrusted voters

All functionality is as same as `createLsdNetwork`, but no voters is needed. Stack provides entrusted voters who are creditable for every LSD network to choose. It's a good start point for startup project parties, and they are free to set their own voters.

**Parameters**:

- Provide the desired name and symbol for your LSD token.
- Specify the network administrator's address.

```solidity
function createLsdNetworkWithEntrustedVoters(
    string memory _lsdTokenName,
    string memory _lsdTokenSymbol,
    address _networkAdmin
)
```

`createLsdNetworkWithTimelock()`: create a new LSD network with `Timelock` admin

All functionality is as same as `createLsdNetwork` with TimeLock enabled. Changes and proposals will have a delay before they can be executed, preventing malicious activities, moreover it allows for a more decentralized setup with multiple proposers.

`createLsdNetworkWithLsdToken()`: create a new LSD network with specified Lsd Token

This function gives platforms more flexibility to create their preferred flavor of LSD network. To prevent malicious LsdToken which may be harmful to the users, we introduce `authorizedLsdToken` concept, so only authorized LsdToken can be used.

`addAuthorizedLsdToken()`: authorize a new LsdToken contract

**Parameters**:

- Provide the desired name and symbol for your LSD token.
- List the addresses of the voters.
- Set the voting threshold.
- Define the minimum delay for the timelock.
- Specify the proposer addresses.

```solidity
function createLsdNetworkWithTimelock(
    string memory _lsdTokenName,
    string memory _lsdTokenSymbol,
    address[] memory _voters,
    uint256 _threshold,
    uint256 _minDelay,
    address[] memory _proposers
)
```

`lsdTokensOfCreater()`: retrieve all LSD tokens created by the creator

```solidity
lsdTokensOfCreater(address _creater) public view returns (address[] memory)
```

# LsdToken.sol

An ERC20-compatible token used to store and manage LSD Tokens. When users deposit ETH they will receive equivalent LSD tokens(rToken) in return.

# NetworkBalances.sol

Manages deposits for nodes and users.

Real-time tracking of critical balances in the network, related to actions such as proposals, deposits, and withdrawals.

`rateChangeLimit`:
- This parameter defines the limit for exchange rate changes from ETH to lsdToken.
- In the submitBalances function, when a new balance is provided, the contract calculates the change between the new exchange rate and the old exchange rate. If this change exceeds the limit set by rateChangeLimit, the submitted balance update will be rejected and an exception RateChangeOverLimit will be thrown.
- In the initialization init function, rateChangeLimit is set to 11e14, which represents a 0.0011 or 0.11% change. In other words, if the difference between the new exchange rate and the old exchange rate is more than 0.11%, the update of the balance will be considered invalid.
- default 11e14(0.0011)
- Call function `setRateChangeLimit(uint256)` to update
  
`updateBalancesEpochs`:
- Related to the frequency or cycle of updating the balance
- default 225 (roughly 24 hours)
- Call function `setUpdateBalancesEpochs(uint256)` to update

# NetworkProposal.sol

Allows specific participants or contracts to submit network-related proposals.

Provides a complete proposal voting mechanism, allowing specific network participants to vote on these proposals.

- `admin`:
  - an account who is entitled to upgrade the implementation of the contract and update its parameters
- `voters`
  - a list of voter who acts as a trust node to update state of the contracts:
  - NetworkBalances.submitBalances()
  - NetworkWithdraw.distribute()
  - NetworkWithdraw.notifyValidatorExit()
  - NetworkWithdraw.setMerkleRoot()
  - NodeDeposit.voteWithdrawCredentials()
- `threshold`
  - the minimum number of votes required to authorize a transaction. it must greater or equal to `(voters.length() + 1) / 2`

# NodeDeposit.sol

Manages deposit logic related to Eth2.0 validators.

- `soloNodeDepositEnabled`: This is a boolean variable that, when set to `true`, allows individual nodes to make a deposit. If it's set to `false`, individual nodes will not be able to deposit. In the provided code, it is initialized to `true`, meaning solo node deposits are initially enabled.
- `trustNodeDepositEnabled`: Similar to the above, this boolean variable controls whether trusted nodes can make deposits. If it's `true`, trusted nodes are allowed to deposit, while if it's `false`, they are not.
- `trustNodePubkeyNumberLimit`: This is a numerical value that specifies the maximum number of public keys a trusted node can have. It's set to `100`, meaning a trusted node can have up to 100 associated public keys.

These parameters help govern the behavior of the contract regarding depositing actions by solo and trusted nodes. They can be adjusted by the contract's administrator(s) to control the deposit functionality and limit the number of public keys associated with a trusted node.

**NodeDeposit Methods**:

We need to add a trust node. This is done by invoking the `addTrustNode` method in the `NodeDeposit` contract.

```solidity
addTrustNode(address _trustNodeAddress) external onlyAdmin
```

The trust node wallet address you add will also be the one configured in the SSV client later on. To locate the `NodeDeposit` contract address, refer to the `LsdNetwork` event from the `createLsdNetwork` transaction. This event logs the following data:

# UserDeposit.sol

Allows ordinary users to deposit ETH and receive corresponding LSD Tokens.

`minDeposit` - The minimum amount user can deposit into, admin is able to change the value by calling function `setMinDeposit(uint256)`.

# NetworkWithdraw.sol

Manages all logic related to network withdrawals.

Allows users and nodes to withdraw their LSD Tokens or ETH from the system.

- `withdrawCycleSeconds`: This parameter defines the length of a withdrawal cycle in seconds. It's set to `86400` seconds, which equates to 24 hours, meaning each withdrawal cycle lasts for a day.
- `platformCommissionRate`: This parameter defines the commission rate for the platform. The value here is set to `1e17`, which is 0.1 or 10% (since 1 ether in Solidity is represented as 1e18). This means that 10% of the amount being withdrawn is taken as a commission for the platform.
- `factoryCommissionRate`: This parameter defines the commission rate for the factory. The value here, like `platformCommissionRate`, is `1e17`, indicating that the factory also takes a 10% commission.
- `nextWithdrawIndex`: This parameter defines the index number for the next withdrawal. The initial value here is `1`, meaning the index number for the next withdrawal starts from 1.

These parameters are set during the initialization phase (in the `init` function) of the contract and may be modified during its subsequent operation. They primarily serve to control and limit the withdrawal behavior within the contract, ensuring that both users and the entire system do not exceed predefined limits during each cycle. Additionally, commission rates are set so that the appropriate amounts can be deducted as commissions during withdrawals.

# FeePool.sol

A contract to receive `priority fee`(tip) when your validators pack new blocks. Contract `NetworkWithdraw` will distribute the balance to the parties: the factory and the platform.

# Timelock.sol

It acts as a time-locked controller. When set as the owner of the ownable smart contract, it enforces a time lock on all `onlyOwner` maintenance operations. This provides users of the controlled contract with time to exit before potentially dangerous maintenance operations are applied.

`Timelock` is a tool that provides time-locking functionality for smart contracts. It ensures that critical operations (such as contract upgrades or parameter changes) have a predetermined waiting period before execution, giving users ample time to respond. This increases the transparency and security of the contract, as users can take action before potential adverse changes take effect.

The `Timelock` contract inherits from the `TimelockController` contract and utilizes the constructor of the `TimelockController`. Here are the parameters of the `TimelockController` constructor and their purposes:

- **`minDelay`**:
    - Type: `uint256`
    - Purpose: Represents the minimum delay (in seconds) required for an operation to become executable after it has been proposed. This ensures that there's ample time for users or other stakeholders of the contract to react before a potentially harmful operation gets executed.
- **`proposers`**:
    - Type: `address[] memory`
    - Purpose: This is an array of addresses that will be granted the proposer (`PROPOSER_ROLE`) and canceller (`CANCELLER_ROLE`) roles. Proposers can propose new operations, while cancellers can cancel operations that haven't been executed yet.
- **`executors`**:
    - Type: `address[] memory`
    - Purpose: This is an array of addresses that will be granted the executor (`EXECUTOR_ROLE`) role. Executors can execute operations that have passed their delay period.
- **`admin`**:
    - Type: `address`
    - Purpose: This is an optional address that will be granted the admin (`TIMELOCK_ADMIN_ROLE`) role. The admin can change role permissions and other advanced settings. If set to a non-zero address, this address will have admin privileges. However, for security reasons, it's recommended to renounce this role after contract deployment, ensuring all administrative tasks must go through the timelock process

# Notable Parameters

Platforms inevitably have their own parameters. We've compiled a list of the most significant ones that you might consider adjusting.

|  config | description  | recommended value |
|---|---|---|
| <br>**NetworkProposal contract**<br><br> | | |
| address admin    | an account who administrate the whole network | we suggest platform use multi-sig account for security reason |
| <br>**NetworkBalances contract**<br><br> | | |
| uint256 updateBalancesEpochs             | a period of time in epoch determines how frequent voters calculate and submit new balances | 225 (equivalent to 24 hours), min value is 75(not recommended as its worthless)  |
| uint256 rateChangeLimit      | a number represents the numerator in rate and the denominator is 1e18.<br>the exchange rate between ETH and LsdToken is vital for the system, to prevent accidental or violent changes, we introduce `rateChangeLimit` to keep the system safe | default is 11e14 (=0.11%) |
| <br>**NetworkWithdraw contract**<br><br> |  |   |
| uint256 withdrawCycleSeconds     | a period of time in second determines how long a cycle last  | 86400 (equivalent to 24 hours), min value is 28800(not recommended as its worthless)  |
| uint256<br>nodeCommissionRate       | a number represents the numerator in rate and the denominator is 1e18.<br>this value configures the proportion of the node rewards | 5e16 (denotes 5e16/1e18=5%)<br>(node commission = <br>total rewards * 5%)  |
| uint256<br>platformCommissionRate   | a number represents the numerator in rate and the denominator is 1e18.<br>this value configures the proportion of the platform rewards | 5e16 (denotes 5e16/1e18=5%)<br>(platform commission = <br>total rewards * 5%)  |
| uint256<br>factoryCommissionRate    | a number represents the numerator in rate and the denominator is 1e18.<br>*it is a proportion of factoryCommission to platformCommission*<br>the value of parameter should be determined after consulting with 61 Lab | 10e16 (denotes 10e16/1e18=10%)<br>(factory commission = <br>platform commission * 10%)   |
| <br>**NodeDeposit contract**<br><br> | | |
| bool soloNodeDepositEnabled         | a switch allows/disallows solo node participation | true |
| bool trustNodeDepositEnabled        | a switch allows/disallows trust node participation  | true |
| uint256 soloNodeDepositAmount         | an amount of node participation threshold in ETH as a validator<br>Solo validator will be enabled only if this parameter has been set   |  8, 12 or 16 ETH is an reasonable amount   |
| uint256 trustNodePubkeyNumberLimit    | a number which limits how many validators could a trust node run, the lower the number, the more decentralized system you got  | default is 100 |
| <br>**UserDeposit contract**<br><br> | | |
| uint256 minDeposit    | an amount of user participation threshold in ETH |   |
| bool depositEnabled   | a switch turns on/off deposit feature for users | true  |