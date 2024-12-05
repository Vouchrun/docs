# Relay Client 

`pls-lsd-relay` is an off-chain relay service responsible for interacting with Vouch LSD contracts, synchronising blocks and events, handling tasks related to validators and balances, and other off-chain operations.

For more inforamtion on the Relayer role refer to the [Relay](/docs/architecture/components/relay) component documentation. 

## Relay Client Preperation

There are some configuration items and services which need to be set to run the Relay Client. We will pass these details to the client at startup via a config.toml file. Below are examples of the settings which will need to be passed to the client at startup. 

### Configuration Items

The `config.toml` file will require some operatror specific settings per Relay client:

1. **public address** - You will need to enter a Voter account. This is a public address which will be used for voting, as such you will need to export a Private Key which will get imported to the relay client on first run.
2. **Pinata API key** - The client also saves data to IPFS, you will need to create a pinata account for this purpose and gernate and API key.

Have these ready so you can configure the relay client with these unique settings.

However before running the client you need to choose which way you would like to install and run the client, there are two ways:

1. [**Run Using Docker**](#run-using-docker) - this is the recomended way as it simplifies the installation process.
2. [**Run Using Native Go App**](#run-using-native-go-app) - if you would prefer you can install and run the Go application Relay client.

### Relay Settings

| config | description | example value  (recommended) |
| --- | --- | --- |
| account | voter account addressMake sure you imported it before using |0xYOUR_ACCOUNT| |
| trustNodeDepositAmount     | the trust node validator initial deposit amount taken from PLS pool | 1000000  |
| eth2EffectiveBalance       | the effective balance of a validator            | 32000000 |
| maxPartialWithdrawalAmount | The threshold used to differentiate between rewards and exit balance. If the amount received from Beacon chain is less than this value, it is treated as rewards; otherwise, it is considered as exit balance.                   | 8000000  |
| gasLimit    | Total gas allowance for transaction, relay will batch larger requests |3000000 |
| maxGasPrice | Gas Price, note Pulsechain gas is volatile so allow ample for peak periods, relay will hold off sending if network gas requriement is over this limit |10000000 (in Gwei) |
| GasPriceMultiplier  | Increase Gas by Factor of, overcomes gas spikes |2.5 |
| batchRequestBlocksNumber | a number which limits concurrent requests on Beacon chain, due to the design of Beacon chain RPC |16 (32 Max) |
| runForEntrustedLsdNetwork | set this config to true only if you are one of the entrusted voters who are responsible to relay data for entrusted LSD networks | false |



### Pinata Settings

| config | description | example value  (recommended) |
| --- | --- | --- |
| apikey  | apikey of your pinata account | YOUR_API_KEY  |
| pinDays | how many days the data retained on IPFS  | 180 |

### Contracts Settings

| config | description | example value  (recommended) |
| --- | --- | --- |
| lsdTokenAddress | lsd token address | see `config.toml` below |
| lsdFactoryAddress | lsd factory address |see `config.toml` below |

### Endpoints Settings

Groups of eth1 and eth2 endpoints. It will be used only if previous ones are not available.

| config | description | example value |
| --- | --- | --- | 
| eth1 | Execution RPC endpoint | https://rpc-pulsechain.g4mm4.io |  
| eth2 | Consensus (Beacon chain) RPC endpoint | https://rpc-pulsechain.g4mm4.io/beacon-api/ |  


### Example config-toml file

:::warning Edit your `config.toml` using your editor of choice, refer to the example `config.toml` below.
:::

:::tabs

== Mainnet
```sh
# Example for Voter Account
account = "0x0E3266DEB55b386CD608C64627155E33Df4657De"
trustNodeDepositAmount     = 1000000  # PLS
eth2EffectiveBalance       = 32000000 # PLS
maxPartialWithdrawalAmount = 8000000  # PLS
gasLimit = "3000000"
maxGasPrice = "20000000"              #Gwei
GasPriceMultiplier = 2.5
batchRequestBlocksNumber = 16
runForEntrustedLsdNetwork = false

[pinata]
# Example apikey only - register for a Free Pinata account and create your own API Key
apikey = "YOUR_API_KEY"
pinDays = 180

[contracts]
lsdTokenAddress = "0x79BB3A0Ee435f957ce4f54eE8c3CFADc7278da0C"
lsdFactoryAddress = "0x4bf4df49f8bc72a4e484443a14b827cb8c47c716"

[[endpoints]]
eth1 = "https://rpc-pulsechain.g4mm4.io"
eth2 = "https://rpc-pulsechain.g4mm4.io/beacon-api/"
```

== Testnet
```sh
# Example for Voter Account
account = "0x0E3266DEB55b386CD608C64627155E33Df4657De"
trustNodeDepositAmount     = 1000000  # PLS
eth2EffectiveBalance       = 32000000 # PLS
maxPartialWithdrawalAmount = 8000000  # PLS
gasLimit = "3000000"
maxGasPrice = "1200"                  #Gwei
GasPriceMultiplier = 2.5
batchRequestBlocksNumber = 16
runForEntrustedLsdNetwork = false

[pinata]
# Example apikey only - register for a Free Pinata account and create your own API Key
apikey = "YOUR_API_KEY"
pinDays = 180

[contracts]
lsdTokenAddress = "0x61135C59A4Eb452b89963188eD6B6a7487049764"
lsdFactoryAddress = "0x98f51f52A8FeE5a469d1910ff1F00A3D333bc9A6"

[[endpoints]]
eth1 = "https://rpc-testnet-pulsechain.g4mm4.io"
eth2 = "https://rpc-testnet-pulsechain.g4mm4.io/beacon-api/"
```
:::


## Run Using Docker

### Installation

:::tabs
== Quick Install

The below command will:
- Install Docker (if not already installed)
- Configure relay directory and config.toml file
- Import Relay account private keys
- Enable automatic OS and relay updates (optional)
- Start the Relay docker container the first time


Note: this command needs to be run as root.

```bash
curl -sL https://raw.githubusercontent.com/Vouchrun/pls-lsd-relay/refs/heads/main/relay-install.sh > relay-install.sh; sudo bash relay-install.sh
```

== Detailed Install
### Installing Docker (optional - if not alredy installed)


Clean up conflicting versions and install docker

```sh
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

Add Docker's official GPG key:
```sh
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

Add the repository to Apt sources:
```sh
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

Install the Docker packages.
```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Verify that the Docker Engine Installed (Optional) 
```sh
sudo docker run hello-world
```

### Setup Relay Directory Structure

```sh
sudo mkdir /blockchain && sudo mkdir /blockchain/relay && sudo chgrp -R docker /blockchain/relay && sudo chmod -R 770 /blockchain/relay && sudo usermod -aG docker $USER
```

Create your [config.toml](#example-config-toml-file) file by using the example file and pasting your settings into the file using your chosen editor.

```sh
nano /blockchain/relay/config.toml
```

### Import Relay Account Keys (private keys)

Let's import your voter account so that it can be used by relay service. Note you will need to have a Private Key that matches the Public Address you have configured in your `config.toml` file. 
You will also set the password for this private key, each time the relay is re-started the password will be required.

```sh
# clean up any running containers
sudo docker stop relay
sudo docker rm relay

# run relay to import-account 
docker run --name relay -it --restart unless-stopped -v "/blockchain/relay":/keys ghcr.io/vouchrun/pls-lsd-relay:main import-account \
--base-path /keys

```

Respond with the required information when prompted:
> `> Enter private key:` #enter your exported Private Key

> `> password for key:` #enter a password

:::tip Make sure you fund the imported account with some PLS (or tPLS) so the relay has funds to pay gas fees when submitting votes on chain.
::: 


### Starting The Relay Client
This assumes you are using the default container name of "relay" if you have changed this to anything else during the install process you will need to modify the commands below to suit. 

:::tabs
== Start in interactive mode


- Runs docker container in interactive mode and prompts for password at startup
- Use Ctrl+P followed by Ctrl+Q to detach from docker container and leave it running

**Clean up any running containers**
```sh
sudo docker stop relay
sudo docker rm relay
```
**Run relay with prompt for password**
```sh
sudo docker run --pull always --name relay -it -e KEYSTORE_PASSWORD --restart unless-stopped -v "/blockchain/relay":/keys ghcr.io/vouchrun/pls-lsd-relay:main start --base-path /keys
```

== Start in detached mode

- Runs docker container in deatched mode and prompts for password at startup
- Follow docker logs to view status of relay

**Clean up any running containers**
```sh
sudo docker stop relay
sudo docker rm relay
```

**Run relay with prompt for password**
```sh
read -s -p "Enter keystore password: " KEYSTORE_PASSWORD && docker run --pull always --name relay -d -e "KEYSTORE_PASSWORD=$KEYSTORE_PASSWORD" --restart unless-stopped -v "/blockchain/relay/testnet":/keys ghcr.io/vouchrun/pls-lsd-relay:main start --base-path /keys
```
:::
























## Run Using Native Go App

### Installation


#### Step 1. Install Build Tools

On your chosen server/node make sure you have the following tools installed, you will need these to continue.

Install `make`, `gcc` and `git`

```bash
sudo apt update
sudo apt install -y make gcc git build-essential
```

#### Step 2. Install Go

Here we will install Go and set the environment variables:
- Existing Go version binary will be removed
- Go will be installed in /usr/local/go
- the downloaded zipped file will be deleted
- File Path locations will be added to .bashrc

```bash
cd $HOME
wget -O go1.21.3.linux-amd64.tar.gz https://go.dev/dl/go1.21.3.linux-amd64.tar.gz
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.21.3.linux-amd64.tar.gz && rm go1.21.3.linux-amd64.tar.gz
echo 'export GOROOT=/usr/local/go' >> $HOME/.bashrc
echo 'export GOPATH=$HOME/go' >> $HOME/.bashrc
echo 'export GO111MODULE=on' >> $HOME/.bashrc
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc && . $HOME/.bashrc
go version
```

Confirm that the command prints the installed version of Go.

:::tip If you have issues with the above you can always install `go` by following the [official docs](https://golang.org/doc/install). Remember to set your `$PATH` environment variable, see above example.
:::



#### Step 3. Install Vouch Relay Service
:bulb: Do not run make install as sudo

```
git clone https://github.com/Vouchrun/pls-lsd-relay.git
cd pls-lsd-relay
make install
```

#### Step 4. Create Working Directory

Create your chosen working directory if required, then copy  the config.toml template from the install directory to the working directory. 

```
sudo mkdir -p /blockchain/relay
sudo cp conf.template.toml /blockchain/relay/config.toml
```


### Import Relay Account Keys (private keys)

Let's import your voter account so that it can be used by relay service. Note you will need to have a Private Key that matches the Public Address you have configured in your `config.toml` file. 
You will also set the password for this private key, each time the relay is re-started the password will be required.

`Start Command`
```bash
pls-lsd-relay import-account --base-path /blockchain/relay
```

Respond with the required information when prompted:
> `> Enter private key:` #enter your exported Private Key

> `> password for key:` #enter a password

:::tip Make sure you fund the imported account with some PLS (or tPLS) so the relay has funds to pay gas fees when submitting votes on chain.
::: 

### Start the Relay Client

:warning: You will need your account password (the password you used when importing your account), as we will be passing this to the client at startup when prompted.  


```bash
sudo pls-lsd-relay start --base-path /blockchain/relay/ --log-level info
```

Respond with the required information when prompted:
> `> password for key:` #enter password created in above step

That is it, just make sure the Relay client runs at all times!



### Additional Notes

#### Running using Tmux
It is preferred to run your Relay client using something like `systemd` `TMUX` or `Screen` which will give you more control and flexibilty when running the client. You can use `TMUX` by doing the following: 

:bulb: 
If you are unfamiliar with Running `TMUX` you should learn how to navigate it first before running the below commands.
This [TMUX guide](https://tmuxcheatsheet.com/) might help.

```
sudo apt install tmux
tmux new-session -s relay
```
Then Issue the above `Start Command` in the TMUX terminal using the instructions in the preceeding section.


#### Updating the Go Relay Client



##### Get the latest Client
Update the client files by navigating to the orginal install directory and pulling the latest Relay client from the github repository. 

```bash
cd $HOME/pls-lsd-relay # assumes home dir was root of install 
git pull https://github.com/Vouchrun/pls-lsd-relay.git
```

##### Re-run the installation process as outlined above.

:bulb: Do not run make install as sudo
```bash
cd $HOME/pls-lsd-relay
make install
```

##### Re-start the client

```bash
sudo pls-lsd-relay start --base-path /blockchain/relay/ --log-level info
```

Respond with the required information when prompted:
> `> password for key:` #enter password created in above step

That is it, just make sure the Relay client runs at all times!



