import { useEffect, useRef, useState } from 'react';
import Terminal from 'react-console-emulator'
import {
  Link as ChakraLink,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Heading,
  Input,
  Select
} from '@chakra-ui/react';

import { providers, Wallet, BigNumber } from "ethers";
import { FlashbotsBundleProvider } from "@flashbots/ethers-provider-bundle";

import { Container, SimulationTerminal } from './'

const SearcherTerminal = () => {
  const term_ref = useRef();
  const config_term_ref = useRef();

  // ** State Variables
  const [currentChainId, setCurrentChainId] = useState(1);
  const [flashbotsRelayEndpoint, setFlashbotsRelayEndpoint] = useState('https://relay.flashbots.net');
  const [flashbotsPrivateKey, setFlashbotsPrivateKey] = useState('');
  const [maxFeePerGasGwei, setMaxFeePerGasGwei] = useState(42000);
  const [maxPriorityFeePerGasGwei, setMaxPriorityFeePerGasGwei] = useState(42000);
  const [nftMinterPrivateKey, setNftMinterPrivateKey] = useState('');
  const [nftValueWei, setNftValueWei] = useState(0);
  const [nftData, setNftData] = useState('0x');
  const [nftAddress, setNftAddress] = useState('0x957B500673A4919C9394349E6bbD1A66Dc7E5939');

  // ** Track if we are minting
  const [isMinting, setIsMinting] = useState(false);

  // ** Curated Configurations
  const [curatedConfig, setCuratedConfig] = useState('mainnet');

  // ** Initial Config load
  const [initialLoad, setInitialLoad] = useState(true);

  const setConfig = () => {
    // ** Check if we have item in local storage
    let localCuratedConfig = localStorage.getItem('FlashbotsMintingSearcherSelectedConfig');
    if (localCuratedConfig !== undefined) {
      setCuratedConfig(localCuratedConfig);
    } else {
      localCuratedConfig = curatedConfig;
    }
    if(localCuratedConfig === 'empty') {
      setCurrentChainId(0);
      setFlashbotsRelayEndpoint('');
      setMaxFeePerGasGwei(0);
      setMaxPriorityFeePerGasGwei(0);
    }
    if (localCuratedConfig === 'mainnet') {
      setCurrentChainId(1);
      setFlashbotsRelayEndpoint('https://relay.flashbots.net');
      setMaxFeePerGasGwei(42000);
      setMaxPriorityFeePerGasGwei(42000);
    }
    if (localCuratedConfig === 'goerli') {
      setCurrentChainId(5);
      setFlashbotsRelayEndpoint('https://relay-goerli.flashbots.net');
      setMaxFeePerGasGwei(42000);
      setMaxPriorityFeePerGasGwei(42000);
    }
  };

  useEffect(() => {
    // ** Only Update Local Storage Value when Not initial Load
    if(!initialLoad) {
      localStorage.setItem('FlashbotsMintingSearcherSelectedConfig', curatedConfig);
    }
    setConfig();
    setInitialLoad(false);
  }, [curatedConfig]);

  // ** Set config on initial load based on local storage value
  // useEffect(() => {
  //   setConfig();
  // }, []);

  // ** Continuously send minting transactions
  const send_bundle = () => {
    console.log("inside send_bundle");
    SendBundle({
        chainId: currentChainId,
        maxFeePerGas: maxFeePerGasGwei,
        maxPriorityFeePerGas: maxPriorityFeePerGasGwei,
        minterPrivateKey: nftMinterPrivateKey,
        value: nftValueWei,
        data: nftData,
        address: nftAddress,
        relayEndpoint: flashbotsRelayEndpoint,
        authSignerPrivateKey: flashbotsPrivateKey
      }).then((res) => {
        console.log("got result from SendBundle???")
        // TODO: get the response back and show simulated tx
      })
  };

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
    provider
    }) => {
      console.log("inside sendBundle")
    const targetBlockNumber = (await provider.getBlockNumber()) + 1;
    console.log("Got target block number:", targetBlockNumber);

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
    // console.log("Got target block number:", targetBlockNumber);

    const terminal = term_ref.current ?? { pushToStdout: (s) => console.log(s)}
    terminal.pushToStdout(`Bundle sent for block ${targetBlockNumber}`);
    console.log(`Bundle sent for block ${targetBlockNumber}`)
    const response = await bundleSubmitResponse.wait();
    console.log("Got response from bundleSubmitResponse.wait()");
    console.log(response);

    if (response !== 0) {
      terminal.pushToStdout(`Bundle not included with response: ${response}, retrying...`);
      sendBundle(flashbotsProvider);
    } else {
      terminal.pushToStdout("Bundle executed successfully");
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
      provider
    });
  };


  useEffect(() => {
    if(isMinting) {
      send_bundle();
    }
  }, [isMinting]);

  return (
    <Container
    flexDirection="row"
    width="100%"
    margin="auto"
    px={6}
  >
    <Container
      flexDirection="column"
      width="100%"
    >
    <Container
          flexDirection="row"
          justifyContent="center"
          margin="auto"
          width="100%"
          pb={6}
        >
          <Container
            flexDirection="column"
            width="100%"
            maxWidth="400px"
            maxHeight="600px"
            height="600px"
            px={4}
          >
        <Terminal
            ref={term_ref}
            welcomeMessage={'Welcome to The Search... \nType \'help\' for a list of commands.'}
            promptLabel={'~'}
            style={{
              height: '600px',
              maxHeight: '600px',
              marginRight: '1.5em',
              maxWidth: '400px',
              width: '100%',
            }}
            commands={{
              set_chain_id: {
                description: 'Sets the Chain Id',
                usage: 'set_chain_id <number>',
                fn: function () {
                  // ** Try to parse the first argument as the chain id
                  const parsed_chain_id = parseInt(arguments[0]);
                  if (parsed_chain_id) {
                    setCurrentChainId(parsed_chain_id);
                    return 'Chain Id set to ' + parsed_chain_id;
                  }
                  return 'Invalid Chain Id';
                }
              },
              set_flashbots_relay_endpoint: {
                description: 'Set the Flashbots Relay Endpoint',
                usage: 'set_flashbots_relay_endpoint <string>',
                fn: function () {
                  const new_relay = Array.from(arguments).join('');
                  setFlashbotsRelayEndpoint(new_relay);
                  return `Set the Flashbots Relay Enpoint to: ${new_relay}`
                }
              },
              set_flashbots_private_key: {
                description: 'Set the Flashbots Private Key',
                usage: 'set_flashbots_private_key <string>',
                fn: function () {
                  const new_private_key = Array.from(arguments).join('');
                  setFlashbotsPrivateKey(new_private_key);
                  return `Set the Flashbots Private Key to: ********`
                }
              },
              set_max_fee_per_gas_gwei: {
                description: 'Set the Max Gas Gwei',
                usage: 'set_max_fee_per_gas_gwei <number>',
                fn: function () {
                  const new_gas_gwei = parseInt(arguments[0]);
                  if (new_gas_gwei) {
                    setMaxFeePerGasGwei(new_gas_gwei);
                    return 'Max Gas Gwei set to ' + new_gas_gwei;
                  }
                  return 'Invalid Max Gas Gwei';
                }
              },
              set_max_priority_fee_per_gas_gwei: {
                description: 'Set the Max Priority Gas Gwei',
                usage: 'set_max_priority_fee_per_gas_gwei <number>',
                fn: function () {
                  const new_gas_gwei = parseInt(arguments[0]);
                  if (new_gas_gwei) {
                    setMaxPriorityFeePerGasGwei(new_gas_gwei);
                    return 'Max Priority Gas Gwei set to ' + new_gas_gwei;
                  }
                  return 'Invalid Max Priority Gas Gwei';
                }
              },
              set_nft_minter_private_key: {
                description: 'Set your nft minter private key (not stored anywhere... will disappear if you refresh the page)',
                usage: 'set_nft_minter_private_key <number>',
                fn: function () {
                  setNftMinterPrivateKey(arguments[0]);
                }
              },
              set_nft_value_wei: {
                description: 'Set the NFT value in Wei',
                usage: 'set_nft_value_wei <number>',
                fn: function () {
                  const new_nft_price = parseInt(arguments[0]);
                  if (new_nft_price) {
                    setNftValueWei(new_nft_price);
                    return 'NFT Value in Wei set to ' + new_nft_price;
                  }
                  return 'Invalid NFT Value in Wei';
                }
              },
              set_nft_data: {
                description: 'Set the nft data (abi encoded method call. ex: mint() (use metamask to find this data))',
                usage: 'set_nft_data <number>',
                fn: function () {
                  setNftData(arguments[0]);
                }
              },
              set_nft_address: {
                description: 'Set the nft erc721 contract address',
                usage: 'set_nft_address <number>',
                fn: function () {
                  setNftAddress(arguments[0]);
                }
              },
              start: {
                description: 'Send Flashbots Minting Bundles',
                usage: 'start',
                fn: function () {
                  setIsMinting(true);
                }
              },
              stop: {
                description: 'Send Flashbots Minting Bundles',
                usage: 'start',
                fn: function () {
                  setIsMinting(false);
                  // TODO: clear simulated transactions terminal
                  // TODO: clear terminal window
                }
              }
            }}
          />
          <Text mr='auto' fontWeight={800} pt={4} mb={2}>No data is stored - verify yourself on <ChakraLink
              isExternals
              href="https://github.com/abigger87/flashbots-minting-searcher"
              color='blue.400'
            >GitHub</ChakraLink></Text>
          </Container>
          <Container
            flexDirection="column"
            width="100%"
            maxWidth="600px"
            maxHeight="600px"
            height="600px"
            px={4}
          >
            <Heading as="h6" fontSize='2xl' mr='auto' mb={2}>Searcher Config</Heading>

            <Container
              flexDirection="row"
              width="100%"
              pb={2}
            >
              <Text mr='auto' width='fit-content' minWidth='200px'>Curated Configurations</Text>
              <Select
                // placeholder="Curated Configs"
                value={curatedConfig}
                onChange={(e) => setCuratedConfig(e.target.value)}
                width='100%'
                size='sm'
                >
                {/* <option value="empty">Empty</option> */}
                <option value="mainnet">Ethereum Mainnet - Chain ID 1</option>
                <option value="goerli">Ethereum Goerli - Chain ID 5</option>
              </Select>
            </Container>
            <Text ml='auto' fontSize="sm" fontWeight={800} pb={4}>* Select Changes Chain ID and Relay Endpoint</Text>
            <Container
              flexDirection="row"
              width="100%"
              pb={2}
            >
              <Text mr='auto' width='fit-content' minWidth='200px'>Chain ID:</Text>
              <NumberInput
                defaultValue={1}
                min={1}
                value={currentChainId}
                keepWithinRange={true}
                onChange={(e) => setCurrentChainId(parseInt(e) ? parseInt(e) : 1)}
                clampValueOnBlur={false}
                width='100%'
                size='sm'
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Container>
            <Container
              flexDirection="row"
              width="100%"
              pb={2}
            >
            <Text mr='auto' minWidth='200px'>Flashbots Relay Endpoint:</Text>
            <Input
                value={flashbotsRelayEndpoint}
                onChange={(e) => setFlashbotsRelayEndpoint(e.target.value)}
                size="sm"
              />
            </Container>
            <Container
              flexDirection="row"
              width="100%"
              pb={2}
            >
            <Text mr='auto' minWidth='200px'>Flashbots Private Key:</Text>
            <Input
                value={flashbotsPrivateKey}
                onChange={(e) => setFlashbotsPrivateKey(e.target.value)}
                size="sm"
              />
            </Container>
            <Container
              flexDirection="row"
              width="100%"
              pb={2}
            >
            <Text mr='auto' minWidth='200px'>Max Fee Gwei:</Text>
            <NumberInput
                min={1}
                value={maxFeePerGasGwei}
                keepWithinRange={true}
                onChange={(e) => setMaxFeePerGasGwei(parseInt(e) ? parseInt(e) : 42000)}
                clampValueOnBlur={false}
                width='100%'
                size='sm'
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Container>
            <Container
              flexDirection="row"
              width="100%"
              pb={2}
            >
              <Text mr='auto' minWidth='200px'>Max Priority Fee Gwei:</Text>
              <NumberInput
                min={1}
                value={maxPriorityFeePerGasGwei}
                keepWithinRange={true}
                onChange={(e) => setMaxPriorityFeePerGasGwei(parseInt(e) ? parseInt(e) : 42000)}
                clampValueOnBlur={false}
                width='100%'
                size='sm'
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Container>
            <Container
              flexDirection="row"
              width="100%"
              pb={2}
            >
              <Text mr='auto' minWidth='200px'>NFT Minter Private Key:</Text>
              <Input
                  value={nftMinterPrivateKey}
                  onChange={(e) => setNftMinterPrivateKey(e.target.value)}
                  size="sm"
                />
            </Container>
            <Container
              flexDirection="row"
              width="100%"
              pb={2}
            >
              <Text mr='auto' minWidth='200px'>NFT Value Wei:</Text>
              <NumberInput
                step={0.01}
                min={0}
                precision={4}
                value={nftValueWei}
                keepWithinRange={true}
                onChange={(e) => setNftValueWei(parseFloat(e) ? parseFloat(e) : 0)}
                clampValueOnBlur={false}
                width='100%'
                size='sm'
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Container>
            <Container
              flexDirection="row"
              width="100%"
              pb={2}
            >
              <Text mr='auto' minWidth='200px'>NFT Data:</Text>
              <Input
                  value={nftData}
                  onChange={(e) => setNftData(e.target.value)}
                  size="sm"
                />
            </Container>
            <Container
              flexDirection="row"
              width="100%"
              pb={2}
            >
              <Text mr='auto' minWidth='200px'>NFT Address:</Text>
              <Input
                  value={nftAddress}
                  onChange={(e) => setNftAddress(e.target.value)}
                  size="sm"
                />
            </Container>
          </Container>

          {/* <Terminal
              ref={config_term_ref}
              style={{
                height: '400px',
                maxHeight: '400px',
                maxWidth: '500px',
                width: '100%',
              }}
              // locked={isLocked}
              commands={{}}
              welcomeMessage={customWelcomeMessage}
              readOnly
              noHistory
            /> */}
        </Container>
        <SimulationTerminal />
      </Container>
    </Container>
  )
};

export default SearcherTerminal;