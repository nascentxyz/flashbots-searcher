import { Stack, StackProps } from '@chakra-ui/react'

const Main = (props: StackProps) => (
  <Stack
    spacing="1.5em"
    width="100%"
    // maxWidth="48em"
    mt="0"
    pt="2em"
    px="1em"
    {...props}
  />
)

export default Main;