import {
  Hero,
  Container,
  SearcherTerminal,
  Main,
  DarkModeSwitch,
  CTA,
  SimulationTerminal
} from '../components';

const Index = () => (
  <Container height="100vh">
    <Main>
      <Hero />
      <SearcherTerminal />
    </Main>

    <DarkModeSwitch />
    {/* <Footer>
      <Text>Next ❤️ Chakra</Text>
    </Footer> */}
    <CTA />
  </Container>
)

export default Index
