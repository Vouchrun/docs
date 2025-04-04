# Ejector Client 

The Ejector service plays an important role in PLS LSD stack. As users are free to `unstake` vPLS and `withdraw` PLS at anytime, the system needs to dynamically responed to these demands. Every validator should run an ejector service to properly handle the validator exiting process to facilitate the user requirements. 

## Running the Ejector Client

There are some configuration items which need to be set to run the Ejector Client. We will pass these items to the client at startup. Below are examples of the settings which will need to be passed to the client at startup. 

However before running the client you need to choose which way you would like to install and run the client, there are two ways:

1. [**Run Using Docker**](#run-using-docker) - this is the recomended way as it simplifies the installation process.
2. [**Run Using Native Go App**](#run-using-native-go-app) - if you would prefer you can install and run the Go application Ejector client.


### Configuration Items

:bulb: The below exmaples are using Geth and Lighthouse, you will need to make sure the ports used match your client configuration. 

| config | description | example value |
| --- | --- | --- |
| execution_endpoint | Execution RPC endpoint | http://127.0.0.1:8545 |
| consensus_endpoint | Consensus (Beacon chain) RPC endpoint | http://127.0.0.1:5052 or public RPC |
| keys_dir | keystore path created by [pulse-staking-deposit-cli](https://github.com/Vouchrun/pulse-staking-deposit-cli) | ./validator_keys |
| withdraw_address | Contract address of NetworkWithdraw | `0x1F082785Ca889388Ce523BF3de6781E40b99B060` |

:::tabs

== Mainnet
Withdraw Address Setting: ```0x1F082785Ca889388Ce523BF3de6781E40b99B060```

Prority Fee Address Setting: ```0x5eAd01d58067a68D0D700374500580eC5C961D0d```

== Testnet
Withdraw Address Setting: ```0x555E33C8782A0CeF14d2e9064598CE991f58Bc74```

Prority Fee Address Setting: ```0x4C14073Fa77e3028cDdC60bC593A8381119e9921```
:::

### When Using Complex or Custom keys_dir Paths
If your environment has mulitple keys_dir locations or you have used multiple keystore passwords, it is possible to run mulitple version of the ejector client on the same Node. The ejector will also detect keystores in subdirectories if required.


## Run Using Docker

### Installation

:::tabs
== Quick Install

The below command will:
- Install Docker (if not already installed)
- Configure ejector directory to point to keystores
- Enable automatic OS and ejector container updates (optional)
- Start the ejector docker container the first time


Note: this command needs to be run as root.

```bash
curl -sL https://raw.githubusercontent.com/Vouchrun/pls-lsd-ejector/refs/heads/main/ejector-install.sh > ejector-install.sh; sudo bash ejector-install.sh
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

  "deb [arch=$(dpkg --print-vouch_ecosystem) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \

  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \

  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

Install the Docker packages.
```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Add current user to the docker group
```sh
sudo usermod -aG docker $USER
```
Verify that the Docker Engine Installed (Optional) 
```sh
sudo docker run hello-world
```
:::

### Start the Ejector Client

:::tabs

== Format
```sh
sudo sudo docker run --pull always  --name ejector -it -e KEYSTORE_PASSWORD="actual_password" --restart unless-stopped -v "/PATH_TO_KEYS":/keys ghcr.io/vouchrun/pls-lsd-ejector:main start \
    --consensus_endpoint 'BEACON_CHAIN_RPC_ENDPOINT' \
    --execution_endpoint 'EXECUTION_RPC_ENDPOINT'  \
    --keys_dir ./validator_keys \
    --withdraw_address '0x_NETWORK_WITHDRAW_CONTRACT_ADDR'
```


== Mainnet Example
### Run in interactive mode
```sh
# runs docker container in interactive mode 
# use Ctrl+P followed by Ctrl+Q to detach from docker container and leave it running
# remove [="actual_password"] to input password at startup, container will cache password

sudo docker run --pull always  --name ejector -it -e KEYSTORE_PASSWORD="actual_password" --restart unless-stopped -v "/blockchain/validator_keys":/keys ghcr.io/vouchrun/pls-lsd-ejector:main start \
--consensus_endpoint https://rpc-pulsechain.g4mm4.io/beacon-api \
--execution_endpoint https://rpc-pulsechain.g4mm4.io \
--keys_dir /keys \
--withdraw_address '0x1F082785Ca889388Ce523BF3de6781E40b99B060'
```

### Run in detached mode
```sh
# runs docker container in deatched mode 
# follow docker logs to view status of ejector

sudo docker run --pull always  --name ejector -it -e KEYSTORE_PASSWORD="actual_password" --restart unless-stopped -v "/blockchain/validator_keys":/keys ghcr.io/vouchrun/pls-lsd-ejector:main start \
--consensus_endpoint https://rpc-pulsechain.g4mm4.io/beacon-api \
--execution_endpoint https://rpc-pulsechain.g4mm4.io \
--keys_dir /keys \
--withdraw_address '0x1F082785Ca889388Ce523BF3de6781E40b99B060'
```

== Testnet Example
### Run in interactive mode
```sh
# runs docker container in interactive mode 
# use Ctrl+P followed by Ctrl+Q to detach from docker container and leave it running
# remove [="actual_password"] to input password at startup, container will cache password

sudo docker run --pull always  --name ejector -it -e KEYSTORE_PASSWORD="actual_password" --restart unless-stopped -v "/blockchain/validator_keys":/keys ghcr.io/vouchrun/pls-lsd-ejector:main start \
--consensus_endpoint https://rpc-testnet-pulsechain.g4mm4.io/beacon-api \
--execution_endpoint https://rpc-testnet-pulsechain.g4mm4.io \
--keys_dir /keys \
--withdraw_address 0x555E33C8782A0CeF14d2e9064598CE991f58Bc74
```

### Run in detached mode
```sh
# runs docker container in deatched mode 
# follow docker logs to view status of ejector

sudo docker run --pull always  --name ejector -it -e KEYSTORE_PASSWORD="actual_password" --restart unless-stopped -v "/blockchain/validator_keys":/keys ghcr.io/vouchrun/pls-lsd-ejector:main start \
--consensus_endpoint https://rpc-testnet-pulsechain.g4mm4.io/beacon-api \
--execution_endpoint https://rpc-testnet-pulsechain.g4mm4.io \
--keys_dir /keys \
--withdraw_address 0x555E33C8782A0CeF14d2e9064598CE991f58Bc74
```
:::





## Run Using Native Go App

### Installation


#### Step 1. Install Build Tools
On your Validating Node make sure you have the following tools installed, you will need these to continue.

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

:::tip If you have issues with the above you can always install `go` by following the [official docs](https://golang.org/doc/install). Remember to set your `$PATH` environment variable, see above example.
:::


#### Step 3. Install Ejector Client
Below we will clone the requried Ejector repo from the Vouch github repository and install it.
- repo will be cloned into ~/pls-lsd-ejector
- install script will download required components and create an Ejector binary file called `pls-lsd-ejector`

```bash
cd $HOME
git clone https://github.com/Vouchrun/pls-lsd-ejector.git
cd pls-lsd-ejector
make install
```

::: warning This will install the `pls-lsd-ejector` application in the default `GOPATH` location which is `~/go/bin`. If you wish to change the applications location, simply move it to the location of your choice e.g. `/blockchain/ejector`
:::

### Start the Ejector Client

:warning: You will need your Keystore password (the password you used when creating your keys), as we will be passing this to the client at startup when prompted.  


:::tabs

== Format
```bash
pls-lsd-ejector start \
    --consensus_endpoint 'BEACON_CHAIN_RPC_ENDPOINT' \
    --execution_endpoint 'EXECUTION_RPC_ENDPOINT'  \
    --keys_dir ./validator_keys \
    --withdraw_address '0x_NETWORK_WITHDRAW_CONTRACT_ADDR'
```


== Mainnet Example
```bash
# This assumes you have your keys in the /blockchain/validator_keys dir
# Change to suit your setup.

pls-lsd-ejector start \
    --consensus_endpoint http://127.0.0.1:5052 \
    --execution_endpoint https://rpc-pulsechain.g4mm4.io \
    --keys_dir /blockchain/validator_keys \
    --withdraw_address '0x1F082785Ca889388Ce523BF3de6781E40b99B060'
```

== Testnet Example
```bash
# This assumes you have your keys in the /blockchain/validator_keys dir
# Change to suit your setup.

pls-lsd-ejector start \
    --consensus_endpoint http://127.0.0.1:5052 \
    --execution_endpoint https://rpc-testnet-pulsechain.g4mm4.io \
    --keys_dir /blockchain/validator_keys \
    --withdraw_address 0x555E33C8782A0CeF14d2e9064598CE991f58Bc74
```
:::

When you run the Ejector client using the above command, you will be requried to input the password used to secure the keystores running on the validator:

`> Enter the password for your imported accounts:`

That is it, just make sure the Ejector client runs at all times!

### Start Ejector in Tmux (Optional)
It is preferred to run your Ejector client using something like `systemd` `TMUX` or `Screen` which will give you more control and flexibilty when running the client. You can use `TMUX` by doing the following: 

:bulb: 
If you are unfamiliar with Running `TMUX` you should learn how to navigate it first before running the below commands.
This [TMUX guide](https://tmuxcheatsheet.com/) might help.

```
sudo apt install tmux
tmux new-session -s ejector
```
Then Issue the above `Start Command` in the TMUX terminal using the instructions in the preceeding section.




