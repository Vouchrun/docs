# Ejector

Ejector service plays an important role in ETH LSD stack. Every validator should run an ejector service to properly handle the validator exiting process, as users are free to `unstake` and `withdraw`.

⚠️When use our SSV client service to run validators, you don't need to run an ejector service explicitly, cause it is embedded in the SSV client service.

# Installation


## Install Build Tools

Install `make`, `gcc` and `git`

```bash
sudo apt update
sudo apt install -y make gcc git build-essential
```

## Install Go

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

## Install Ejector service

```bash
git clone https://github.com/stafiprotocol/eth-lsd-ejector.git
cd eth-lsd-ejector
make install
```

# Start Ejector service

## Config

| config | description | example value |
| --- | --- | --- |
| consensus_endpoint | Execution RPC endpoint | http://127.0.0.1:8545 |
| execution_endpoint | Consensus (Beacon chain) RPC endpoint | https://holesky.stafi.io |
| keys_dir | keystore path created by https://github.com/ethereum/staking-deposit-cli | ./validator_keys |
| withdraw_address | Contract address of NetworkWithdraw | 0x_NETWORK_WITHDRAW_CONTRACT_ADDR |


## Start

```bash
eth-lsd-ejector start \
    --consensus_endpoint 'BEACON_CHAIN_RPC_ENDPOINT' \
    --execution_endpoint 'EXECUTION_RPC_ENDPOINT'  \
    --keys_dir ./validator_keys \
    --withdraw_address 0x_NETWORK_WITHDRAW_CONTRACT_ADDR`
```
