# Security

## Accumulated Security

StaFi LSD Stack framework is accumulated security from the Staking industry for the past 5 years, the tech is abstracted from the experiences that 61 Lab learned, and the technology in the cutting edge. There are applications that adopts The Stack that proves by the market, StaFi protocol is a great example. With the development of custom features, the Stack is updated to cover more and more cases,  EVM LSD Stack and Cosmos LSD Stack are the representatives of the framework. We prefer to call it as the accumulated security or replicated security that comes from the mature framework.

## Native Security

StaFi LSD Stack usually deploys LSTs in the target chain, natively inheriting security from the chain. There are advantages on security aspect if compare native LST issuance to the appchain LST issuance, decoupling LST security from appchains eliminate the TVL concern of the appchain.  

## Asset security

Asset security is one of the key security that StaFi LSD Stack take it more seriously. There are general security and specific security which are all designed in the Stack.

### Blockchain security

Blockchain security is the most important, otherwise all assets on the chain will be insecure. A secure chain must prevent at least 51% attacks, Sybil attacks, Governance attacks, etc.

In the design of LSD Stacks, contracts are deployed on the target chain, relying on the security of the target chain. For example, the contracts of ETH LSD and MATIC LSD are deployed on Ethereum, and the contracts of BNB LSD are deployed on the BSC chain, we believe that both Ethereum and BSC are sufficiently secure, so there is no need to worry about the blockchain security.

### Smart contract security

#### Access control

To prevent unauthorized use of smart contract functions, it is necessary to implement secure access controls. Access control mechanisms restrict the ability to use certain functions in a smart contract to approved entities, such as accounts responsible for managing the contract. The **Ownable pattern** and **role-based control** are two patterns useful for implementing access control in smart contracts:

**Ownable pattern**

In the Ownable pattern, an address is set as the “owner” of the contract during the contract-creation process. Protected functions are assigned an OnlyOwner modifier, which ensures the contract authenticates the identity of the calling address before executing the function. Calls to protected functions from other addresses aside from the contract owner always revert, preventing unwanted access.

**Role-based access control**

Registering a single address as Owner in a smart contract introduces the risk of centralization and represents a single point-of-failure. If the owner's account keys are compromised, attackers can attack the owned contract. This is why using a role-based access control pattern with multiple administrative accounts may be a better option.

In role-based access control, access to sensitive functions is distributed between a set of trusted participants. For instance, one account may be responsible for minting tokens, while another account performs upgrades or pauses the contract. Decentralizing access control this way eliminates single points of failure and reduces trust assumptions for users.

**Using multi-signature wallets**

Another approach for implementing secure access control is using a multi-signature account to manage a contract. Unlike a regular EOA, multi-signature accounts are owned by multiple entities and require signatures from a minimum number of accounts—say 3-of-5—to execute transactions.

Using a multisig for access control introduces an extra layer of security since actions on the target contract require consent from multiple parties. This is particularly useful if using the Ownable pattern is necessary, as it makes it more difficult for an attacker or rogue insider to manipulate sensitive contract functions for malicious purposes.

In the design of StaFi LSD Stack, the owner of the contract only manages some basic parameters, fee commission, minimum pledge amount, etc., and do not involve any user assets. On the other hand, the owner of the contract is a multi-signature contract, controlled by multiple parties(Stack DAO), and there will be no single account missing problem.

#### Code Vulnerabilities

If the contract code has security vulnerabilities, it will also lead to hacking and loss of assets. So it is very necessary to audit the contract.

We strongly recommend all the projects that develops based on StaFi LSD Stack to do the audit, and make sure the security. The framework of the Stack will be subjected to the brand auditor accordingly but not all feature will be, please keep it in mind.

#### User asset lock

For LSD projects, users will transfer the assets to a LSD protocol, and the protocol delegates the assets to the target chain. Usually, these locked assets on the target chain are safe. However, if there are some problems with the protocol and the undelegation operation of the target chain is not triggered, the assets may be locked all that time and users cannot redeem their assets. In the design of StaFi LSD Stack, the undelegation operation of the target chain can be directly triggered at any time by anyone, which will ensure that the user can eventually withdraw his assets.

#### Abnormal exchange rate

For the LSD project, the exchange rate is very important, which represents how much assets users can redeem with LST. If the exchange rate is abnormal, the amount of assets redeemed by the user will also be abnormal, so accurate exchange rate calculation is very important.

 In the design of StaFi LSD Stack, rigorous calculations are performed to ensure the exchange rate is correct.

An great example is ETH, the reward needs to be synchronized from the Consensus chain(Beacon) to the Execution chain, the other case is BNB, the reward needs to be synchronized from the BC chain to the BSC, so there may be a problem that some rewards are not synchronized. In the design of StaFi LSD Stack, an off-chain relay service is created to accurately synchronize rewards to the Stack contract and ensure that the exchange rate is calculated correctly. At that time, rateChangeLimit protection was also introduced to prevent abnormal synchronization of reward.

In MATIC, it completely relies on contract data, including LST supply, real staked amount on the chain, reward amount, etc. Therefore, the calculation of the exchange rate is usually very accurate. Of course, in order to prevent data anomalies in the MATIC staking contract, LSD Stack introduced a rateChangeLimit parameter protection mechanism to prevent sudden large fluctuations in the exchange rate.

## Off-chain service security

As mentioned above, LSTs like ETH, BNB need off-chain services, and some important data needs to be collected off-chain and then uploaded to the contract. Therefore, in order to ensure data security, off-chain services of StaFi LSD Stack are designed to be decentralized. Whenever contract data needs to be updated, it is voted on by multiple off-chain services, usually running by different parties, similar to decentralized oracle. At the same time, it can also avoid single points of failure and ensure the stability of the overall protocol.

## Decentralization manner

Staking is always related to the governance, no matter it is from PoS module or veToken module. Distributing the voting power from staking is related to the decentralization of the chain and community. This Stack integrate advanced technology to make the whole process more decentralized.

- Decentralized services- StaFi LSD Stack integrates more onchain services instead of offline one.
    - Use The Graph instead of center provided RPCs
    - Dismiss the admin key and make it transparent to the community
    - Upgrade the contract by a governance paras vote
- Decentralized voting power, in customization, the Stack integrates technology that distributed stake smartly
    - Integrating DVT(Distributed validator technology), such as SSV and Obol to provide ETH LST providers a distributed LST product.
    - Smart delegation algorithm is another method, mainly built for the layer1 except for Ethereum. There will be custom setting in the algorithm.
- Governance right -  There is a built in module in the Stack, which enables the distribution of the voting power, there are custom setting in the distribution and varied in different layer1s.