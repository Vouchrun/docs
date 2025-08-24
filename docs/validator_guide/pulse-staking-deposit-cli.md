# Pulse-staking-deposit-cli Guide

## Using deposit-cli to generate key files

Before you can participate as a Solo or Trusted Validator on the Vouch protocol, you need to generate the requried keystores and deposit files, much like you would if you were operating a "normal" validator on the Pulsechain network. 

`pulse-staking-deposit-cli` is a tool for creating EIP-2335 format BLS12-381 keystores and a corresponding `deposit_data-*.json` file and `stake_data-*.json` file for use with the Vouch Protocol. This tool creates deposit files that are compatable with the Ethereum and Pulsechain Launchpads, however the output files are designed to be used exclusivly with the Vouch Protocol. 

:warning: Do not use the generated deposit file with the offical Pulschain Launchpad site.


## Installing pulse-staking-deposit-cli

:::warning 
Please generate your keystores on your own safe, completely offline device, and backup your mnemonic, keystores, and password securely.
:::

Github Repo：[pulse-staking-deposit-cli](https://github.com/Vouchrun/pulse-staking-deposit-cli)

:bulb: Advanced instructions can be found in the [ReadMe](https://github.com/Vouchrun/pulse-staking-deposit-cli/blob/main/README.md) file on the Githup Repo.

### Step 1. Check your Python version
Ensure you are using Python version >= Python3.8:

```sh
python3 -V
```

If required update your python version.


### Step 2. Clone the repo to a local directory

```sh
git clone https://github.com/Vouchrun/pulse-staking-deposit-cli
cd pulse-staking-deposit-cli
```

### Step 3. Installation

1. Install pip
```
sudo apt-get install python3-pip
```

2. Install the dependencies:

```sh
sudo pip3 install -r requirements.txt
sudo python3 setup.py install
```

Or use the helper script:

```sh
sudo ./deposit.sh install
```

## Generate Keystore, Deposit and Staking Files

### Step 1. Before you Start

Prior to generating your keystores and the corresponding `deposit_data` and `staking_data` files, you need to take note of two things:
1. The Withdrawal Address must be set to the Vouch `Network_Withdraw` contract address when generating keys.
2. Your Nodes `suggested-fee-recipient` must be set to the Vouch `Fee_Pool` contract address (see below section).


:::danger You MUST set your WITHDRAWAL address correctly to the `Network_Withdraw` contract address when generating your Keys.
:::
:::tabs

== Mainnet Withdrawal Address
```
0x1F082785Ca889388Ce523BF3de6781E40b99B060
```

== Testnet Withdrawal Address
```
0x555E33C8782A0CeF14d2e9064598CE991f58Bc74
```

:::

### Step 2. Running the Staking-cli Tool.

This will Create your keys, `deposit_data-*.json` and `staking_data-*.json` files.

[Extensive documention](https://github.com/Vouchrun/pulse-staking-deposit-cli) on the staking-deposit-cli tool can be found in the Github repository ReadMe file. This will provide all the configurable settings and ways you can use the tool to generate keystores and deposit files using either new or existing mnemonic seed words. Please refer that documentation and instructions for assistance with running the staking-cli-tool if required.


:::danger Make sure your input `12000000` (12Mil) for the deposit amount when prompted.
:::


Run one of the following command to enter the interactive CLI:

```sh
./deposit.sh new-mnemonic
```

or

```sh
./deposit.sh existing-mnemonic
```

You can also run the tool with optional arguments:

```sh
./deposit.sh new-mnemonic --num_validators=<NUM_VALIDATORS> --mnemonic_language=english --chain=<CHAIN_NAME> --folder=<YOUR_FOLDER_PATH>
```

```sh
./deposit.sh existing-mnemonic --num_validators=<NUM_VALIDATORS> --validator_start_index=<START_INDEX> --chain=<CHAIN_NAME> --folder=<YOUR_FOLDER_PATH>
```



Basic Example Commands for New Mnemonic:

:::tabs

== Mainnet

```sh
./deposit new-mnemonic --num_validators=10 --chain=pulsechain --folder=/blockchain/validators
```

== Testnet
```sh
./deposit new-mnemonic --num_validators=10 --chain=pulsechain-testnet-v4 --folder=/blockchain/validators 
```
:::

This command will generate a set of files (in your chosen output directory) which consists of 3 items:
1. `deposit_data-*.json` file, used for depositing inital 12Mil PLS validator stake (solo validators)
2. `staking_data-*.json` file, used to send remaining 20Mil PLS to Pulsechain staking contract.
3. One or more (10 in this example) Keystore files which need to be imported on your valdiator.


:::warning Make sure you BACKUP your mnemonic words and record the password used to protect your keys, you will need this password when setting up your [Ejector Client](/docs/validator_guide/ejector_client)
:::

## Setting your Suggested Fee Recipient

When configuring your Validator clients it is important to configure your fee recipient address to the Vouch `ValidatorFeeDepositor` contract address, otherwise you will be slashed by the Vouch Protocol. 

>[!CAUTION]
> You MUST set your `suggested-fee-recipient` correctly to the `ValidatorFeeDeposit` contract address when running your Validator Client.
> NOTE: This has recently changed from the 'FeePool' contract address on Mainnet with the launch of the Vouch Ecosystem and associated VOUCH token.

ValidatorFeeDeposit Contract Address:

:::tabs

== Mainnet ValidatorFeeDeposit Address

```
0x9325008eE3B5982c10010C8f12b6CD4943F48fA6
```

== Testnet FeePool Address
```
0x4C14073Fa77e3028cDdC60bC593A8381119e9921
```
:::


It may take hours or days for your validator to become fully activated. In the meantime, leave your execution client, beacon node, and validator client terminal windows open and running; once your validator is activated, it will automatically begin proposing and validating blocks.

To check on the status of your validator, we recommend checking out the popular block explorers as you normally would when running a Validator on Pulsechain.