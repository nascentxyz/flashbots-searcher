import { useRef, useState } from 'react';
import Terminal from 'react-console-emulator'

import { Container } from './'

const SearcherTerminal = () => {
  const term_ref = useRef();

  // ** State Variables
  // TODO: pass in state hooks as params to reference from utils bundle sender
  // TODO: unless we add the execute bundle here and contain the simulation logic here

  const [currentChainId, setCurrentChainId] = useState(1);
  const [flashbotsRelayEndpoint, setFlashbotsRelayEndpoint] = useState('unknown');
  const [flashbotsPrivateKey, setFlashbotsPrivateKey] = useState('unknown');
  // TODO: what should this default param be?
  const [maxFeePerGasGwei, setMaxFeePerGasGwei] = useState(42000);
  const [maxPriorityFeePerGasGwei, setMaxPriorityFeePerGasGwei] = useState('unknown');
  const [nftMinterPrivateKey, setNftMinterPrivateKey] = useState('unknown');
  const [nftValueWei, setNftValueWei] = useState('unknown');
  const [nftData, setNftData] = useState('unknown');
  const [nftAddress, setNftAddress] = useState('unknown');

  return (
    <Container
          flexDirection="row"
          justifyContent="center"
          margin="auto"
          width="100%"
          px={8}
          py={3}
        >
        <Terminal
            ref={term_ref}
            welcomeMessage={'Welcome to The Search... \nType \'help\' for a list of commands.'}
            promptLabel={'~'}
            style={{
              height: '400px',
              maxHeight: '400px',
              marginRight: '2em',
              maxWidth: '500px',
              width: '100%',

            }}
            commands={{
              set_chain_id: {
                description: 'Set the Chain Id',
                usage: 'set_chain_id <number>',
                fn: function () {
                  // const terminal: any = term_ref.current;
                  // if(terminal !== undefined) {
                  //   terminal.pushToStdout('Enter ')
                  // }
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
              set_mac_fee_per_gas_gwei: {
                description: 'Set the Max Gas Gwei',
                usage: 'set_mac_fee_per_gas_gwei <number>',
                fn: function () {
                  const new_gas_gwei = parseInt(arguments[0]);
                  if (new_gas_gwei) {
                    setMaxFeePerGasGwei(new_gas_gwei);
                    return 'Max Gas Gwei set to ' + new_gas_gwei;
                  }
                  return 'Invalid Max Gas Gwei';
                }
              },
            }}
          />
          <Terminal
              style={{
                height: '400px',
                maxHeight: '400px',
                maxWidth: '500px',
                width: '100%',
              }}
              commands={{}}
              welcomeMessage={`
                  Searcher Configuration\n
                  Set in the left terminal.\n
                  \n
                  Chain ID: ${currentChainId} \n
                  Flashbots Relay Endpoint: ${flashbotsRelayEndpoint} \n
                  Flashbots Signer Private Key: ${flashbotsPrivateKey} \n
                  Max Fee Per Gas Gwei: ${maxFeePerGasGwei} \n
                  Max Priority Fee Per Gas Gwei: ${maxPriorityFeePerGasGwei} \n
                  NFT Minter Private Key: ${nftMinterPrivateKey} \n
                  NFT Value Wei: ${nftValueWei} \n
                  NFT Data: ${nftData} \n
                  NFT Address: ${nftAddress} \n
                `}
              readOnly
            />
        </Container>
  )
};

export default SearcherTerminal;