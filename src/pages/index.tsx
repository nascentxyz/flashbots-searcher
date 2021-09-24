import {
  Hero,
  Container,
  SearcherTerminal,
  Main,
  DarkModeSwitch,
  CTA
} from '../components';

const Index = () => (
  <Container height="100%" minHeight="100%">
    <Main>
      <Hero />
      <SearcherTerminal />
    </Main>

    <DarkModeSwitch />
    <CTA />
  </Container>
)

export default Index
