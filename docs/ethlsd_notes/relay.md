# Relay

`pls-lsd-relay` is an off-chain relay service responsible for interacting with Vouch LSD contracts, synchronising blocks and events, handling tasks related to validators and balances, and other off-chain operations.

- **Submit Balances** (`submit_balances`): Involves fetching on-chain balance data and submitting it to the networkBalancesContract.
- **Update Validators** (`update_validators`): Retrieves a new list of validators, adds new validators, and updates existing validators.
- **Prune Block Data** (`prune_blocks`): Prunes old, no longer needed block data to reduce cache size and memory usage. It determines which blocks should be pruned based on several key height parameters to ensure that data still needed is not accidentally deleted.
- **Vote Withdraw Credentials** (`vote_withdraw_credentials`): Vote for new validator pubkey by verifying that the withdrawal credentials and amount on chain match the network's requirements. If it matches, the validator is allowed to invoke stake method to become an active validator. This approach can effectively prevent malicious attacks.
- **Sync Block Data** (`sync_blocks`): Involves fetching the latest block data from the Ethereum blockchain and synchronizing it to the cache.
- **Distribute Priority Fee** (`distribute_priority_fee`): Distributes the priority fee. This is done through interactions with the PLS LSD contracts and related calculations. This service also ensures distribution only occurs under specific conditions.
- **Set Merkle Tree Root** (`set_merkle_root`): Calculates the final node rewards list based on node reward lists and new node reward lists. Constructs a Merkle tree for the final node rewards list. Serializes the final node rewards list to JSON and uploads it to decentralized storage. Sends a transaction to set the Merkle tree root.
- **Distribute Withdrawals** (`distribute_withdrawals`): Handles withdrawal requests from users or nodes and distributes funds.
- **Notify Validator Exit** (`notify_validator_exit`): Sends notifications when validators exit or are kicked out.


Refer to the [Relay Client](/docs/governance/relay_client) section for installation and configuration of the Relay client.