# MEV-Relay for Builders

The Vouch MEV-Relay is the neutral auction house of the stack. Builders assemble blocks and bid for the right to have a validator propose them; the highest valid bid wins. More builders bidding means better prices for validators.

- **Permissionless and credibly neutral** — any builder can register and compete. No allowlist, no favourites.
- **Open to every builder** — including the Switch.win × Vouch alliance builder, [BlockFerret](./blockferret), which competes on the same terms.
- **Verifiable in public** — every delivered payload is listed on the [delivered-blocks explorer](https://boost-relay.vouch.run/mevblocks).

Validators connect through the [MEV-Boost sidecar](./mev_boost). This page is for **builders** who want to bid for blockspace. Searchers submitting bundles should see [Searchers (Submit Bundles)](./searchers).

## Connect your builder

Everything below is available publicly. The two values you need — the **relay endpoint** and the **relay BLS public key** — are shown at the top of the [/mevblocks](https://boost-relay.vouch.run/mevblocks) page.

| Item | Value |
|---|---|
| **Relay endpoint** | `https://boost-relay.vouch.run` |
| **Relay BLS pubkey** | `0xa6b974cbc17ce9c37b5f9796e167455d22882f2ca662c19379b0b9c476b1fbe745c19006444b653f9fb8409ffda9a450` |
| **Relay URL** | `https://0xa6b974cbc17ce9c37b5f9796e167455d22882f2ca662c19379b0b9c476b1fbe745c19006444b653f9fb8409ffda9a450@boost-relay.vouch.run` |
| **Submit blocks** | `POST /relay/v1/builder/blocks` |
| **Validator registrations** | `GET /relay/v1/builder/validators` |

### What you need to supply

- **Your own BLS bid-signing key.** The builder generates and holds this key; it signs every bid trace so the relay can attribute and validate your submissions.
- **A beacon endpoint** your builder can subscribe to for `head` and `payload_attributes` events.
- **PulseChain chain values** for your builder configuration:

  | Setting | Value |
  |---|---|
  | `genesis_fork_version` | `0x00000369` |
  | `bellatrix_fork_version` | `0x0000036b` |
  | `genesis_validators_root` | `0x3357ba0018a2582aeabe4ae847aa17d50a3a99aaeb66293c01f80a83aecd0c90` |
  | `seconds_in_slot` | `10` |
  | `slots_in_epoch` | `32` |

### Builder flags

On a Flashbots-style builder these map to (for example):

```bash
--builder \
--builder.secret_key=<YOUR_BUILDER_BLS_KEY> \
--builder.remote_relay_endpoint=https://boost-relay.vouch.run \
--builder.beacon_endpoints=http://<YOUR_BEACON_NODE>:5052 \
--builder.genesis_fork_version=0x00000369 \
--builder.bellatrix_fork_version=0x0000036b \
--builder.genesis_validators_root=0x3357ba0018a2582aeabe4ae847aa17d50a3a99aaeb66293c01f80a83aecd0c90 \
--builder.seconds_in_slot=10 \
--builder.slots_in_epoch=32
```

### Registration and priority

- **Registration is permissionless.** The first time your builder submits an accepted block, the relay registers it automatically at default (low) priority. There is no signup step.
- **Higher priority / optimistic submission / collateral** are arranged with Vouch during onboarding. Optimistic mode skips per-block simulation for bids up to your posted collateral; above it, blocks are simulated synchronously. Reach out via the support channels below.

### Check you're connected

- Watch the **Builder** column on [/mevblocks](https://boost-relay.vouch.run/mevblocks) — your short pubkey appears when your blocks deliver.
- Or query the data API for your builder:

  ```bash
  curl -s "https://boost-relay.vouch.run/relay/v1/data/bidtraces/builder_blocks_received?builder_pubkey=<YOUR_BUILDER_PUBKEY>"
  ```

## Searchers: submit bundles

If you run a searcher, submit your bundles to the **Vouch Builder**. See [Searchers (Submit Bundles)](./searchers) for the endpoint, signature authentication, onboarding, and limits.

## Public transparency

The [/mevblocks](https://boost-relay.vouch.run/mevblocks) explorer shows every delivered payload — builder, block, value delivered, block fees, and MEV uplift — with filtering, sorting, and pagination. You can also pull the same data programmatically:

| Endpoint | Purpose |
|---|---|
| `GET /relay/v1/data/validator_registration?pubkey=<pubkey>` | A validator's registration. |
| `GET /relay/v1/data/bidtraces/proposer_payload_delivered?proposer_pubkey=<pubkey>` | Blocks delivered to a proposer. |
| `GET /relay/v1/data/bidtraces/builder_blocks_received?builder_pubkey=<pubkey>` | Blocks received from a builder. |
| `GET /relay/v1/builder/validators` | Current validator registrations (for builders). |

## Resources

- [Vouchrun/mev-boost-relay](https://github.com/Vouchrun/mev-boost-relay) — the relay (`pulse` branch).
- [Vouchrun/go-pulse-builder](https://github.com/Vouchrun/go-pulse-builder) — a reference builder implementation.
- [Delivered-blocks explorer](https://boost-relay.vouch.run/mevblocks) — live relay activity.
- [MEV-Boost (Validators)](./mev_boost) — how validators connect.
- [Searchers (Submit Bundles)](./searchers) — submit bundles to the Vouch Builder.
- [BlockFerret](./blockferret) — the Switch.win × Vouch alliance builder.

## Support

- [Telegram](https://t.me/VouchVals)
