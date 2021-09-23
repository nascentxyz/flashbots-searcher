import { Flex, Heading } from '@chakra-ui/react'
import { Header } from './';

const Hero = ({ title }: { title: string }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="auto"
    p={4}
    // ** Nascent Color: 4fa682 or rgb(79, 166, 130)
    bgGradient="linear(to top right, #3F8468, #4fa682, #72B79B)"
    bgClip="text"
  >
    <Heading fontSize="3vw">{title}</Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'Flashbots Minting Searcher',
}

export default Hero;