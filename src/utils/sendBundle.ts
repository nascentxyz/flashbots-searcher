import { providers, Wallet, BigNumber } from "ethers";
import { FlashbotsBundleProvider } from "@flashbots/ethers-provider-bundle";

const GWEI = BigNumber.from(10).pow(9);

const sendBundle = async ({
  flashbotsProvider,
  // ** ethers
  chainId,
  // ** gas
  maxFeePerGas,
  maxPriorityFeePerGas,
  // ** nft
  minterPrivateKey,
  value,
  data,
  address,
  // ** flashbots
  relayEndpoint,
  authSignerPrivateKey,
  provider
  }) => {
  const targetBlockNumber = (await provider.getBlockNumber()) + 1;

  const bundleSubmitResponse = await flashbotsProvider.sendBundle(
    [
      {
        transaction: {
          chainId: chainId,
          type: 2,
          value: value,
          data: data,
          maxFeePerGas: GWEI.mul(maxFeePerGas),
          maxPriorityFeePerGas: GWEI.mul(maxPriorityFeePerGas),
          to: address,
        },
        signer: new Wallet(minterPrivateKey, provider),
      },
    ],
    targetBlockNumber
  );
  console.log(`Bundle sent for block ${targetBlockNumber}`);
  const response = await bundleSubmitResponse.wait();

  if (response !== 0) {
    console.log(`Bundle not included with response: ${response}, retrying...`);
    sendBundle(flashbotsProvider);
  } else {
    console.log("Bundle executed successfully");
  }
};

const SendBundle =  async ({
  chainId,
  maxFeePerGas,
  maxPriorityFeePerGas,
  minterPrivateKey,
  value,
  data,
  address,
  relayEndpoint,
  authSignerPrivateKey
  }) => {
  const provider = new providers.InfuraProvider(chainId);
  const flashbotsProvider = await FlashbotsBundleProvider.create(
    provider,
    new Wallet(authSignerPrivateKey),
    relayEndpoint
  );

  // ** send bundle, passing in the props
  sendBundle({
    flashbotsProvider,
    chainId,
    maxFeePerGas,
    maxPriorityFeePerGas,
    minterPrivateKey,
    value,
    data,
    address,
    relayEndpoint,
    authSignerPrivateKey,
    provider
  });
};

export default SendBundle;
