import { useEffect, useRef, useState } from 'react';
import Terminal from 'react-console-emulator'
import { Link as ChakraLink, Text, Code, Heading } from '@chakra-ui/react'

import { Container, SimulationTerminal } from './'

const SearcherTerminal = () => {
  const term_ref = useRef();
  const config_term_ref = useRef();

  // ** State Variables
  // TODO: pass in state hooks as params to reference from utils bundle sender
  // TODO: unless we add the execute bundle here and contain the simulation logic here

  const [currentChainId, setCurrentChainId] = useState(1);
  const [flashbotsRelayEndpoint, setFlashbotsRelayEndpoint] = useState('unknown');
  const [flashbotsPrivateKey, setFlashbotsPrivateKey] = useState('unknown');
  // TODO: what should this default param be?
  const [maxFeePerGasGwei, setMaxFeePerGasGwei] = useState(42000);
  const [maxPriorityFeePerGasGwei, setMaxPriorityFeePerGasGwei] = useState(42000);
  const [nftMinterPrivateKey, setNftMinterPrivateKey] = useState('unknown');
  const [nftValueWei, setNftValueWei] = useState(0);
  const [nftData, setNftData] = useState('unknown');
  const [nftAddress, setNftAddress] = useState('unknown');

  // ** Update the welcome message whenever one of our state variables changes
  useEffect(() => {
    // updateTerminalConfigMessage();
    console.log(config_term_ref)
    const terminal = config_term_ref.current ?? {
      pushToStdout: (_v) => console.error("Failed to get config terminal reference!"),
      clearStdout: () => console.error("Failed to get config terminal reference!"),
      clearInput: () => console.error("Failed to get config terminal reference!"),
      welcomeMessage: ''
    };
    terminal.clearStdout();
    terminal.clearInput();
    terminal.welcomeMessage = '';
    terminal.pushToStdout(`
        Searcher Configuration\n
        Set in the left terminal.\n
              -------- \n
        Chain ID: ${currentChainId} \n
        Flashbots Relay Endpoint: ${flashbotsRelayEndpoint} \n
        Flashbots Signer Private Key: ${flashbotsPrivateKey} \n
        Max Fee Per Gas Gwei: ${maxFeePerGasGwei} \n
        Max Priority Fee Per Gas Gwei: ${maxPriorityFeePerGasGwei} \n
        NFT Minter Private Key: ${nftMinterPrivateKey} \n
        NFT Value Wei: ${nftValueWei} \n
        NFT Data: ${nftData} \n
        NFT Address: ${nftAddress} \n
      `);
  }, [
      currentChainId,
      flashbotsRelayEndpoint,
      flashbotsPrivateKey,
      maxFeePerGasGwei,
      maxPriorityFeePerGasGwei,
      nftMinterPrivateKey,
      nftValueWei,
      nftData,
      nftAddress
  ]);

  return (
    <Container
    flexDirection="row"
    width="100%"
    margin="auto"
    px={6}
    // pt={6}
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
        <Terminal
            ref={term_ref}
            welcomeMessage={'Welcome to The Search... \nType \'help\' for a list of commands.'}
            promptLabel={'~'}
            style={{
              height: '400px',
              maxHeight: '400px',
              marginRight: '1.5em',
              maxWidth: '500px',
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
            }}
          />
          <Container
            flexDirection="column"
            width="100%"
            maxWidth="500px"
            maxHeight="400px"
            height="400px"
            p={4}
          >
            <Heading as="h4" mr='auto' mb={2}>Searcher Config</Heading>
            <Text mr='auto' fontWeight={800} mb={2}>No data is stored - verify yourself on <ChakraLink
              isExternals
              href="https://github.com/abigger87/flashbots-minting-searcher"
              color='blue.400'
            >GitHub</ChakraLink></Text>
            <Text mr='auto'>Chain ID: <Code>{currentChainId}</Code></Text>
            <Text mr='auto'>Flashbots Relay Endpoint: <Code>{flashbotsRelayEndpoint}</Code></Text>
            <Text mr='auto'>Flashbots Private Key: <Code>{flashbotsPrivateKey}</Code></Text>
            <Text mr='auto'>Max Fee Per Gas Gwei: <Code>{maxFeePerGasGwei}</Code></Text>
            <Text mr='auto'>Max Priority Fee Per Gas Gwei: <Code>{maxPriorityFeePerGasGwei}</Code></Text>
            <Text mr='auto'>NFT Minter Private Key: <Code>{nftMinterPrivateKey}</Code></Text>
            <Text mr='auto'>NFT Value Wei: <Code>{nftValueWei}</Code></Text>
            <Text mr='auto'>NFT Data: <Code>{nftData}</Code></Text>
            <Text mr='auto'>NFT Address: <Code>{nftAddress}</Code></Text>
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