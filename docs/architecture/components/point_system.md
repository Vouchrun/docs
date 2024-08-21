# Point System

Point system has become a new paradigm for protocol bootstrapping and growth. Under the hood, it calculates points based on the balance of LST staked by users. Users earn points every period(e.g. a day or an hour) until the LST is no longer held. In this implementation only the LST minter/staker can earn points, users can not if they received LST from others.

## Compatibility

Currently this module is compatible with ETH LSD, EMV LSD and LRT stack.

## Install Build Tools

Install `make`, `gcc` and `git`

```bash
sudo apt update
sudo apt install -y make gcc git build-essential
```

Install `go` by following the [official docs](https://golang.org/doc/install). Remember to set your `$PATH` environment variable, for example:

```bash
cd $HOME
wget -O go1.22.5.linux-amd64.tar.gz https://go.dev/dl/go1.22.5.linux-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.22.5.linux-amd64.tar.gz && rm go1.22.5.linux-amd64.tar.gz
echo 'export GOROOT=/usr/local/go' >> $HOME/.bashrc
echo 'export GOPATH=$HOME/go' >> $HOME/.bashrc
echo 'export GO111MODULE=on' >> $HOME/.bashrc
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> $HOME/.bashrc && . $HOME/.bashrc
go version
```

## Install deposit point

```bash
$ git clone https://github.com/stafiprotocol/deposit-points.git
$ cd deposit-points
$ make build
```

## Create working directory and config file

Working directory stores config, logs and database files

```bash
$ mkdir -p ~/deposit-points
$ cp config-template.toml ~/deposit-points/config.toml
```

## Config deposit points service

```toml
minimumAmount = 0.0001
periodHours   = 24     # how long a period last
multiplier    = 1      # how many points per LST per period

[eth]
endpoint                = "http://127.0.0.1:8545"
lsdTokenAddress         = "0x0000000000000000000000000000000000000000"
initBlockNumber         = 1548212 # change this to the block height when the lsd token created at
blockSeconds            = 12
filterSpanBlocks        = 3000 # adjust this according to the rpc provider

[api]
listenAddr          = ":8080"
disableExportApi    = false

[db]
filepath = "" # empty value for <base-path>/deposit-points.db
```
## Start deposit points service

```bash
$ ./build/deposit-points start --base-path ~/deposit-points

[GIN-debug] GET    /api/v1/records           --> github.com/stafiprotocol/deposit-points/app.(*App).handleGetRecords-fm (3 handlers)
[GIN-debug] GET    /api/v1/point             --> github.com/stafiprotocol/deposit-points/app.(*App).handleGetPoint-fm (3 handlers)
[GIN-debug] GET    /api/v1/export-points.csv --> github.com/stafiprotocol/deposit-points/app.(*App).handleExport-fm (3 handlers)
[GIN-debug] GET    /swagger/*any             --> github.com/swaggo/gin-swagger.CustomWrapHandler.func1 (3 handlers)
[GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
[GIN-debug] Listening and serving HTTP on :8080
```

## Export points of all stakers to CSV

```bash
$ ./build/deposit-points export \
    --output deposit-points.csv \
    --base-path ~/deposit-points
config path: ~/deposit-points/config.toml
load config success

End at:         2024-07-29T11:53:52+08:00
Csv file path:  deposit-points.csv
Success!!!
```

```bash
$ cat deposit-points.csv
address,points
0x40ef30c23027d346dab48604a0b80ed8a97c14f5,94.81
0x3aab5ae578fa45744afe8224dda506cfe67c508b,118206
```

## APIs

Swagger Docs: http://localhost:8080/swagger/index.html

![Point System APIs](/image/point_system/points-swagger.png 'Point System APIs')

### Get points of an address

```bash
$ curl localhost:8080/api/v1/point?address=0x40ef30c23027d346dab48604a0b80ed8a97c14f5 | jq
{
  "address": "0x40ef30c23027d346dab48604a0b80ed8a97c14f5",
  "points": "94.81"
}
```

### Get all change records of an address

```bash
$ curl localhost:8080/api/v1/records?address=0x40ef30c23027d346dab48604a0b80ed8a97c14f5 | jq
{
  "current_page": 1,
  "page_size": 10,
  "total_pages": 1,
  "data": [
    {
      "address": "0x40ef30c23027d346dab48604a0b80ed8a97c14f5",
      "tx": "0x3531e16d88083ac7a494bfae2e0708408d3517366edf3927adacfa5314cc4d20",
      "amount": "1000000000000000",
      "channel": 1
    },
    {
      "address": "0x40ef30c23027d346dab48604a0b80ed8a97c14f5",
      "tx": "0x96c1e40813e61dd2516968ae738ffa4ca5b9d9a93ce74a74a4d3e2d69ab2dce0",
      "amount": "-1000000000000000",
      "channel": 1
    },
    {
      "address": "0x40ef30c23027d346dab48604a0b80ed8a97c14f5",
      "tx": "0x72ea23ab347057d38b36708d12f92167587cb8440910d4663d21a7347360e677",
      "amount": "10000000000000000",
      "channel": 1
    },
    {
      "address": "0x40ef30c23027d346dab48604a0b80ed8a97c14f5",
      "tx": "0x1e5bb79a097cbed4b38948f8856d041685c91cc78706477e87436878e0ff87b6",
      "amount": "-10000000000000000",
      "channel": 1
    },
    {
      "address": "0x40ef30c23027d346dab48604a0b80ed8a97c14f5",
      "tx": "0xbb334dc365ae2e04b6978d6409fb4d1ed9c2f70c14932eb2f804650957ac637c",
      "amount": "99818568738607125",
      "channel": 1
    }
  ]
}
```
