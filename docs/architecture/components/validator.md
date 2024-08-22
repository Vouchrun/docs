# Validator

We need create validator keys with our forked version of [Ethereum Staking Deposit cli](https://github.com/stafiprotocol/eth2.0-deposit-cli), then run your validators manually or with SSV.

# Run validator manually

Please configure the fee recipient as the `FeePool` contract. You can find the `FeePool` contract address through `Factory` contract. For example:

![Acquire network contract address by lsd token](/image/ethlsd/05_read_contracts_created.png)

## Option 1. Prysm

Details about the configuration of Prysm, you can check [here](https://docs.prylabs.network/docs/execution-node/fee-recipient).

It may take hours or days for your validator to become fully activated. To learn more about the validator activation process, see Deposit Process. See Check node and validator status for detailed status monitoring guidance. In the meantime, leave your execution client, beacon node, and validator client terminal windows open and running; once your validator is activated, it will automatically begin proposing and validating blocks.

To check on the status of your validator, we recommend checking out the popular block explorers: beaconcha.in by Bitfly and beaconscan.com by the Etherscan team.

**Note**:
<br/> Please configure the fee recipient as the `FeePool` contract, otherwise you may be slashed.

**Next**:
<br/>⚠️You MUST run ejector service, otherwise you may be slashed.
<br/> Follow [our ejector doc](/docs/architecture/components/ejector.html) to run ejector service for the validator.

## Option 2. SSV

ssv.network is a fully decentralized, open-source PLS staking network, based on Secret Shared Validator (SSV) technology, which enables the distributed operation of an Ethereum validator. The SSV protocol splits a validator key into multiple KeyShares and distributes them to non-trusting nodes run by operators. The nodes execute the validator's duties under a consensus mechanism providing fault tolerance, increased security, and decentralized risk for stakers.

More details on SSV portal: https://ssv.network/

**Note**:
<br/> Please configure the fee recipient as the `FeePool` contract, otherwise you may be slashed.

**Next**:
<br/>⚠️You MUST run ejector service, otherwise you may be slashed.
<br/>Follow [our ejector doc](/docs/architecture/components/ejector.html) to run ejector service for the validator.

# Run validator by SSV client for trust validator

ssv.network is a fully decentralized, open-source PLS staking network, based on Secret Shared Validator (SSV) technology, which enables the distributed operation of an Ethereum validator. The SSV protocol splits a validator key into multiple KeyShares and distributes them to non-trusting nodes run by operators. The nodes execute the validator's duties under a consensus mechanism providing fault tolerance, increased security, and decentralized risk for stakers.

## SSV Client
- Listen to whether there is enough PLS in the user pool. If so, automatically generate a new validator key, signature, deposit data, etc., based on the mnemonic, and interact with the node contract to stake PLS and become a validator.
- Monitor SSV-related events and calculate the cluster's latest state.
- Based on the configured operator, along with the validator key from step 1 and the cluster state from step 2, generate parameters such as signature, pubkeys, keyshare, etc., using SSV's related algorithms, and interact with the SSV contract to trigger RegisterValidator.
- Monitor the validator's status. If it exits, interact with the SSV contract to trigger RemoveValidator.
- Monitor the operator's status. If a switch is required, interact with the SSV contract to trigger RemoveValidator/RegisterValidator to switch to new operators.
- Monitor the cluster balance. If it approaches the liquidation value, interact with the SSV contract to trigger Deposit to avoid liquidation. If it has already been liquidated, trigger Reactivate to recover the cluster.
- Monitor the validator Ejected status. If an eject is needed, trigger ExitValidator on the beacon.

- Listen to whether there is enough PLS in the user pool. If so, automatically generate a new validator key, signature, deposit data, etc., based on the mnemonic, and interact with the node contract to stake PLS and become a validator.
- Monitor SSV-related events and calculate the cluster's latest state.
- Based on the configured operator, along with the validator key from step 1 and the cluster state from step 2, generate parameters such as signature, pubkeys, keyshare, etc., using SSV's related algorithms, and interact with the SSV contract to trigger RegisterValidator.
- Monitor the validator's status. If it exits, interact with the SSV contract to trigger RemoveValidator.
- Monitor the operator's status. If a switch is required, interact with the SSV contract to trigger RemoveValidator/RegisterValidator to switch to new operators.
- Monitor the cluster balance. If it approaches the liquidation value, interact with the SSV contract to trigger Deposit to avoid liquidation. If it has already been liquidated, trigger Reactivate to recover the cluster.
- Monitor the validator Ejected status. If an eject is needed, trigger ExitValidator on the beacon.

## Install Build Tools

Install `make`, `gcc` and `git`

```bash
sudo apt update
sudo apt install -y make gcc git build-essential
```

Install `go` by following the [official docs](https://golang.org/doc/install). Remember to set your `$PATH` environment variable, for example:

```bash
cd $HOME
wget -O go1.21.6.linux-amd64.tar.gz https://go.dev/dl/go1.21.6.linux-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.21.6.linux-amd64.tar.gz && rm go1.21.6.linux-amd64.tar.gz
echo 'export GOROOT=/usr/local/go' >> $HOME/.bashrc
echo 'export GOPATH=$HOME/go' >> $HOME/.bashrc
echo 'export GO111MODULE=on' >> $HOME/.bashrc
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc && . $HOME/.bashrc
go version
```

## Install SSV Client service

```bash
git clone https://github.com/stafiprotocol/eth-lsd-ssv.git
cd eth-lsd-ssv
make install
```

## Import trust node account

```bash
$ lsd-ssv-client import-account
keystore path: ./keys
Enter private key:
>
password for key:
>
INFO[0007] key imported                                  address=0x68146ebA486CE6F8D22731c8ECB4d013F34E7114 file=CWD/keys/0x68146ebA486CE6F8D22731c8ECB4d013F34E7114.key
```

## Import your SSV account

```bash
$ lsd-ssv-client import-account
keystore path: ./keys
Enter private key:
>
password for key:
>
INFO[0007] key imported                                  address=0x68146ebA486CE6F8D22731c8ECB4d013F34E7114 file=CWD/keys/0x68146ebA486CE6F8D22731c8ECB4d013F34E7114.key
```

## Import validator mnemonic for creating new validators

```bash
$ lsd-ssv-client import-val-mnemonic
```

## Config eth lsd ssv client service

Update config (config.toml) by your favorite editor

```bash
$ cp conf.ssv.template.toml config.toml
```

|  config | description  | example value | recommended value |
|---|---|---|---|
|  *eth1Endpoint* |  execution RPC endpoint  | http://127.0.0.1:8090  |    |
|  *eth2Endpoint*|  Consensus RPC endpoint | https://beacon-lighthouse-goerli.stafi.io  |    |
|  *logFilePath* |  local directory path to store logs | eth-lsd-ssv-log  |   |
|  *trustNodeAccount* | an account to interact with lsd network contracts.<br>Make sure you imported it before using | | |
|  *gasLimit* |   |   |  3000000  |
|  *keystorePath* |  local directory path to store accounts keystore files |  | eth-lsd-ssv-keystore  |
|  *targetOperators* | operator list you choose to run your future validators,<br> the size of the list must be 4, 7, 10 or 13 - Limited by SSV.network  <br>- [full operators list](https://explorer.ssv.network/operators)<br>- [SSV operators Selection Doc](https://docs.ssv.network/learn/stakers/validators/validator-onboarding#_jm9n7m464k0) | [1,2,3,4] |   |
|  *poolReservedBalance* | an amount reserved for user pool liquidity, such as withdrawal |   |  20000000000000000000 (20 PLS)  |

contracts section

|  config | description  | example value | recommended value |
|---|---|---|---|
|  *ssvNetworkAddress* |  SSV Network contract address <br> https://docs.ssv.network/developers/smart-contracts | 0x38A4794cCEd47d3baf7370CcC43B560D3a1beEFA (holesky) | |
|  *ssvNetworkViewsAddress* | SSV Network View contract address <br> https://docs.ssv.network/developers/smart-contracts | 0x352A18AEe90cdcd825d1E37d9939dCA86C00e281 (holesky) |  |
|  *ssvTokenAddress*   |  SSV Token address <br> https://docs.ssv.network/developers/smart-contracts  | 0xad45A78180961079BFaeEe349704F411dfF947C6 (holesky)  |    |
|  *lsdTokenAddress*   | lsd token address     |   |    |
|  *lsdFactoryAddress* | lsd factory address   |   |    |


## Start ssv services

```bash
$ lsd-ssv-client start --config config.toml
```
