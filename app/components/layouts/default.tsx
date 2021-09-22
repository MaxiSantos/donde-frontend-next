import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { GlobalStyles } from '../../../styles/global';
import { Clear } from '../elements/Clear';
import Header from '../sections/Header';
import Search from '../sections/Search';

const InnerStyles = styled(Container)`
  //max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

export const Default = ({ children }: DefaultProps) => (
  <div>
    <GlobalStyles />
    <Header />
    <Clear />
    <Search />
    <InnerStyles>{children}</InnerStyles>
  </div>
);

type DefaultProps = React.PropsWithChildren<{}>;