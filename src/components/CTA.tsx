import { Link as ChakraLink, Button, Text, Code } from '@chakra-ui/react'

import { Container } from './'

const CTA = () => (
  <Container
    flexDirection="row"
    bottom="0"
    width="100%"
    // pt={8}
    mt='auto'
    pb={2}
  >
      <Container
      flexDirection="column"
      width="100%"
      pb={4}
    >
      {/* <Container
        flexDirection="row"
        width="100%"
        margin="auto"
        maxWidth="48rem"
        py={3}
      >
        <Text margin="auto">
          <span>Flashbots</span>{" "} ❤️ {" "}<span>Nascent</span>
        </Text>
      </Container> */}
        <Container
          flexDirection="row"
          justifyContent="center"
          margin="auto"
          width="100%"
          maxWidth="48rem"
          py={3}
        >
        <ChakraLink
          isExternal
          href="https://nascent.xyz"
          flexGrow={0}
          mx={2}
        >
          <Button width="100%" variant="outline" colorScheme="green">
            Nascent
          </Button>
        </ChakraLink>
        <ChakraLink isExternal href="https://docs.flashbots.net/" margin="auto" flexGrow={0} mx={2}>
          <Button width="100%" variant="outline" colorScheme="green">
            Flashbots
          </Button>
        </ChakraLink>
        <ChakraLink
          isExternal
          href="https://github.com/abigger87/flashbots-minting-searcher"
          flexGrow={0}
          mx={2}
        >
          <Button width="100%" variant="outline" colorScheme="green">
            Github
          </Button>
        </ChakraLink>
      </Container>
      <Text>Built with ❤️ by <ChakraLink color="blue.500" isExternal href="https://twitter.com/andreasbigger">Andreas Bigger</ChakraLink> @ <ChakraLink color="#4fa682" isExternal href="https://nascent.xyz">Nascent</ChakraLink> </Text>
      <Text>Say thanks by donating to <ChakraLink color="blue.500" isExternal href="https://thegivingblock.com/donate/">The Giving Block Charities</ChakraLink>{" "} ❤️</Text>
      {/* <Text>❤️ Thanks: <ChakraLink isExternal href="https://etherscan.io/address/0x47C5C2Dbe93E4dCd9d45c856Bb6d65B66965f382"><Code>0x47C5C2Dbe93E4dCd9d45c856Bb6d65B66965f382</Code></ChakraLink>{" "} ❤️</Text> */}
    </Container>
  </Container>
)

export default CTA