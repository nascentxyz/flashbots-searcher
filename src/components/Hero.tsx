import { Flex, Heading } from '@chakra-ui/react'
import { Header } from './';

const Hero = ({ title }: { title: string }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="auto"
    p={4}
    bgGradient="linear(to-l, #7928CA, #FF0080)"
    bgClip="text"
  >
    <Heading fontSize="3vw">{title}</Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'Flashbots Minting Searcher',
}

export default Hero;