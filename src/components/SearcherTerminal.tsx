import { useEffect, useRef, useState } from 'react';
import Terminal from 'react-console-emulator'
import { Link as ChakraLink, Text, Code, Heading, Input } from '@chakra-ui/react'

import { Container, SimulationTerminal } from './'
import { xor } from 'lodash';

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
            maxHeight="400px"
            height="400px"
            px={4}
          >
        <Terminal
            ref={term_ref}
            welcomeMessage={'Welcome to The Search... \nType \'help\' for a list of commands.'}
            promptLabel={'~'}
            style={{
              height: '400px',
              maxHeight: '400px',
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
            maxHeight="400px"
            height="400px"
            px={4}
          >
            <Heading as="h6" fontSize='2xl' mr='auto' mb={2}>Searcher Config</Heading>
            <Container
              flexDirection="row"
              width="100%"
              pb={2}
            >
              <Text mr='auto' width='fit-content' minWidth='200px'>Chain ID:</Text>
              <Input
                  value={currentChainId}
                  onChange={(e) => setCurrentChainId(parseInt(e.target.value))}
                  size="sm"
                />
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
            <Input
                value={maxFeePerGasGwei}
                onChange={(e) => setMaxFeePerGasGwei(parseInt(e.target.value))}
                size="sm"
              />
            </Container>
            <Container
              flexDirection="row"
              width="100%"
              pb={2}
            >
              <Text mr='auto' minWidth='200px'>Max Priority Fee Gwei:</Text>
              <Input
                  value={maxPriorityFeePerGasGwei}
                  onChange={(e) => setMaxPriorityFeePerGasGwei(parseInt(e.target.value))}
                  size="sm"
                />
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
              <Input
                  value={nftValueWei}
                  onChange={(e) => setNftValueWei(parseInt(e.target.value))}
                  size="sm"
                />
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