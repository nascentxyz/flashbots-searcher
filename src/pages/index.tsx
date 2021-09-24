import {
  Hero,
  Container,
  SearcherTerminal,
  Main,
  DarkModeSwitch,
  CTA
} from '../components';

const Index = () => (
  <Container height="auto" minHeight="100%">
    <Main>
      <Hero />
      <SearcherTerminal />
    </Main>

    <DarkModeSwitch />
    <CTA />
  </Container>
)

export default Index
