import {
  Link as ChakraLink,
  Text,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'

import {
  Hero,
  Container,
  SearcherTerminal,
  Main,
  DarkModeSwitch,
  CTA,
  Footer
} from '../components';

const Index = () => (
  <Container height="100vh">
    <Main>
      <Hero />
      <SearcherTerminal />

      {/* <List spacing={3} my={0}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink
            isExternal
            href="https://github.com/flashbots/searcher-minter"
            flexGrow={1}
            mr={2}
          >
            Flashbots searcher-minter <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink
            isExternal
            href="https://github.com/ernestognw/flashbots-nft-minter"
            flexGrow={1}
            mr={2}
          >
            Flashbots NFT Minter <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink
            isExternal
            href="https://docs.flashbots.net/"
            flexGrow={1}
            mr={2}
          >
            Flashbots Docs <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink isExternal href="https://github.com/abigger87/flashbots-minting-searcher" flexGrow={1} mr={2}>
            Github <LinkIcon />
          </ChakraLink>
        </ListItem>
      </List> */}
    </Main>

    <DarkModeSwitch />
    {/* <Footer>
      <Text>Next ❤️ Chakra</Text>
    </Footer> */}
    <CTA />
  </Container>
)

export default Index
