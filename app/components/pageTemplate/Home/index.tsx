import Container from '@mui/material/Container';
import Description from './Description';
import Welcome from './Welcome';
import Join from './Join';

export default function Home() {
  return <Container>
    <Welcome />
    <Description />
    <Join />
  </Container>
}
