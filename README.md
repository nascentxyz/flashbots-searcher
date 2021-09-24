# Flashbots Searcher

Built with [chakra-ui](https://github.com/chakra-ui/chakra-ui) and TypeScript

Inspired heavily by:

[Ernesto](https://twitter.com/ernestognw)'s [Flashbots NFT Minter](https://github.com/ernestognw/flashbots-nft-minter)

and

Scott Bigelow's [Searcher Minter](https://github.com/flashbots/searcher-minter) from Flashbots!


## Running on Goerli

Get some [Goerli](https://goerli.etherscan.io/) ETH on a wallet (you'll need a [faucet](https://faucet.goerli.mudit.blog/)). Extract that Goerli wallet's private key (in MetaMask `Account Details -> Export Private Key`), use that value for the Private Key field on the UI.

#### NOTE: The private key is not saved anywhere so when you refresh the page, it will be gone. Additionally, all computation is done client-side (in-browser) so none of the configuration parameters are passed over any internet connection at all.

### Goerli Contract Addresses

* WasteGas: `0x957B500673A4919C9394349E6bbD1A66Dc7E5939`
* FakeArtMinter: `0x20EE855E43A7af19E407E39E5110c2C1Ee41F64D`


## Deploying

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-chakra-ui-typescript&project-name=with-chakra-ui-typescript&repository-name=with-chakra-ui-typescript)


## How to use

Install dependencies with `yarn`

Run in development mode with `yarn dev`

## Where can I learn more?

Check out [docs.flashbots.net](https://docs.flashbots.net).